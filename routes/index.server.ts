import { html, htmlToResponse } from "@mastrojs/mastro";
import { Layout } from "../components/Layout.ts";

export const GET = (req: Request) =>
  htmlToResponse(
    Layout({
      title: "",
      req,
      children: html`
        <div class="post-page home">
          <h1>
            <img src="/assets/me.jpg" alt="" width="150" height="150">
            Hi, I’m Mauro 👋🏽
          </h1>
          <p class="meta">
            <a href="/cv/cv.pdf">CV (PDF)</a>
          </p>
          <div class="article">
            <p><strong>I debug teams and their code.</strong></p>

            <p>I’m based in Zürich, Switzerland. Available for hire as:

            <h2>Fractional CTO</h2>
            <p>As a coach or part-time CTO, I can help your startup…</p>
            <ul>
              <li>go from zero to MVP,</li>
              <li>go from MVP to a scalable product,</li>
              <li>figure out what (not) to build,</li>
              <li>hire a team.</li>
            </ul>

            <h2>Team lead</h2>
            <p>I mentor and lead teams in organizations large and small…</p>
            <ul>
              <li>transforming a struggling team into one that punches above its weight,</li>
              <li>cleaning up technical, organizational or cognitive debt.</li>
            </ul>

            <h2>Full-Stack Engineer</h2>
            <p>I love…</p>
            <ul>
            <li>building beautiful, performant, and accessible websites and apps,</li>
            <li>designing high-quality software that serves as a solid foundation for fast feedback loops of learnings.</li>
            </ul>

            <p>Does any of that sound like what you need?</p>
            <p>
              Let’s chat!<br>
              <a href="mailto:mauro.bieg@gmail.com?subject=Project inquiry">mauro.bieg@gmail.com</a> |
              <a href="https://www.linkedin.com/in/mauro-bieg/">LinkedIn</a> |
              <a href="https://bsky.app/profile/mb21.bsky.social">Bluesky</a>
            </p>
          </div>
        </div>
      `,
    }),
  );
