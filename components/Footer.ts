import { html } from "@mastrojs/mastro";

export const Footer = () =>
  html`
    <footer>
      <p>
        <a href="/">Mauro Bieg</a>
      </p>

      <ul>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="https://github.com/mb21/">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/mauro-bieg/">LinkedIn</a></li>
        <li><a href="https://bsky.app/profile/mb21.bsky.social">Bluesky</a></li>
        <li><a href="/blog/feed.xml">Atom/RSS feed</a></li>
      </ul>
    </footer>
  `;
