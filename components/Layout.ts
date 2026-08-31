import { type Html, html } from "@mastrojs/mastro";
import { Footer } from "./Footer.ts";

interface Props {
  title: string;
  children: Html;
  req: Request;
}

export const Layout = (props: Props) => {
  const { pathname } = new URL(props.req.url);
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <title>${props.title ? `${props.title} | ` : ""}Mauro Bieg</title>
        <link rel="stylesheet" href="/assets/styles.css">
        <link rel="canonical" href=${pathname}>
        <meta name="viewport" content="width=device-width">
        <meta name="description" content="I debug teams and their code.">
        <meta property="og:image" content="/assets/mb21.png">
        ${(pathname === "/" || pathname === "/blog/") &&
          html`<link rel="alternate" type="application/atom+xml" href="/blog/feed.xml">`}
      </head>
      <body data-syntax-theme="github">
        <header class="site-header">
          <label class="color-picker">
            <span>What's your favourite color?</span>
            <input type="color" value="#e60000" id="picker">
          </label>
          ${pathname.startsWith("/blog/") && pathname !== "/blog/"
            ? html`<a href="/blog/">Blog</a>`
            : pathname !== "/" && html`<a href="/">Home</a>`}
        </header>

        <main>
          ${props.children}
        </main>

        ${Footer()}

        <script>
          const setColor = val => document.documentElement.style.setProperty("--primary-color", val);
          const picker = document.getElementById("picker");
          picker.value = localStorage.getItem("color") || "#e60000";
          setColor(picker.value);
          picker.addEventListener("input", e => {
            const { value } = e.target;
            setColor(value);
            localStorage.setItem("color", value);
          });
        </script>
      </body>
    </html>
  `;
};
