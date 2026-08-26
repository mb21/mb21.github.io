import { html, htmlToResponse } from "@mastrojs/mastro";
import { Layout } from "../../components/Layout.ts";
import { fmtDate, getBlogPosts } from "../../helpers/helpers.ts";

export const GET = async (req: Request) => {
  const posts = await getBlogPosts();
  return htmlToResponse(
    Layout({
      title: "Blog",
      req,
      children: html`
        <ul class="blog-index">
          ${posts.reverse().map((post) =>
            html`
              <li>
                <div class="post-date">${fmtDate(post.meta.date)}</div>
                <a class="post-link" href="${post.slug}">${post.meta.title}</a>
              </li>
            `
          )}
        </ul>
      `,
    }),
  );
};
