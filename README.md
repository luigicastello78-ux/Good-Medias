# Good Medias

Marketing website for **Good Medias**, a web development, web design, SEO and GEO (Generative Engine Optimization) agency.

Static site built with [Eleventy](https://www.11ty.dev/), with blog content managed in
[Sveltia CMS](https://sveltiacms.app/). Pages are compiled to plain HTML at build time — article
text ships in the HTML source, so search engines and AI crawlers can read it without running JavaScript.

## Structure

```
index.html            Homepage (Eleventy template; blog cards loop over the posts collection)
blog.njk              Blog archive       -> /blog/
content/posts/*.md    Blog posts (Markdown + YAML front matter) -> /blog/<slug>/
_includes/layouts/    base.njk (page shell), post.njk (article page)
_includes/partials/   header, footer, icon sprite, homepage JSON-LD
_data/site.json       Site name, canonical URL, contact email
_data/build.js        Cache-busting build id for css/js
admin/                Sveltia CMS (index.html + config.yml)
css/styles.css        Styles and design tokens (brand orange #E8572F, ink #1D1D1F)
js/main.js            Menu, scroll reveal, counters, process steps, testimonial slider, FAQ, forms
assets/               Logo mark (SVG, also used as favicon); assets/blog holds CMS uploads
llms.txt              Site summary for AI crawlers
_site/                Build output (generated, git-ignored)
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5510. `npm run build` writes the production site to `_site/`.

## Blog / CMS

Posts live in `content/posts/` as Markdown with YAML front matter. Adding a `.md` file by hand
works exactly as well as using the CMS — the CMS just writes the same files for you.

Front matter fields: `title`, `description`, `tag`, `date`, `readingTime`, `image`, `imageAlt`.

The homepage shows the three most recent posts; `/blog/` lists all of them.

### Editing locally (no setup)

```bash
npm run dev
```

Open http://localhost:5510/admin/ in **Chrome or Edge**, click **Work with Local Repository**, and
pick this project folder. Saving writes straight to `content/posts/` and Eleventy rebuilds.
This uses the File System Access API, so it does not work in Firefox or Safari.

### Editing against GitHub

Requires the repo to exist and a working git remote.

**Quickest route — personal access token.** Open `/admin/` on the deployed site, click
**Sign In Using Access Token**, and follow the GitHub link it provides to mint a token with the
right scopes. The token is stored in your browser's local storage only. No server needed.

**Proper route — OAuth sign-in.** Needs a small auth server, because GitHub does not support
client-side OAuth for this flow.

1. Deploy [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare Workers.
2. Register a GitHub OAuth app (Settings → Developer settings → OAuth Apps → New OAuth App):
   - **Homepage URL** — `https://goodmedias.com`
   - **Authorization callback URL** — `<YOUR_WORKER_URL>/callback`
3. In the Worker's settings, set these variables:
   - `GITHUB_CLIENT_ID` — from the OAuth app
   - `GITHUB_CLIENT_SECRET` — from the OAuth app (encrypt it)
   - `ALLOWED_DOMAINS` — `goodmedias.com`, so nobody else can use your Worker
4. Uncomment `base_url` in `admin/config.yml` and point it at the Worker URL.

Then `/admin/` → **Sign In with GitHub** works, and saving commits to the `main` branch.

## Deploying

Build with `npm run build` and serve `_site/`. Set your host to serve `index.html` for directory
URLs (most static hosts do this by default), and avoid long `Cache-Control` max-age on `.html` —
CSS and JS are already cache-busted per build via `?v=`, HTML is not.

## Before launch

- Replace the three placeholder articles in `content/posts/` with real ones.
- Replace placeholder testimonials, stats and phone number with real ones.
- Connect the audit form and newsletter form to a form backend or CRM (they currently only show a success message).
- Swap Unsplash hotlinked photos for your own images (CMS uploads land in `assets/blog/`).
- Replace `assets/logo-mark.svg` with the original logo vector if available.
