# BluEdge Consulting

Marketing site for BluEdge Consulting — boutique growth advisory for AI, digital health, pharma, and medtech.

**Live:** https://bluedgeconsulting.ai

## Stack

Plain HTML, CSS, and vanilla JS. No build step, no dependencies.

```
index.html       Single page
site.css         All styles
site.js          Reveal animations, hero network, quote carousel, counters
assets/          Logos, client/portfolio imagery, OG image, favicon
robots.txt       SEO crawl directives
sitemap.xml      Sitemap (single URL)
_headers         Cloudflare Pages security + cache headers
```

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy (Cloudflare Pages)

1. Push to GitHub.
2. In Cloudflare Pages, connect the repo.
3. Build command: *(none)* — leave blank.
4. Build output directory: `/` (project root).
5. Add custom domain `bluedgeconsulting.ai`.

The `_headers` file is picked up automatically by Pages.

## Editing copy

All copy lives in `index.html`. Section landmarks:

- `#top` — hero
- `#who` — For operators and investors (segments + logos)
- `#edge` — Three pillars
- `#results` — Numbers speak
- `#voices` — Testimonial
- `#operator` — Paul bio
- `#contact` — CTA + email
