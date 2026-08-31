import { getParams, html, htmlToResponse, readDir } from "@mastrojs/mastro";
import { readMarkdownFile } from "@mastrojs/markdown";
import { Layout } from "../../components/Layout.ts";
import { blogPathToSlug, fmtDate } from "../../helpers/helpers.ts";

export const GET = async (req: Request) => {
  const { slug } = getParams(req);
  const name = (slug?.endsWith(".html") ? slug.slice(0, -5) : slug)?.replaceAll("/", "-");
  const post = await readMarkdownFile<{ title: string; date: string }>(`data/blog/${name}.md`);

  return htmlToResponse(
    Layout({
      title: post.meta.title,
      req,
      children: html`
        <div class="text-page">

          <h1>${post.meta.title}</h1>
          <p>${fmtDate(post.meta.date)}</p>
          <div>
            ${post.content}
          </div>

          ${post.content?.toString().includes("<pre><code") && html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/microlighter@2/dist/themes/github.css">
            <script type="module" src="https://cdn.jsdelivr.net/npm/microlighter@2/dist/microlighter.min.js"></script>
          `}
        </div>
      `,
    }),
  );
};

export const getStaticPaths = async () => {
  const posts = await readDir("data/blog/");
  return posts.map((p) => `/blog/${blogPathToSlug(p.slice(0, -3))}.html`);
};
