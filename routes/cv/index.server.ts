import { html, htmlToResponse } from "@mastrojs/mastro";
import { readMarkdownFile } from "@mastrojs/markdown";
import { Layout } from "../../components/Layout.ts";

export const GET = async (req: Request) => {
  const { content } = await readMarkdownFile(`cv/cv.md`);
  const title = "Mauro Bieg – CV";

  return htmlToResponse(
    Layout({
      title,
      req,
      children: html`
        <div class="text-page -cv">
          <h1>
            <img src="/assets/me.jpg" alt="" width="150" height="150">
            ${title}
          </h1>
          <p><a href="cv.pdf">PDF</a></p>
          <div>
            ${content}
          </div>
        </div>
      `,
    }),
  );
};
