import { atomResponse } from "@mastrojs/feed";
import { getBlogPosts } from "../../helpers/helpers.ts";

const baseUrl = "https://mb21.github.io/blog/";

export const GET = async () => {
  const posts = await getBlogPosts();
  return atomResponse({
    title: "Mauro Bieg's blog",
    id: new URL(baseUrl),
    linkSelf: new URL("feed.xml", baseUrl),
    linkWebsite: new URL("", baseUrl),
    updated: new Date(posts[0].meta.date + "T12:00:00Z"),
    entries: posts.map((post) => {
      const url = new URL(post.slug, baseUrl);
      return {
        id: url,
        link: url,
        updated: new Date(post.meta.date + "T12:00:00Z"),
        author: { name: "Mauro Bieg" },
        title: post.meta.title,
        content: post.content,
      };
    }),
  });
};
