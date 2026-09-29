# 📋 Client Project Handover Document
**Project Name:** V.M. Graphite Industries Official Web Platform  
**Live Website URL:** [https://vmgraphiteindustries.com](https://vmgraphiteindustries.com)  
**Content Management Admin Portal:** [https://vmgraphiteindustries.com/admin](https://vmgraphiteindustries.com/admin)  
**Handover Date:** September 2026  
**Document Version:** 2.0 (Client Account Final)

---

## 📌 Executive Summary

This document serves as the complete technical and operational handover for **V.M. Graphite Industries LLP**. It is designed specifically for management, non-technical team members, and administrators. 

All core accounts across hosting, domain management, content management, source code, and lead generation have been consolidated under the official master Google Account: **`vmgraphite@gmail.com`**.

---

## 🏗️ Master Account & Services Architecture

```
[ Domain: Hostinger ] ──► [ DNS & Security: Cloudflare ] ──► [ CDN Hosting: Netlify ]
                                                                       │
                                              ┌────────────────────────┴────────────────────────┐
                                              ▼                                                 ▼
                                    [ Sanity.io Studio ]                             [ Web3Forms Service ]
                              (Product Catalog & Web Content)                   (Quote & Inquiry Lead Routing)
```

---

## 🔑 Master Accounts & Access Directory

All services use single-sign-on (SSO) via **"Sign in with Google"** using the primary email: **`vmgraphite@gmail.com`**.

| Service | Purpose | Login URL | Login Method / Account | Notes / Credentials |
| :--- | :--- | :--- | :--- | :--- |
| **Google Master Account** | Master identity for all services | [accounts.google.com](https://accounts.google.com) | `vmgraphite@gmail.com` | Primary admin recovery email |
| **Sanity.io** | Visual Content Manager (CMS) | [sanity.io/manage](https://www.sanity.io/manage) | **"Sign in with Google"** (`vmgraphite@gmail.com`) | Project ID: `vvhsg9ix`<br>Dataset: `production` |
| **Netlify** | Global CDN Web Hosting | [app.netlify.com](https://app.netlify.com) | **"Sign in with Google"** (`vmgraphite@gmail.com`) | Site Name: `vm-graphite-industries`<br>Live SSL active |
| **Cloudflare** | DNS Routing, SSL & Security | [dash.cloudflare.com](https://dash.cloudflare.com) | **"Sign in with Google"** (`vmgraphite@gmail.com`) | Domain: `vmgraphiteindustries.com`<br>Email routing active |
| **GitHub** | Source Code Repository | [github.com](https://github.com) | **"Sign in with Google"** (`vmgraphite@gmail.com`) | Org/Repo: `vmgraphite/vm-graphite-industries` |
| **Web3Forms** | Contact & RFQ Lead Delivery | [web3forms.com](https://web3forms.com) | Email: `vmgraphite@gmail.com` | Access Key: `1d7c6d2b-7e3b-43da-9921-48fe9da2ac8a`<br>Delivers to `info@vmgraphiteindustries.com` |
| **Hostinger** | Domain Registrar | [hpanel.hostinger.com](https://hpanel.hostinger.com) | Client Hostinger Account | Owns `vmgraphiteindustries.com`<br>Nameservers pointed to Cloudflare |

---

## 🛠️ Non-Technical Guide: How to Manage Website Content (Sanity Studio)

Your visual management studio is accessible at:  
👉 **[https://vmgraphiteindustries.com/admin](https://vmgraphiteindustries.com/admin)** *(or via [sanity.io/manage](https://www.sanity.io/manage))*

### 1. Adding a New Product
1. Log into **`https://vmgraphiteindustries.com/admin`** using Google (`vmgraphite@gmail.com`).
2. In the left sidebar, click **6. Products Catalog**.
3. Click the **Create New (pencil icon)** at the top.
4. Fill in:
   - **Product Title:** e.g., *Synthetic Graphite Crucible 99%*
   - **Product Category:** Select from the dropdown (e.g., *Graphite & Carbon Products*).
   - **Short Summary:** 1–2 sentence overview for catalog cards.
   - **Primary Product Photo:** Upload a high-resolution image.
   - **Technical Specifications Table:** Click *Add Item* to enter property-value pairs (e.g., *Carbon Content: 99.5%*, *Max Temp: 3000°C*).
   - **Downloadable TDS / Brochure (PDF):** Upload technical data sheets for client downloads.
   - **Website URL Slug:** Click **Generate** to create the web address.
5. Click the green **Publish** button in the bottom right corner.

### 2. Editing Homepage Content
1. In the sidebar, click **1. Home Page Content**.
2. Edit banners, statistics (e.g., *99.9% Carbon Purity, 3000°C Max Thermal Rating*), and showcase products.
3. Click **Publish**.

### 3. Updating Contact Information & Addresses
1. Click **3. Contact Us Page Content** or **5. Header & Footer Settings**.
2. Update phone numbers, WhatsApp direct numbers, plant addresses, or emails.
3. Click **Publish**.

---

## ⚡ Automated Publishing Pipeline (Sanity ➔ Netlify)

Whenever you click **Publish** in Sanity, the system uses an automated webhook so you never need a developer to rebuild the site:

1. **You Publish in Sanity** ➔ 
2. **Sanity Webhook pings Netlify** ➔ 
3. **Netlify rebuilds the catalog in ~20 seconds** ➔ 
4. **New product is live on `vmgraphiteindustries.com/products/`**.

### Webhook Configuration Reference:
* **Netlify Build Hook:** Created under Netlify *Site configuration* ➔ *Build & deploy* ➔ *Build hooks*.
* **Sanity Webhook:** Set up in Sanity *API* ➔ *Webhooks* (Dataset: `production`, Triggers: Create/Update/Delete).

---

## 📬 Customer Inquiries & Lead Generation Workflow

1. When a visitor submits a query via **"Contact Us"** or clicks **"Request Quote"** on any product page:
   - The inquiry is delivered instantly to **`info@vmgraphiteindustries.com`** via Web3Forms.
   - The lead includes: Client Name, Company Name, Work Email, Phone Number, Target Product, Quantity Required, Timeline, Specifications, and Timestamp.
2. **Manual Fail-Safe:** If a customer's internet connection glitches, the form displays a 1-click **"Send Pre-filled Email to info@vmgraphiteindustries.com"** and **"Fast-Track on WhatsApp"** button so no lead is ever lost.

---

## 🌐 DNS & Domain Infrastructure Reference

* **Domain:** `vmgraphiteindustries.com`
* **Registrar:** Hostinger (Nameservers pointed to Cloudflare)
* **Cloudflare DNS Records:**
  - `A` Record (`@`): Pointing to Netlify (`75.2.60.5`)
  - `CNAME` Record (`www`): Pointing to `vm-graphite-industries.netlify.app`
  - `MX` Records: Cloudflare Email Routing to `info@vmgraphiteindustries.com` / `vmgraphite@gmail.com`
  - `SSL/TLS Mode`: **Full (Strict)** with Always Use HTTPS enabled.

---

## ✅ Client Handover Checklist: Is anything else required?

| Item | Status | Action Required |
| :--- | :---: | :--- |
| **All Google Logins (`vmgraphite@gmail.com`)** | ✅ Configured | Client has master ownership across all tools |
| **Sanity Project (`vvhsg9ix`)** | ✅ Active | Data imported & live |
| **Netlify Global Hosting** | ✅ Active | Custom domain connected with SSL |
| **Cloudflare DNS & SSL** | ✅ Active | Full SSL & email routing active |
| **Contact & RFQ Email Routing** | ✅ Active | Delivers to `info@vmgraphiteindustries.com` |
| **Sanity ➔ Netlify Auto-Deploy Webhook** | ℹ️ Verify | Ensure Webhook URL is added in Sanity Dashboard |
| **Domain Auto-Renewal on Hostinger** | ℹ️ Verify | Ensure a payment card is saved in Hostinger for yearly renewal |

---

## 📞 Technical Support Contact

* **Project Developer:** Kanuka Bhagat
* **Project Documentation File:** `PROJECT_HANDOVER_DOCUMENT.md`
