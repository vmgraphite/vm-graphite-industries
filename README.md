# VM Graphite Industries LLP — Corporate Website & Sanity CMS Catalog

A complete, production-ready B2B corporate website and product catalog platform built for **VM Graphite Industries LLP** using **Astro**, **TypeScript**, **Sanity CMS**, and **Tailwind CSS**.

The site features an embedded Sanity Content Studio at `/admin`, dynamic product catalog with structured technical specifications, product-prefilled quotation modal, downloadable brochure resources, automated SEO metadata with JSON-LD schema, responsive industrial UI, and serverless form handlers.

---

## 1. Architecture Overview & Stack

- **Framework**: [Astro 4](https://astro.build/) (Static Site Generation with Serverless Form Handlers)
- **CMS**: [Sanity CMS](https://www.sanity.io/) (Embedded Studio at `https://vmgraphiteindustries.com/admin`)
- **Language**: TypeScript (Strict typing for schemas, GROQ queries, and data components)
- **Styling**: Tailwind CSS (Custom industrial palette: Graphite Charcoal, Burnished Amber, Steel Blue)
- **Icons**: Lucide React & Custom Industrial SVGs
- **Deployment**: Netlify (Automated GitHub deployments & build triggers)
- **Domain & DNS**: Hostinger (`vmgraphiteindustries.com`)

---

## 2. Project Directory Structure

```
vm-graphite-industries/
├── sanity.config.ts                 # Sanity Studio configuration (embedded at /admin)
├── sanity.cli.ts                    # Sanity CLI configuration
├── sanity/
│   └── schemas/                     # Sanity schema definitions
│       ├── index.ts
│       ├── siteSettings.ts          # Contact details, phone, email, addresses, brochure
│       ├── homePage.ts              # Hero titles, strengths, capabilities overview
│       ├── aboutPage.ts             # Company profile & quality commitment
│       ├── category.ts              # Product category schema
│       ├── product.ts               # Product schema with structured spec key/value rows
│       ├── resource.ts              # PDF downloads & catalog schema
│       └── objects/                 # SEO & spec row objects
│           ├── seo.ts
│           └── specRow.ts
├── src/
│   ├── components/                  # Astro & React components
│   │   ├── Header.astro             # Desktop & mobile menu with Quote CTA
│   │   ├── Footer.astro             # Complete industrial legal footer
│   │   ├── Hero.astro               # High-impact industrial hero section
│   │   ├── CompanyStrengths.astro   # Key differentiators grid
│   │   ├── FeaturedCategories.astro # Division category cards
│   │   ├── Capabilities.astro       # Manufacturing spotlight
│   │   ├── WhyChooseUs.astro        # Engineering value proposition
│   │   ├── FeaturedProducts.astro   # Homepage featured product cards
│   │   ├── BrochureCTA.astro        # PDF brochure download banner
│   │   ├── ProductCard.astro        # Reusable product card with quote trigger
│   │   ├── ProductSpecs.astro       # Structured key-value specification table
│   │   ├── QuoteForm.tsx            # Interactive React quotation form
│   │   ├── QuoteModal.tsx           # Global pop-up quotation modal dialog
│   │   ├── ContactForm.tsx          # Contact page form
│   │   ├── DownloadCard.astro       # PDF resource download card
│   │   ├── WhatsAppButton.astro     # Floating WhatsApp quick chat button
│   │   ├── Breadcrumbs.astro        # Accessible breadcrumb trail
│   │   ├── SEO.astro                # Meta headers, OpenGraph, JSON-LD schemas
│   │   └── EmptyState.astro         # Fallback search/category UI
│   ├── lib/
│   │   ├── sanity.client.ts         # Sanity client & image builder
│   │   ├── sanity.queries.ts        # GROQ queries for Sanity Content Lake
│   │   ├── mockData.ts              # Seed data & fallback layer when unconfigured
│   │   └── data.ts                  # Hybrid content provider (Sanity + Fallback)
│   ├── layouts/
│   │   └── Layout.astro             # Main HTML template
│   └── pages/
│       ├── index.astro              # Home page
│       ├── about.astro              # About Us page
│       ├── products/
│       │   ├── index.astro          # Products catalog with search & category tabs
│       │   └── [slug].astro         # Dynamic SEO Product Detail page
│       ├── downloads.astro          # Resources & brochure download hub
│       ├── contact.astro            # Contact page with factory addresses & form
│       ├── admin/[...index].astro   # Embedded Sanity Studio route (/admin)
│       ├── api/quote.ts             # Quote form API submission endpoint
│       ├── sitemap.xml.ts           # Dynamic XML sitemap generator
│       ├── robots.txt.ts            # Dynamic robots.txt generator
│       └── 404.astro                # Custom 404 error page
├── public/
│   ├── images/                      # Generated sharp industrial SVG assets
│   ├── docs/                        # Sample brochure & spec sheet PDF files
│   └── favicon.svg                  # Brand SVG favicon
├── netlify.toml                     # Netlify build & redirect rules
├── astro.config.mjs                 # Astro configuration
└── tailwind.config.mjs              # Custom industrial color design tokens
```

---

## 3. Sanity CMS Setup Instructions

To connect your own Sanity cloud project:

1. **Install Sanity CLI** (if not installed):
   ```bash
   npm install -g sanity@latest
   ```

2. **Login to Sanity**:
   ```bash
   sanity login
   ```

3. **Initialize Sanity Project**:
   Run the following command inside the project directory:
   ```bash
   sanity init --create-project "VM Graphite Industries" --dataset production
   ```

4. **Copy your `projectId`**:
   Sanity CLI will output your new `projectId`. Add it to your `.env` file:
   ```env
   PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   PUBLIC_SANITY_DATASET=production
   PUBLIC_SANITY_API_VERSION=2024-08-01
   CONTACT_EMAIL=kanikaagrawal1997@gmail.com
   ```

5. **Deploy Schemas / Start Studio**:
   You can access the embedded studio at `http://localhost:4321/admin` in development or `https://vmgraphiteindustries.com/admin` in production!

---

## 4. Environment Variables Reference

Create a `.env` file in the project root based on `.env.example`:

```env
# Sanity CMS Project Credentials
PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id_here
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-08-01

# Contact / Lead Generation Destination Email
CONTACT_EMAIL=kanikaagrawal1997@gmail.com

# Optional: Google Analytics 4 Measurement ID
# PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 5. Local Development Commands

To run the application locally:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Check TypeScript types
npm run check

# 4. Build production distribution
npm run build

# 5. Preview production build
npm run preview
```

---

## 6. How to Manage Content in Sanity (`/admin`)

Access `https://vmgraphiteindustries.com/admin` to manage site content without a developer:

### Managing Site Settings & Contact Details
- Go to **Site Settings & Contact Info**.
- Update official phone numbers, email (`CONTACT_EMAIL`), WhatsApp business number, corporate office address, and manufacturing plant address.
- Upload a new **Company Brochure PDF** (automatically updates brochure download buttons site-wide).

### Managing Product Categories
- Go to **Product Categories**.
- Add or edit categories (e.g. *Graphite & Carbon Products*, *Tapes & Sealing Solutions*, *Industrial Blades & Materials*).

### Managing Products & Technical Specifications
- Go to **Products Catalog**.
- Create a product and fill in name, slug, category, short description, rich text full description, main image, and gallery images.
- **Structured Specifications**: Under *Technical Specifications*, click *Add item* to add key-value pairs (e.g., `Material` | `High Purity Synthetic Graphite`, `Max Operating Temp` | `3000°C`, `Density` | `1.85 g/cm³`).
- Check **Mark as Featured Product** to feature the product on the homepage.
- Upload product PDF datasheet.

### Managing Downloadable Resources
- Go to **Downloads & Brochures**.
- Upload PDF files (catalogs, engineering spec sheets, ISO certificates) and tag them appropriately.

---

## 7. Netlify Deployment Guide

1. **Push Code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for VM Graphite Industries"
   git remote add origin https://github.com/your-username/vm-graphite-industries.git
   git push -u origin main
   ```

2. **Connect Repository to Netlify**:
   - Log into [Netlify Dashboard](https://app.netlify.com/).
   - Click **Add new site** → **Import an existing project**.
   - Select your GitHub repository `vm-graphite-industries`.

3. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variables in Netlify**:
   Go to **Site Settings** → **Environment Variables** and add:
   - `PUBLIC_SANITY_PROJECT_ID` = `your_project_id`
   - `PUBLIC_SANITY_DATASET` = `production`
   - `PUBLIC_SANITY_API_VERSION` = `2024-08-01`
   - `CONTACT_EMAIL` = `kanikaagrawal1997@gmail.com`

---

## 8. Hostinger Domain & DNS Setup Guide

To point `vmgraphiteindustries.com` registered at Hostinger to Netlify:

1. Log into your **Hostinger Control Panel (hPanel)**.
2. Navigate to **Domains** → `vmgraphiteindustries.com` → **DNS / Name Servers**.
3. Update DNS Records as follows:

| Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` *(Netlify Load Balancer IP)* | 3600 |
| **CNAME** | `www` | `your-site-name.netlify.app` | 3600 |

4. In Netlify, go to **Site Settings** → **Domain management** → **Add custom domain**:
   - Enter `vmgraphiteindustries.com`
   - Enable **HTTPS / Let's Encrypt SSL certificate**.

---

## 9. Sanity Webhook Setup for Automatic Netlify Rebuilds

Whenever content is published or updated in Sanity, trigger an automatic Netlify rebuild:

1. In **Netlify**, go to **Site Settings** → **Build & deploy** → **Build hooks** → **Add build hook**.
   - Name: `Sanity Content Update`
   - Branch: `main`
   - Copy the generated Webhook URL (e.g. `https://api.netlify.com/build_hooks/XXXXXXX`).

2. In **Sanity Management Console** (`https://www.sanity.io/manage`):
   - Select your project → **API** → **Webhooks** → **Add Webhook**.
   - **Name**: Netlify Automatic Rebuild
   - **URL**: Paste your Netlify build hook URL.
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete for `product`, `category`, `siteSettings`, `resource`, `homePage`, `aboutPage`.
   - Click **Save**.

---

## 10. Pre-Launch Verification Checklist

- [x] Tested embedded Sanity Studio at `/admin`.
- [x] Verified sample product catalog with 3 categories and 11 products.
- [x] Tested pre-filled "Get Best Quote" modal inquiry form on product pages.
- [x] Tested contact inquiry form on `/contact`.
- [x] Verified downloadable brochures & PDF resource center at `/downloads`.
- [x] Verified floating WhatsApp button with custom site settings number.
- [x] Verified automated XML sitemap (`/sitemap.xml`) and `robots.txt`.
- [x] Verified strict TypeScript checking (`npm run check`) and production build (`npm run build`).
- [ ] Add real `PUBLIC_SANITY_PROJECT_ID` in `.env` and Netlify environment settings.
