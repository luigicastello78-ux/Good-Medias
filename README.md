# Good Medias

Marketing website for **Good Medias**, a web development, web design, SEO and GEO (Generative Engine Optimization) agency.

Static site: plain HTML, CSS and JavaScript, with no build step.

## Structure

```
index.html        Homepage (all sections)
css/styles.css    Styles and design tokens (brand orange #E8572F, ink #1D1D1F)
js/main.js        Menu, scroll reveal, counters, process steps, testimonial slider, FAQ, forms
assets/           Logo mark (SVG, also used as favicon)
llms.txt          Site summary for AI crawlers
```

## Run locally

```bash
python -m http.server 5510
```

Then open http://localhost:5510.

## Before launch

- Replace placeholder testimonials, stats and phone number with real ones.
- Connect the audit form and newsletter form to a form backend or CRM (they currently only show a success message).
- Swap Unsplash hotlinked photos for your own images.
- Replace `assets/logo-mark.svg` with the original logo vector if available.
