# PDU Africa — UI/UX Design Scholarship Bootcamp

A single-file static landing page for the **PDU Africa UI/UX Design Scholarship Bootcamp** by Idealnovate. Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies to install.

---

## Project Structure

```
pdu/
├── index.html               # Main landing page (all CSS + JS inline)
├── success/
│   └── index.html           # Post-enrollment success page
└── Pictures/                # All image assets (logos, hero, testimonials, etc.)
```

---

## Local Development

Open `index.html` directly in a browser — no server needed.

For live reload during editing, use VS Code's **Live Server** extension or any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

---

## Page Sections (in order)

| Section | ID | Notes |
|---|---|---|
| Navbar | `#navbar` | Sticky, hamburger on mobile |
| Hero | `#hero` | `Idealhero.jpg`, avatar stack, June 27 float card |
| Countdown Banner | `#countdown-banner` | Live 2-day rolling timer |
| Info Strip | `#info-strip` | 4 key programme chips |
| Who Is This For | `#who-for` | 5 cards + bridge |
| Benefits | `#benefits` | 4 feature cards |
| Tools | `#tools` | Figma, Adobe XD, Notion etc. |
| Companies | `#companies` | Scrolling marquee — companies that hire designers |
| Qualification Requirements | `#qualification` | Checklist + social chips |
| Curriculum | `#curriculum` | Sticky sidebar + accordion sessions |
| Student Projects | `#projects` | 6 portfolio project cards |
| Testimonials | `#testimonials` | Dual-row opposing marquee, dark background, Tes1–Tes8 |
| Certification | `#certification` | 4 numbered steps + `WebSample.jpg` |
| Community | `#community` | WhatsApp + Telegram community section |
| Kickstart / Enroll | `#kickstart` | Main CTA, mini countdown, no-risk bar |
| FAQ | `#faq` | Sticky sidebar + 8 accordion items |
| Pre-footer Countdown | `#countdown-banner-footer` | Matches top banner style |
| Footer | `#footer` | 3-col grid, social icons, legal links |
| Enrollment Modal | `#enroll-modal` | 7 form fields → Google Sheets + welcome email |

---

## Key Configuration Values

| What | Where | Current Value |
|---|---|---|
| Apps Script URL | `index.html` — `const SCRIPT_URL` | Set (deployed) |
| Cohort start date | Hero float card, kickstart section | **June 27th 2026** |
| Countdown key | `index.html` JS — `var KEY` | `'pdu_admission_deadline'` |
| Countdown duration | `index.html` JS — `var DURATION` | 2 days (rolling) |
| WhatsApp contact | Multiple CTA buttons | `wa.me/2349065436488` |
| Hiring enquiries | FAQ section | `hire@pduafrica.com` |
| Privacy Policy / Terms | Footer links | Shared Google Doc |

**To update the cohort date:** search for `June 27th 2026` and `June 27` across `index.html` and `success/index.html` and replace all instances.

---

## Google Apps Script Setup

The enrollment form posts to a Google Apps Script Web App that writes each applicant to a Google Sheet and sends an automated welcome email.

### Steps

1. **Create a Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
   - Copy the Sheet ID from its URL:
     `https://docs.google.com/spreadsheets/d/**<SHEET_ID>**/edit`

2. **Create the Apps Script project**
   - Open [script.google.com](https://script.google.com) → **New project**
   - Paste your enrollment handler script
   - Replace `'YOUR_GOOGLE_SHEET_ID'` with your actual Sheet ID

3. **Deploy as a Web App**
   - Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me** (your PDU / Idealnovate Gmail account)
   - Who has access: **Anyone**
   - Click **Deploy** and copy the Web App URL

4. **Wire the URL into the landing page**
   - In `index.html`, find:
     ```js
     const SCRIPT_URL = 'https://script.google.com/macros/s/...';
     ```
   - Replace with the URL you copied above.

5. **Authorize on first run**
   - Click **Run** on any function in the script editor to trigger the OAuth popup
   - Grant access to Gmail and Google Sheets

6. **Re-deploy after edits**
   - Any changes to the script require a new version:
     **Deploy → Manage deployments → Edit → New version → Deploy**
   - The Web App URL stays the same — no change needed in `index.html`

### What the script does

| Action | Detail |
|---|---|
| Receives form submission | `doPost(e)` parses JSON body sent with `Content-Type: text/plain` |
| Writes to Sheet | Appends a row with timestamp + 7 applicant fields; auto-creates a formatted header on first run |
| Sends welcome email | Branded HTML email from your Gmail via `GmailApp.sendEmail()` |
| Redirect | After submit, page always redirects to `success/` regardless of response |

---

## Enrollment Form Fields

| Field | ID | Sheet Column |
|---|---|---|
| First Name | `f-firstname` | First Name |
| Last Name | `f-lastname` | Last Name |
| Email | `f-email` | Email |
| Phone (WhatsApp) | `f-phone` | Phone (WhatsApp) |
| Gender | `input[name="gender"]` | Gender |
| How They Heard | `f-referral` | How They Heard |
| Has Computer | `input[name="hasComputer"]` | Has Computer |

---

## Countdown Timer

The top banner and pre-footer banner both share a rolling 2-day countdown stored in `localStorage` under the key `'pdu_admission_deadline'`. It resets automatically when it expires, creating urgency on every visit without a fixed end date.

To change the duration, update `DURATION` in the JS block near the bottom of `index.html`:
```js
var DURATION = 2 * 24 * 60 * 60 * 1000; // 2 days in ms
```

---

## Deployment

The site is a static folder — deploy to any static host:

- **Hostinger / cPanel** — upload the folder contents via File Manager or FTP
- **Netlify** — drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages** — push to a repo and enable Pages from the `master` branch root

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 (custom properties, grid, flexbox, animations) |
| Scripts | Vanilla JavaScript (ES6+) |
| Animations | [AOS](https://michaelosthege.github.io/aos/) v2.3.4 |
| Icons | [Font Awesome](https://fontawesome.com/) 6.5.0 |
| Fonts | Montserrat + Jost (Google Fonts) |
| Backend | Google Apps Script (serverless) |
| Database | Google Sheets |
| Email | Gmail via `GmailApp` API |

---

© 2026 PDU Africa by Idealnovate
