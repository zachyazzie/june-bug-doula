# Repository Guidelines

## Project Structure & Module Organization

This is an Astro static site for June Bug Doula. Source files live in `src/`.

- `src/pages/` contains routes such as `index.astro`, `pricing.astro`, `blog/`, and `services/`.
- `src/components/` contains reusable UI like `Nav.astro`, `Footer.astro`, `Seo.astro`, and `PricingCard.astro`.
- `src/layouts/` contains shared page shells, currently `BaseLayout.astro`.
- `src/content/blog/` stores Markdown posts; schema lives in `src/content.config.ts`.
- `src/data/` stores structured values such as `siteConfig.ts` and `packages.ts`.
- `src/assets/images/` stores optimized source images imported by Astro.
- `public/` serves static files as-is.
- `dist/`, `.astro/`, and `node_modules/` are generated; do not edit them directly.

## Build, Test, and Development Commands

Use `npm.cmd` on Windows PowerShell if `npm` is blocked by execution policy.

- `npm.cmd install` installs dependencies from `package-lock.json`.
- `npm.cmd run dev` starts the Astro development server, usually at `http://localhost:4321`.
- `npm.cmd run build` builds the static site into `dist/` and validates Astro pages/content.
- `npm.cmd run preview` serves the built `dist/` output locally.
- `npm.cmd run astro -- <command>` runs Astro CLI commands directly.

## Coding Style & Naming Conventions

Use two-space indentation in `.astro`, `.ts`, `.mjs`, and CSS files. Prefer PascalCase component names, such as `WhyDoula.astro`. Route filenames should be lowercase and hyphenated when needed, such as `service-area.astro`; dynamic routes follow Astro syntax, such as `[...slug].astro`.

Keep page-specific markup in `src/pages/`, shared UI in `src/components/`, and reusable business/content values in `src/data/`. Avoid hardcoding repeated contact details, package prices, or SEO values.

## Visual Design & Brand Aesthetic

Preserve the calm, warm, maternal brand direction. The site should feel gentle, trustworthy, personal, and locally grounded rather than corporate, clinical, or trendy. Prefer spacious layouts, soft contrast, rounded pill details, warm photography, and readable service-focused copy.

Use the CSS variables in `src/styles/global.css` as the palette source of truth:

- `--light-brown: #fef7f2` for page and section backgrounds.
- `--dark-brown: #a48079` for body text and warm neutral accents.
- `--dark-blush: #cd9494` for primary headings, links, and calls to action.
- `--medium-blush: #d1a299` for supporting accents.
- `--blush: #e8d1c7` for soft panels, borders, and secondary surfaces.

Do not introduce a new dominant color palette without updating the global variables intentionally. Typography should keep the current pairing: `"Tan Mon Cheri"` for decorative uppercase brand headings, `"Open Sans"` for body copy, and `"Poppins"` for UI/supporting text. Maintain accessible contrast, avoid text over busy image areas, and always include useful `alt` text for meaningful images.

## SEO & Content Requirements

Keep the site highly SEO compatible. Every page must use `BaseLayout` with a unique, keyword-aware `title` and a natural-language `description` that names the service, location, or search intent where relevant. Favor specific phrases such as "birth doula in Utah County," "online birth consultation," and city/service-area terms when they fit naturally.

Preserve canonical, Open Graph, and Twitter metadata by using `Seo.astro`; do not duplicate metadata manually in page files. Add `ogImage` when a page has a strong visual. Use `JsonLd.astro` for structured data on pages that describe the business, services, offers, FAQs, or blog articles. Keep `siteConfig.ts` as the source of truth for business name, owner, phone, email, Instagram, and service-area cities.

Use semantic HTML: one clear `h1` per page, ordered heading levels, descriptive link text, and crawlable content rather than image-only text. Blog posts in `src/content/blog/` require frontmatter `title`, `description`, `pubDate`, and relevant `tags`; add `updatedDate` when content changes materially. Keep URLs lowercase and hyphenated.

## Testing Guidelines

There is no dedicated test framework configured. Treat `npm.cmd run build` as the required validation step before submitting changes; it validates Astro routes, content schema, and sitemap generation. For visual or content changes, also run `npm.cmd run dev` and manually check affected pages, including mobile widths.

## Commit & Pull Request Guidelines

Recent commits use short, plain-English summaries such as `Updating UI` and `refactoring site to astro`. Keep messages concise and action-oriented.

Pull requests should include a short description, affected pages or components, validation performed, and screenshots for visible UI changes. Do not include generated `dist/`, `.astro/`, or dependency folders.

## Security & Configuration Tips

The production `site` value is configured in `astro.config.mjs`; confirm domain changes before launch. Keep secrets out of the repository.
