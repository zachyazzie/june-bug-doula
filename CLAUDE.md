# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Astro static site for Junebug Doula Services (Aubrey Yazzie, a birth doula serving Utah County, Utah). Fully static output (`output: 'static'` in `astro.config.mjs`) — no server runtime, no client-side framework, deployable to any static host. This was migrated from a hand-written single-page HTML/Bootstrap/jQuery site specifically for SEO (static pre-rendered HTML, one URL per topic instead of anchors on one page, structured data, sitemap) and to support the business's relocation from Helena, Montana to Utah County.

## Commands

- `npm run dev` — dev server (`astro dev`; use `astro dev stop` to kill it, since it runs as a background daemon, not a simple foreground process — `pkill`/Ctrl-C won't fully stop it)
- `npm run build` — static build to `dist/`; also generates `dist/sitemap-index.xml` via `@astrojs/sitemap`
- `npm run preview` — serve the built `dist/` output
- No test suite exists in this repo.

## Architecture

- **Pages** (`src/pages/`) — one route per file/folder, each wrapped in `src/layouts/BaseLayout.astro`: `index.astro` (home), `about.astro`, `pricing.astro`, `service-area.astro`, `faq.astro`, `contact.astro`, `services/birth-doula.astro`, `services/online-consultation.astro`, `blog/index.astro` + `blog/[...slug].astro`. The service pages map to Junebug's *actual* current offerings (birth doula packages, online consultation) — don't add a generic industry-template page (e.g. a standalone "postpartum doula" or "childbirth education" page) unless that becomes a real, separately bookable service; thin pages for unoffered services are the same content-quality problem as SEO doorway pages.
- **`src/data/siteConfig.ts`** — single source of truth for phone/email/social/service-area cities. Always import from here rather than hardcoding contact info or location strings — this is what keeps the phone number and city list from drifting out of sync across pages (it previously did, in the old site: the footer's `tel:` link and its displayed text disagreed by one digit). The phone number here is a best-guess pending owner confirmation — see the `TODO(owner)` comment in the file.
- **`src/data/packages.ts`** — the three pricing tiers (Basic/Premium Birth Package, Online Consultation) as a plain typed array, deliberately *not* a content collection (too small/fixed-shape to warrant one). `PricingCard.astro` renders one card per package — this replaced the old site's duplicate-markup bug (the same `id`s reused in a desktop grid *and* a separate mobile carousel).
- **Blog** — Astro content collection defined in `src/content.config.ts` (note: **not** `src/content/config.ts` — that's the pre-Astro-6 legacy location and will fail to build). Posts are plain Markdown in `src/content/blog/`. Uses the `glob()` loader (Content Layer API), not the old `type: 'content'` collection API.
- **Components** (`src/components/`) — `Nav.astro`/`Footer.astro` (shared chrome), `Hero.astro`/`WhyDoula.astro`/`PricingCard.astro` (content sections ported from the original single-page design), `Seo.astro` (hand-rolled meta/canonical/OG/Twitter tags — deliberately not the `astro-seo` package, to keep JSON-LD and meta tags in one place without an extra dependency), `JsonLd.astro` (renders a `<script type="application/ld+json">` from a passed-in object).
- **Structured data**: Home renders `LocalBusiness`/`ProfessionalService` JSON-LD (see `index.astro`) with `areaServed` mixing one `AdministrativeArea` (Utah County) and individual `City` entries, and `makesOffer` sourced from `packages.ts`. No `FAQPage` schema on the FAQ page by design — Google deprecated FAQ rich results in May 2026; the content itself still matters for users/AI-answer-engine citation, just not the markup.
- **Images**: source photos live in `src/assets/images/` and go through Astro's `astro:assets` pipeline (Sharp-based resize/WebP). For the decorative pill/circle-cropped photos (hero, about, why-section, pricing cards, contact), the pattern is `getImage()` + CSS `background-image` via an inline `style` (see `Hero.astro`, `PricingCard.astro`) rather than the `<Image>` component — this preserves the non-rectangular crop/positioning tricks that a plain `<Image>` + `object-fit` wrapper can't replicate as directly. The two true `<img>`-style assets (nav logo, Instagram icon) use the real `<Image>` component instead. Fonts (`Tan Mon Cheri`) and the favicon live in `public/` since they're referenced by stable literal path (`@font-face` URLs, `<link rel="icon">`), not run through the asset pipeline.
- **Global styles** (`src/styles/global.css`) — plain CSS, not Sass (no `sass` dependency). Brand colors are CSS custom properties on `:root` (`--light-brown`, `--dark-brown`, `--dark-blush`, `--medium-blush`, `--blush`) rather than Sass variables, so any component's scoped `<style>` block can reference them with zero imports. Per-page/component layout CSS lives in each `.astro` file's own scoped `<style>` block, with responsive overrides written inline next to the base rule they override — this was a deliberate fix for the old site's `site.scss`, where responsive overrides were split into separate `@media` blocks hundreds of lines away from their base rules.
- **No Bootstrap, no jQuery** — both were removed in the migration. The only client-side JS is two small inline `<script>` tags (`Nav.astro`'s hamburger-menu toggle, `Hero.astro`'s scroll parallax), each vanilla and scoped to the component that needs it.
- **Astro version is pinned exactly** in `package.json` (no `^` range on `astro` itself) — Astro's Content Collections API has broken backward compatibility across major versions more than once (5→6 dropped the legacy `type: 'content'` collection API entirely, mid-migration on this very project). Treat any Astro major-version bump as a deliberate task, not a routine `npm update`.

## Known open items (not blocking, but unresolved)

- The phone number in `siteConfig.ts` needs confirmation from the business owner (the old site's `tel:` href and displayed text disagreed by one digit; the displayed version was kept as the guess).
- The exact list of served Utah County cities (`siteConfig.serviceAreaCities`) needs confirmation — currently a reasonable assumption, not verified.
- `astro.config.mjs`'s `site` field and the hosting/deploy target are placeholders pending the real production domain and a decision on where this deploys.
