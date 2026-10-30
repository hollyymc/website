# Holly McHugh – portfolio

A static site (HTML, CSS and JS only, no build step).

- `index.html` – all the content and windows
- `style.css` – styling
- `script.js` – opening, closing and dragging windows
- `icons/` – dock and folder icons
- `assets/background.jpg` – desktop background

To preview locally, open `index.html` in a browser.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On vercel.com choose **Add New → Project** and import the repo.
3. Leave the framework preset as **Other**, with no build command and no output directory. Deploy.

Or from the terminal: `npm i -g vercel`, then run `vercel` in this folder (`vercel --prod` for production).

Before deploying, add `cv.pdf` to the root of this folder (the CV window links to it), plus `icons/linkedin.png` and `icons/github.png` if you want real icons for those two.
