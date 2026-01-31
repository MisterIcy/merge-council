export interface PersonaTheme {
  accent: string;
  bg: string;
  fg: string;
  fontHeading?: string;
  fontBody?: string;
  accent2?: string; // for Generalist, Pragmatist
}

export interface Persona {
  id: string;
  name: string;
  focus: string;
  theme: PersonaTheme;
}

export const PERSONA_IDS = [
  "code-poet",
  "firefighter",
  "researcher",
  "cowboy",
  "evangelist",
  "generalist",
  "specialist",
  "human-proxy",
  "craftsman",
  "pragmatist",
  "solver",
  "educator",
] as const;

export type PersonaId = (typeof PERSONA_IDS)[number];

export const personas: Persona[] = [
  {
    id: "code-poet",
    name: "The Code Poet",
    focus: "Elegance over \"good enough\" — code elegance, readability, refactors for clarity.",
    theme: {
      accent: "#3d3a5c",
      bg: "#fafaf8",
      fg: "#1f1f1f",
      fontHeading: "Georgia, 'Times New Roman', serif",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "firefighter",
    name: "The Firefighter",
    focus: "The 3 AM Fixer — incidents, hotfixes, post-mortems, stability.",
    theme: {
      accent: "#f59e0b",
      bg: "#1a1a1a",
      fg: "#f4f4f5",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "researcher",
    name: "The Researcher",
    focus: "Documentation & complexity — algorithms, correctness, edge cases.",
    theme: {
      accent: "#1e40af",
      bg: "#f8f9fa",
      fg: "#1e293b",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "cowboy",
    name: "The Cowboy",
    focus: "Fast and loose — ship it, shortcuts that work, technical debt trail.",
    theme: {
      accent: "#b45309",
      bg: "#f5f0e8",
      fg: "#292524",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "evangelist",
    name: "The Evangelist",
    focus: "New framework champion — adoption, innovation, modernization.",
    theme: {
      accent: "#8b5cf6",
      bg: "#0f0f12",
      fg: "#e4e4e7",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "generalist",
    name: "The Generalist",
    focus: "Full-stack jumper — cross-cutting concerns, integration, full picture.",
    theme: {
      accent: "#0ea5e9",
      accent2: "#10b981",
      bg: "#ffffff",
      fg: "#334155",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "specialist",
    name: "The Specialist",
    focus: "Master of one — deep technical correctness, performance, low-level.",
    theme: {
      accent: "#22c55e",
      bg: "#0c0c0c",
      fg: "#d4d4d4",
      fontHeading: "ui-monospace, monospace",
      fontBody: "ui-monospace, monospace",
    },
  },
  {
    id: "human-proxy",
    name: "The Human Proxy",
    focus: "Business ↔ Dev translator — requirements, stakeholder alignment.",
    theme: {
      accent: "#475569",
      bg: "#f8fafc",
      fg: "#334155",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "craftsman",
    name: "The Craftsman",
    focus: "Coding as art — testing, documentation, tooling, sustainable quality.",
    theme: {
      accent: "#b45309",
      bg: "#faf8f5",
      fg: "#292524",
      fontBody: "Georgia, 'Times New Roman', serif",
    },
  },
  {
    id: "pragmatist",
    name: "The Pragmatist",
    focus: "What works, ships — customer happiness, good enough.",
    theme: {
      accent: "#16a34a",
      accent2: "#2563eb",
      bg: "#ffffff",
      fg: "#171717",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "solver",
    name: "The Solver",
    focus: "Hired gun for hard problems — bugs, performance, architectural knots.",
    theme: {
      accent: "#0d9488",
      bg: "#18181b",
      fg: "#e4e4e7",
      fontBody: "system-ui, sans-serif",
    },
  },
  {
    id: "educator",
    name: "The Educator",
    focus: "Force multiplier — mentorship, runbooks, knowledge sharing.",
    theme: {
      accent: "#0ea5e9",
      bg: "#f0fdfa",
      fg: "#134e4a",
      fontBody: "system-ui, sans-serif",
    },
  },
];

const byId = new Map(personas.map((p) => [p.id, p]));

export function getPersona(id: string): Persona | undefined {
  return byId.get(id);
}

export function getPersonaOrThrow(id: string): Persona {
  const p = byId.get(id);
  if (!p) throw new Error(`Unknown persona: ${id}`);
  return p;
}

export function isPersonaId(id: string): id is PersonaId {
  return PERSONA_IDS.includes(id as PersonaId);
}
