import { readMarkdownFiles } from "@mastrojs/markdown";

export const getBlogPosts = async () => {
  const posts = await readMarkdownFiles<{ title: string; date: string }>("data/blog/*.md");
  for (const post of posts) {
    post.slug = blogPathToSlug(post.slug);
  };
  return posts;
}

export const blogPathToSlug = (path: string) =>
  path.replace(/^(\d{4})-(\d{2})-(\d{2})-/, "$1/$2/$3/");

export const fmtDate = (dateStr: string) =>
  Temporal.PlainDate.from(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
