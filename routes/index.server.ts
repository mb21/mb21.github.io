import { html, htmlToResponse } from "@mastrojs/mastro";
import { Layout } from "../components/Layout.ts";

export const GET = (req: Request) =>
  htmlToResponse(
    Layout({
      title: "",
      req,
      children: html`
        <div class="post-page">
          <h1>Hi, I’m Mauro Bieg 👋🏽</h1>
          <p></p>
          <div class="article">
            <p>I debug teams and their code.</p>
            <ul>
              <li><a href="/cv/cv.pdf">CV (PDF)</a></li>
              <li><a href="/blog/">Blog</a></li>
            </ul>
          </div>
        </div>
      `,
    }),
  );
