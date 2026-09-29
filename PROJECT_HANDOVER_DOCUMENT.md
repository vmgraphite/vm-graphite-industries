# Project Hand-off Document: VM Graphite Website

**Main Domain:** [www.vmgraphiteindustries.com](https://www.vmgraphiteindustries.com), [vmgraphiteindustries.com](https://vmgraphiteindustries.com)  
**CMS Admin Portal:** [https://vmgraphiteindustries.com/admin](https://vmgraphiteindustries.com/admin)  
**Primary Admin Account:**  
* **Email:** `vmgraphite@gmail.com`  
* **Login Method:** Sign in with Google (Google SSO)  

---

## 1. Master Account Access

All project accounts are linked to the primary admin account according to the information mentioned above.

**Important:** To access any of the services below, simply go to the login page and sign in with the primary admin Google account (`vmgraphite@gmail.com`).

| Service | Purpose (What it does) | Website Link |
| :--- | :--- | :--- |
| **Sanity.io** | Visual Content Management (CMS) where you add, edit, and manage all products, specs, and page text | [sanity.io/manage](https://www.sanity.io/manage) *(or `/admin`)* |
| **Netlify** | Web hosting server that keeps the site fast, online globally, and auto-updates when you publish in Sanity | [app.netlify.com](https://app.netlify.com) |
| **Cloudflare** | Manages domain DNS routing, SSL security certificate, and DDoS protection | [dash.cloudflare.com](https://dash.cloudflare.com) |
| **Web3Forms** | Sends an email to your inbox whenever a customer submits the "Contact Us" or "Request Quote" form | [web3forms.com](https://web3forms.com) |
| **GitHub** | Securely stores all the behind-the-scenes website source code | [github.com](https://github.com) |
| **Hostinger** | Domain registrar where the domain name `vmgraphiteindustries.com` is owned and renewed | [hpanel.hostinger.com](https://hpanel.hostinger.com) |

---

## 2. Service Limits (Free Tier)

We have utilized the professional Free Tiers for your setup. Below are the limits to keep in mind as the business grows:

### Netlify (Hosting & Deployments)
* **Bandwidth:** 100 GB per month (More than enough for thousands of monthly visitors).
* **Build Minutes:** 300 minutes per month (Each update or product publish uses only ~20 seconds of build time).
* **SSL Certificate:** Free and renews automatically.

### Sanity.io (Content Management / CMS)
* **API Requests:** 100,000 requests per month (Generous free tier).
* **Asset Storage:** Up to 5 GB for product images and PDF brochures.
* **Bandwidth:** 10 GB per month.
* **Admin Seats:** Up to 3 users with full editing access.

### Cloudflare (DNS & Security)
* **Bandwidth:** Unlimited. Unlike traditional hosts, Cloudflare does not charge for how many people visit your site.
* **DNS Records:** Up to 200 records (You are currently using fewer than 10).
* **SSL & DDoS Protection:** Unlimited and active 24/7.

### Web3Forms (Contact & RFQ Form)
* **Monthly Submissions:** 250 forms per month. If you receive more than 250 inquiries in a month, the form will stop sending emails until the next month unless upgraded.
* **Submission History:** Viewable in the dashboard for 30 days.
* **File Uploads:** Not supported on the free plan (standard text inquiries and quote requests).

---

## 3. Maintenance Guide for the Client

### Managing Products & Content (Sanity Studio)
1. Go to **`https://vmgraphiteindustries.com/admin`** and sign in with Google (`vmgraphite@gmail.com`).
2. **To Add a Product:** Click **6. Products Catalog** ➔ Click the **(+) Create New** button ➔ Fill in title, category, description, images, technical specifications table, and PDF datasheet ➔ Click the green **Publish** button.
3. **Automated Publishing:** Within ~20 seconds of clicking **Publish**, the live website automatically updates and displays your new product.

### Email Inquiries & Quote Requests
When a client submits a form on [vmgraphiteindustries.com](https://vmgraphiteindustries.com) or clicks "Request Quote", the email will arrive directly in your **`info@vmgraphiteindustries.com`** (and `vmgraphite@gmail.com`) inbox. It is sent via Web3Forms. If you ever stop receiving emails, check your Web3Forms dashboard to see if you have exceeded the 250-submission monthly limit.

### Domain Renewal
You must renew the domain `vmgraphiteindustries.com` every year. This is registered and managed through **Hostinger**. Cloudflare and Netlify provide the DNS and hosting for free, but the "name" itself must be paid for annually at the registrar (Hostinger). Ensure auto-renewal is turned on in Hostinger.

### Security & SSL
The "Padlock" icon (SSL) is handled automatically by Cloudflare and Netlify. It will never expire as long as the domain points to Cloudflare’s nameservers.

---

## 4. Instructions for Future Developers

If a new developer takes over this project, provide them with this document and the following technical notes:

* **Framework:** Built with **Astro** (Static Generation) + **React** + **Tailwind CSS**.
* **CMS:** **Sanity.io** Studio integrated at `/admin` (Project ID: `vvhsg9ix`, Dataset: `production`, API Version: `2024-08-01`).
* **Repository:** Hosted on GitHub at [https://github.com/vmgraphite/vm-graphite-industries.git](https://github.com/vmgraphite/vm-graphite-industries.git).
* **Hosting & Deployment:** Hosted via **Netlify** with automatic deployments on `git push` to `main` and automated rebuilds triggered via **Sanity Webhook ➔ Netlify Build Hook**.
* **DNS Management:** Managed entirely through **Cloudflare**. Do not modify DNS settings at Hostinger unless migrating the entire infrastructure.
* **Environment Variables in Netlify:**
  * `PUBLIC_SANITY_PROJECT_ID=vvhsg9ix`
  * `PUBLIC_SANITY_DATASET=production`
  * `PUBLIC_SANITY_API_VERSION=2024-08-01`
  * `CONTACT_EMAIL=info@vmgraphiteindustries.com`
  * `PUBLIC_WEB3FORMS_ACCESS_KEY=1d7c6d2b-7e3b-43da-9921-48fe9da2ac8a`
