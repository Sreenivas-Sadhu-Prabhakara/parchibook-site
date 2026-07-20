# ParchiBook — explainer site

A standalone marketing / explainer website for **ParchiBook**.

> **WhatsApp order to bill, in one tap.** — a simple monthly subscription, for kirana & grocery shop owners.

This is **not** the product itself; it is a single-page site that makes the idea instantly
clear to a non-technical shop owner and to an investor skimming for 30 seconds.

## The idea

Kirana shops already receive orders as WhatsApp messages. Today the owner re-types each order
onto a paper *parchi*, prices it from memory, and tries to keep the *khata* (credit ledger) up to
date. ParchiBook reads the WhatsApp message directly:

1. **Parse** the pasted order line by line.
2. **Match** each line to the shop's catalog by name or alias (case-insensitive, typo-forgiving)
   and price it from the saved rate.
3. **Flag** any unmatched line for a one-tap add.
4. **Produce** an itemized bill, a delivery-run list, and post the total to the customer's khata.

The dashboard shows today's orders, the unmatched-line count, and the outstanding khata total.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page content and structure |
| `styles.css` | All styling (palette built around the accent `#16A34A`) |
| `app.js` | Sticky nav, smooth scroll, and the hero chat-to-bill demo widget |
| `favicon.svg` | Site icon (a parchi/khata mark) |

## Running it

Fully self-contained — no build step, no dependencies, no CDNs, no external fonts.

- Open `index.html` directly in any browser, **or**
- Serve the folder statically, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying

Upload the folder as-is to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3).
No configuration required.

---

A **KARYA studio** build · sreeni.nintendo@gmail.com
