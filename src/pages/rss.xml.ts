import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: string | undefined }) {
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);
  const sorted = posts.sort((a, b) => {
    const da = a.data.pubDate instanceof Date ? a.data.pubDate : new Date(a.data.pubDate);
    const db = b.data.pubDate instanceof Date ? b.data.pubDate : new Date(b.data.pubDate);
    return db.getTime() - da.getTime();
  });

  const site = context.site ?? "https://mistericy.github.io/merge-council/";
  return rss({
    title: "Merge Council",
    description: "Council Posts from all personas—issues, PRs, releases turned into short, useful posts.",
    site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate instanceof Date ? post.data.pubDate : new Date(post.data.pubDate),
      link: new URL(`blog/${post.id}/`, site).href,
    })),
  });
}
