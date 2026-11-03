# LinkedIn & X Account Management Portfolio

A responsive, static single-page portfolio for an independent social media account manager. Built with semantic HTML, CSS, and vanilla JavaScript. It has no build step or runtime dependencies.

The service scope is account management: clients provide the content, and the manager coordinates approved publishing, profile upkeep, agreed engagement, and reporting. Content creation is not offered.

## Files

- `index.html` — main page and inquiry form
- `css/styles.css` — design system and responsive styles
- `js/config.js` — editable identity, profile URLs, and form endpoint
- `js/portfolio.js` — demonstration sample data, filters, and accessible detail dialog
- `js/main.js` — navigation, service prefill, FAQ, and footer year
- `js/form.js` — validation and configurable form submission
- `assets/images/` — owner portraits and client profile avatars
- `privacy.html` — privacy notice placeholder to complete before launch
- `robots.txt`, `sitemap.xml`, `404.html` — static hosting support

## Run locally

Open `index.html` directly, or start a static server from this folder:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize

Edit `js/config.js` to change the name, biography, email, LinkedIn URL, X URL, and form endpoint. Only valid HTTPS profile URLs are turned into external links. Update the intro and About copy in `index.html` to reflect genuine experience and skills. The site loads Manrope for headings and Inter for body/UI text from Google Fonts with system fallbacks.

## Replace demonstration samples

Edit `window.PORTFOLIO_ITEMS` in `js/portfolio.js`. Each object has an `id`, `category` (`linkedin`, `x`, or `planning`), `platform`, `type`, `title`, `objective`, `description`, and `content`. Use only work you have permission to show; keep the demonstration disclaimer until all samples have been replaced with verified work. Do not add unverified outcomes or metrics. Client profile links are in the Client accounts section of `index.html`.

## Configure inquiry delivery

The form is intentionally disconnected by default. Create and verify a Formspree form, then set its endpoint in `js/config.js`:

```js
formEndpoint: 'https://formspree.io/f/your-form-id'
```

The form accepts only a Formspree HTTPS endpoint and shows success only after an HTTP success response. It includes accessible inline validation and a honeypot field. Test a real submission after configuration, check delivery and spam handling in the provider, and update the privacy notice to identify the actual processor, data use, and retention. Do not put passwords or secrets in the static site.

## Domain and SEO

Replace `https://your-domain.com/` in `index.html`, `robots.txt`, and `sitemap.xml` with the canonical deployed URL. The Open Graph and X card image points to the supplied professional portrait; verify the deployed URL resolves. Update the title and description for the final brand.

## Deploy

- **GitHub Pages:** push the files to a repository and enable Pages for the desired branch/folder.
- **Netlify:** import the repository or deploy the folder; no build command is needed.
- **Vercel:** import the repository as a static site; no framework or build command is needed.

## Pre-launch checks

- Confirm name, biography, credentials, profile links, and contact method are accurate.
- Confirm you have permission to show the client names, profile links, and avatars publicly.
- Verify the deployed Open Graph/X image URL and replace the domain placeholders.
- Add and test the actual Formspree endpoint and confirm a delivered inquiry.
- Complete the privacy notice and make sure its claims match actual data handling.
- Replace demonstration samples only with authorized, genuine work.
- Update all canonical, sitemap, and robots domain placeholders.
- Check the deployed site at 320, 375, 768, 1024, and 1440px and with keyboard navigation.
