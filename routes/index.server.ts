import { html, htmlToResponse } from "@mastrojs/mastro";
import { Layout } from "../components/Layout.ts";

export const GET = (req: Request) =>
  htmlToResponse(
    Layout({
      title: "",
      req,
      children: html`
        <div class="text-page -home">
          <h1>
            <img src="/assets/me.jpg" alt="" width="150" height="150">
            Hi, I’m Mauro 👋🏽
          </h1>
          <p>
            <a href="/cv/">CV</a> |
            <a href="/cv/cv.pdf">(PDF)</a>
          </p>
          <div>
            <p><strong>I debug teams and their code.</strong> Hire me as your:</p>

            <h2>Fractional CTO</h2>
            <p>As a coach or part-time CTO, I can help your startup…</p>
            <ul>
              <li>go from zero to MVP, or from MVP to a scalable product,</li>
              <li>figure out what (not) to build,</li>
              <li>hire a team, etc.</li>
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
            <li>talking directly to stakeholders, simplify complex requirements, and ship the resulting product,</li>
            <li>designing high-quality software that serves as a solid foundation for fast feedback loops of learnings.</li>
            </ul>

            <p>I’m based in Zürich, Switzerland, and also speak German natively.</p>
            <p>Does any of that sound like what you need?</p>
            <p>
              Let’s chat!<br>
              <a href="mailto:mauro.bieg@gmail.com?subject=Project%20inquiry">mauro.bieg@gmail.com</a> |
              <a href="https://www.linkedin.com/in/mauro-bieg/">LinkedIn</a> |
              <a href="https://bsky.app/profile/mb21.bsky.social">Bluesky</a>
            </p>
          </div>
        </div>
      `,
    }),
  );
