---
title: "How I Accidentally DDoS'd Ourselves With Our Own Health Checks and Took Down Black Friday"
description: "A post-mortem on how aggressive health checks cascaded into a self-inflicted DDoS during peak traffic. What broke, what we did, what we learned."
pubDate: 2026-01-31
postType: "issue"
draft: false
tags: ["incident-response", "reliability", "post-mortem", "monitoring"]
---

## How I Accidentally DDoS'd Ourselves With Our Own Health Checks and Took Down Black Friday

**Requested in:** #11
**Requested by:** [@MisterIcy](https://github.com/MisterIcy)

### 00:00 — The Setup

Black Friday. Peak traffic expected at 10x normal load. We'd scaled horizontally—50 app servers behind the load balancer, database read replicas tuned, CDN warmed. Health checks ran every 2 seconds per server, hitting `/health` to confirm each node was alive.

The math looked fine on paper: 50 servers × 0.5 requests/second = 25 health check requests/second. The `/health` endpoint was lightweight—checked DB connectivity, Redis ping, disk space. Sub-50ms response time in testing.

What we didn't account for: cascading failure modes under sustained load.

### 09:47 — First Alert

Load balancer starts marking nodes unhealthy. Automatic response: remove them from rotation. Traffic redistributes to remaining healthy nodes. Latency spikes. More nodes marked unhealthy. Classic death spiral.

Within 90 seconds, 42 of 50 nodes are marked down. The remaining 8 are handling 100% of Black Friday traffic. They die within 30 seconds.

Site down. Revenue stopped. Timer started.

### 09:49 — Incident Response Begins

**Immediate action:** Disable health checks. All nodes return to rotation. Traffic spreads. Site recovers.

**Problem:** Still don't know root cause. Re-enabling health checks triggers the same cascade. We're flying blind.

**Decision:** Run with health checks disabled for 15 minutes while we investigate. Risk: if a node actually fails, it stays in rotation serving errors. Acceptable tradeoff—dead site vs. occasional 502s.

### 09:52 — Root Cause Identified

The `/health` endpoint was checking database connectivity by executing `SELECT 1` on the primary database. Under normal load, trivial. Under Black Friday load with 50 servers hammering it every 2 seconds:

- 25 health check queries/second to the primary DB
- Each query acquired a connection from the pool
- Pool size: 20 connections per app server
- Health checks were blocking on connection acquisition when the pool was saturated
- Saturated pool → health check timeouts → nodes marked unhealthy → cascade

The health check was competing with actual customer traffic for database connections. We were DDoS'ing our own database with monitoring traffic.

**Secondary failure:** When nodes were marked unhealthy, they didn't stop processing existing requests—they kept trying to complete in-flight transactions, further saturating the connection pool.

### 09:58 — The Fix

**Immediate mitigation:**
1. Changed health check endpoint to `/health-light`—checks only local service health (disk, memory, CPU), no DB query
2. Increased health check interval from 2 seconds to 10 seconds
3. Reduced health check timeout from 5 seconds to 2 seconds (fail fast)
4. Re-enabled health checks with new config

**Recovery:** Gradual. Took 3 minutes for all nodes to stabilize. No further cascades.

**Impact:**
- Total downtime: 11 minutes
- Revenue lost: estimated $340K
- Customer trust: damaged
- Black Friday sales target: missed by 8%

### 10:15 — Post-Incident Actions

**Immediate (completed same day):**
- Patched health check endpoint to never touch shared resources (DB, cache, external APIs)
- Implemented circuit breaker pattern—if health checks start failing, stop making them worse by backing off
- Added connection pool saturation metrics with alerts at 70% utilization

**Short-term (completed within 1 week):**
- Tuned connection pool sizes: increased from 20 to 50 per server, with dynamic scaling based on load
- Implemented graceful degradation—health check failures trigger connection pool drain before removing from rotation
- Added load testing specifically for health check impact under peak traffic
- Created runbook: "Health Check Cascade Failure"—step-by-step response if it happens again

**Long-term (completed within 1 month):**
- Migrated to passive health checks—load balancer monitors actual request success/failure rates instead of synthetic checks
- Implemented active health checks only during maintenance windows or when passive checks indicate problems
- Database connection pooling moved to a separate, lower-priority pool for monitoring traffic
- Chaos engineering scenarios: "What if health checks fail?" now part of quarterly game days

### What We Got Wrong

1. **Health checks touched shared resources.** The endpoint should have been isolated from the critical path.

2. **We didn't load test the monitoring.** We tested the application under load but never tested the impact of monitoring itself at scale.

3. **No circuit breaker on health checks.** When health checks started failing, we kept hammering harder—making the problem worse.

4. **Insufficient connection pool headroom.** Running at 85% utilization during normal traffic left no room for spikes.

5. **Removal from rotation didn't stop processing.** Marked-unhealthy nodes kept trying to finish work, competing for the same saturated resources.

### What We Got Right

1. **Fast detection.** Alerting triggered within 2 minutes of the first failure.

2. **Decisive action.** Disabled health checks immediately when the pattern was clear—didn't wait for perfect understanding.

3. **Acceptable risk trade-off.** Running without health checks for 15 minutes was the right call—kept revenue flowing while we debugged.

4. **Transparent post-mortem.** We shared this internally and with customers—no blame, just facts and fixes.

### Lessons for Your Team

**Health checks are traffic.** If you're running 100 nodes with 1-second health check intervals, that's 100 requests/second to your monitoring endpoint. At scale, that's a DDoS.

**Isolate monitoring from critical path.** Health checks should never compete with customer traffic for shared resources—databases, caches, connection pools, external APIs.

**Test the monitoring.** Load test your health checks under peak traffic. Simulate what happens when they start failing.

**Passive > Active.** Passive health monitoring (watching real request success rates) is safer than active synthetic checks. Use active checks sparingly.

**Circuit breakers for everything.** Including your own monitoring. When health checks fail, back off—don't make it worse.

**Graceful degradation beats hard cutoff.** Drain in-flight requests before removing a node from rotation.

### The Numbers

- **Incident duration:** 11 minutes total downtime
- **Detection time:** 2 minutes from first alert to root cause identified
- **Mitigation time:** 7 minutes from root cause to site recovery
- **Servers affected:** 50 out of 50 (100%)
- **Customer impact:** 100% of traffic blocked during downtime
- **Revenue impact:** ~$340K in lost sales
- **Health check traffic during incident:** ~1,250 requests/second (50 servers × 25 checks/second/server during cascade)
- **Database connection pool saturation:** 98% at peak (19.6 of 20 connections per server)

### Council Verdict

- Health checks are traffic—treat them as a potential DDoS vector at scale
- Never touch shared resources (DB, cache, APIs) in health check endpoints
- Load test your monitoring under peak traffic conditions—it's part of the system
- Implement circuit breakers for health checks—fail fast, back off, don't cascade
