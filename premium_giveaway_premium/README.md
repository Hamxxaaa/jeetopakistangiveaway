Premium Lucky Draw — Premium Animated Landing Page
==================================================

Files included:

- index.html
- css/style.css
- js/app.js
- data/last_winner.json
- assets/gift.svg, phone.svg, car.svg, winner_sample.svg


Important: BEFORE deploying, replace the placeholder FORM_B64 in js/app.js with your base64-encoded Google Form URL.

How to create base64 encoded form URL (quick):

Browser console:
btoa('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform')

OR (Node):
node -e "console.log(Buffer.from('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform').toString('base64'))"

Then open js/app.js and replace the line:
const FORM_B64 = "REPLACE_WITH_BASE64_ENCODED_FORM_URL";

--- Deployment (quick)
Option A — GitHub Pages:
  1. Create a new GitHub repo and push these files.
  2. In repo Settings -> Pages, set branch to main and folder to root.
  3. Wait a minute and your site will be available at https://username.github.io/repo

Option B — Netlify (recommended):
  1. Create a Netlify account (free) and connect GitHub repo, or drag & drop the folder on Netlify Sites.
  2. Netlify autodeploys and gives a friendly URL.

--- Adding Ad Scripts
- Paste OnClick / PopUnder scripts from PropellerAds / Adsterra in the <head> of index.html.
- Paste banner ad snippets inside ad elements: .ad-inline, #ad-side-top, #ad-side-bottom, #ad-banner
- Do not attempt to auto-click ads; rely on OnClick/popunder scripts that fire on user gesture (the share click).

--- Notes on share-to-unlock
- The site counts SHARE button clicks as share actions (it cannot fully verify the user completed the share in WhatsApp).
- Each click increases the progress; 5 clicks unlock the Enter button for 7 days (stored in localStorage).

--- Replacing images
- Drop your real hero/3D images into the assets/ folder and update index.html img src attributes.

If you want, I can deploy this to a GitHub repo for you or customize the look further (fonts, exact colors, or use your uploaded template images).
