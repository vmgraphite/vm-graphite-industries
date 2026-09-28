# 📋 Client Project Handover Document
**Project Name:** V.M. Graphite Industries Official Website  
**Live Website URL:** [https://vmgraphiteindustries.com](https://vmgraphiteindustries.com)  
**CMS Admin Portal:** [https://vmgraphiteindustries.com/admin](https://vmgraphiteindustries.com/admin)  
**Date of Handover:** September 2026  
**Document Version:** 1.0 (Final)

---

## 📌 Executive Summary

Welcome to the official handover document for the **V.M. Graphite Industries** web platform. This document is specifically written for non-technical administrators, business owners, and management. It contains all the necessary account details, architecture explanations, login credentials placeholders, and straightforward step-by-step instructions on how to manage your website daily.

Your website is built using modern high-performance cloud technologies (Astro SSR, Sanity Content Management System, Netlify Serverless Cloud, Cloudflare Security, and Hostinger Domain Management). **Whenever you add or update products and text in the admin dashboard, your live website updates immediately without needing developer intervention.**

---

## 🏗️ System Architecture & Services Overview

Below is the complete breakdown of all external services and accounts powering your website:

```
[ Domain: Hostinger ] ──► [ DNS & Security: Cloudflare ] ──► [ Hosting: Netlify (SSR) ]
                                                                       │
                                              ┌────────────────────────┴────────────────────────┐
                                              ▼                                                 ▼
                                    [ Sanity.io Studio ]                             [ Web3Forms Service ]
                                (Product Catalog & Content)                     (Lead & Contact Inquiries)
```

| Service | Category | Purpose | Where to Access |
| :--- | :--- | :--- | :--- |
| **Hostinger** | Domain Registrar | Owns and registers the domain name `vmgraphiteindustries.com`. | [hostinger.com](https://hostinger.com) |
| **Cloudflare** | DNS & CDN Security | Manages DNS records, SSL/HTTPS encryption, and protects the site against cyber threats. | [dash.cloudflare.com](https://dash.cloudflare.com) |
| **Netlify** | Web Server & Hosting | Cloud serverless infrastructure that hosts and serves the website globally. | [app.netlify.com](https://app.netlify.com) |
| **Sanity.io** | Content Management (CMS) | The database and admin interface where you manage products, specifications, images, and text. | `vmgraphiteindustries.com/admin` or [sanity.io/manage](https://www.sanity.io/manage) |
| **Web3Forms** | Email Lead Routing | Routes customer contact inquiries and product quote requests directly to your business email. | [web3forms.com](https://web3forms.com) |
| **GitHub** | Codebase Repository | Securely stores the website's source code files. | [github.com](https://github.com) |

---

## 🔑 Master Accounts & Credentials Inventory

> 🔒 **Security Notice:** Store this document in a secure, confidential place (e.g., password manager or secure company drive). Only share credentials with authorized company personnel.

### 1. Domain Registration (Hostinger)
* **Purpose:** Where the domain `vmgraphiteindustries.com` is purchased and renewed annually.
* **Login URL:** [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
* **Username / Email:** `[Client's Primary Admin Email]`
* **Password:** `[Client's Hostinger Password]`
* **Action Required:** Keep renewal payment methods up to date so your domain does not expire. Note: Nameservers are pointed to Cloudflare.

---

### 2. DNS & Traffic Management (Cloudflare)
* **Purpose:** Cloudflare controls the DNS routing, SSL certificates, speed optimization, and DDoS security shield for your domain.
* **Login URL:** [https://dash.cloudflare.com](https://dash.cloudflare.com)
* **Username / Email:** `[Cloudflare Account Email]`
* **Password:** `[Cloudflare Account Password]`
* **Key Configuration:**
  - Nameservers assigned to Hostinger domain settings.
  - DNS `A` and `CNAME` records point traffic directly to the Netlify hosting servers.
  - SSL/TLS mode is set to **Full (Strict)** with Automatic HTTPS rewrites.

---

### 3. Web Hosting & Live Deployment (Netlify)
* **Purpose:** Provides 99.99% uptime serverless cloud hosting. It pulls updates from GitHub and serves the dynamic SSR website.
* **Login URL:** [https://app.netlify.com](https://app.netlify.com)
* **Site Name:** `vm-graphite-industries` (linked to `vmgraphiteindustries.com`)
* **Username / Email:** `[Netlify Account Email]`
* **Password:** `[Netlify Account Password]`

---

### 4. Content Management System (Sanity.io Studio)
* **Purpose:** Your easy-to-use visual admin panel to add products, modify pricing/specifications, upload PDF brochures, change company phone numbers, and edit homepage content.
* **Direct Admin URL:** [https://vmgraphiteindustries.com/admin](https://vmgraphiteindustries.com/admin)
* **Alternative Management Portal:** [https://www.sanity.io/manage](https://www.sanity.io/manage)
* **Project ID:** `twycammz`
* **Dataset:** `production`
* **Login Method:** Log in using your authorized Google, GitHub, or Sanity email account.
* **Adding Team Members:** In [sanity.io/manage](https://www.sanity.io/manage) > Project `twycammz` > **Members** > Click **Invite Member** to grant access to staff.

---

### 5. Contact Form & Lead Generation (Web3Forms)
* **Purpose:** Captures form submissions from the "Contact Us" and "Request Quote" buttons on product pages and forwards them instantly to your company inbox.
* **Destination Email:** `info@vmgraphiteindustries.com`
* **Web3Forms Access Key:** `1d7c6d2b-7e3b-43da-9921-48fe9da2ac8a`
* **How it works:** When a visitor submits a quote or query, Web3Forms automatically delivers the lead directly to `info@vmgraphiteindustries.com`. No server maintenance required.

---

### 6. Source Code Repository (GitHub)
* **Purpose:** Version control and source code repository backup.
* **Repository:** `vm-graphite-industries`
* **Login URL:** [https://github.com](https://github.com)
* **Account:** `[GitHub Organization / Account Name]`

---

## 🛠️ Step-by-Step Guide: Managing Website Content

You can manage all website data directly without writing a single line of code.

### How to Log into the Admin Studio
1. Open your web browser and go to: **`https://vmgraphiteindustries.com/admin`**
2. Sign in with your registered account credentials.
3. You will see the Sanity Studio navigation menu on the left sidebar.

---

### 1. Adding or Editing Products
1. In the left sidebar, click on **Products**.
2. To edit an existing product, click its title.
3. To add a new product, click the **Create New (pencil icon)** button at the top.
4. Fill in the product details:
   - **Product Title:** e.g., *Synthetic Graphite Suspension 99%*
   - **Product Category:** Select the appropriate category from the dropdown (e.g., *Graphite Lubricants*).
   - **Short Summary:** 1–2 sentence description for search engines and category cards.
   - **Key Features / Highlights:** Bullet points emphasizing key industrial advantages.
   - **Technical Specifications Table:** Click *Add Item* to enter property-value pairs (e.g., *Carbon Content: 99.5%*, *Ash Content: <0.2%*, *Particle Size: 5–20 µm*).
   - **Product Images:** Click *Upload* to select high-resolution images of the product or packaging.
   - **Brochures & Technical Data Sheets (TDS):** Upload PDF documentation so customers can download it directly from the product page.
   - **Website URL Slug:** Click **Generate** to create a clean, search-engine-friendly web link.
5. Click the green **Publish** button in the bottom right corner.
6. **Result:** The product is immediately live on `vmgraphiteindustries.com/products/[slug]`.

---

### 2. Managing Product Categories
1. In the sidebar, click on **Product Categories**.
2. You can create or re-order industrial categories (e.g., *Colloidal Graphite, Synthetic Powders, Carbon Additives*).
3. Set a category title, brief description, and thumbnail image.
4. Click **Publish**.

---

### 3. Updating the Home Page Content
1. In the sidebar, click on **Home Page Content**.
2. Here you can edit:
   - **Hero Headline & Subtext:** The primary banner text visitors see when landing on the website.
   - **Showcase Products:** Select which products appear prominently in the homepage bento grid.
   - **Value Proposition Points:** Update the "Why Choose V.M. Graphite" points, icons, and statistical counters (e.g., *25+ Years Experience, 500+ Metric Tons Annual Capacity*).
3. Click **Publish** to make changes visible instantly.

---

### 4. Updating Company Information & Contact Details
1. In the sidebar, click on **Site Settings** or **Contact Page Content**.
2. Update:
   - Official company phone numbers and WhatsApp direct contact.
   - Official sales and inquiry emails (`info@vmgraphiteindustries.com`, `sales@vmgraphiteindustries.com`).
   - Manufacturing plant and registered office physical addresses.
   - Google Maps embed location link.
   - Social media profiles (LinkedIn, Facebook, etc.).
3. Click **Publish**.

---

### 5. Managing Downloadable Resources & Brochures
1. In the sidebar, click on **Downloads & Catalogues**.
2. Upload company profiles, product catalogues, ISO certifications, and TDS/MSDS documents.
3. Visitors can access these from the dedicated **Downloads** page.

---

## 🌐 Technical Configuration & DNS Reference

For reference by your IT or domain administrators:

### Domain & Nameserver Configuration
* **Registered at:** Hostinger
* **Hostinger Nameservers changed to Cloudflare:**
  - Primary Nameserver: `[Cloudflare Assigned Nameserver 1]`
  - Secondary Nameserver: `[Cloudflare Assigned Nameserver 2]`

### Cloudflare DNS Records (Targeting Netlify)
* **Root Domain (`@` / `vmgraphiteindustries.com`):** `A` record pointing to Netlify Load Balancer IP `75.2.60.5` (or Netlify apex apex configuration).
* **Subdomain (`www` / `www.vmgraphiteindustries.com`):** `CNAME` record pointing to `[your-netlify-app].netlify.app`.
* **SSL/TLS Encryption:** Full (Strict) SSL managed through Cloudflare Edge Certificates.
* **Email Records (MX / TXT):** Hosted as configured for your business email provider (Hostinger / Google Workspace / Zoho).

---

## ❓ Frequently Asked Questions (FAQ) & Troubleshooting

#### Q: I clicked "Publish" on a product in Sanity, but I don't see it on the website.
* **Answer:** Ensure you clicked **Publish** (green button) and not just saved a draft. Then, perform a hard refresh in your browser (`Ctrl + F5` on Windows or `Cmd + Shift + R` on Mac) to clear local browser cache. Because the site is running SSR (Server-Side Rendering), published content appears immediately.

#### Q: How do I invite a new colleague to edit products?
* **Answer:** Visit [https://www.sanity.io/manage](https://www.sanity.io/manage), log in, select the `vm-graphite-industries` project, click on the **Members** tab, and enter your colleague's email address with the "Editor" or "Administrator" role.

#### Q: Where do customer inquiries go?
* **Answer:** Inquiries entered on the contact form or quote requests arrive directly at **`info@vmgraphiteindustries.com`**. Check your spam/junk folder and mark it as "Not Spam" if it ever lands there initially.

#### Q: How do I renew my website domain name?
* **Answer:** Log into **Hostinger** at [hpanel.hostinger.com](https://hpanel.hostinger.com), navigate to **Domains**, and verify that auto-renewal is enabled for `vmgraphiteindustries.com`.

---

## 📞 Support & Maintenance Contact

If you require any technical assistance, major feature expansions, or server adjustments:

* **Primary Developer / Agency Support:** Kanuka Bhagat
* **Documentation Maintained At:** `/PROJECT_HANDOVER_DOCUMENT.md` in the project repository.
