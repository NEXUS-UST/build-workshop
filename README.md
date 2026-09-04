# Build Your Personal Website

A NEXUS workshop that teaches beginners to ship a personal website in about twenty minutes.

**Status:** Live · GitHub Pages from `main` · first run 4 December 2025 · public

|  |  |
|---|---|
| **What it is** | A single-page workshop site: the slides, the live demo script, and the reference students keep afterwards |
| **Who it's for** | University of St. Thomas students with no coding background |
| **Live at** | [build.ustnexus.club](https://build.ustnexus.club) |
| **Stack** | HTML · CSS · vanilla JavaScript · Lucide icons · GitHub Pages |
| **Status** | Live · HTTPS enforced · 8 commits · no build step, no dependencies |

Most workshop decks stop working the moment the projector turns off. This one is a website, so it does
both jobs: the presenter scrolls through it live, and every attendee still has the same URL a month
later when they finally sit down to build. It is the room's slide deck and the room's homework page.

## What it covers

Ten sections, in the order they are presented:

- **The Reality Check** and **The Opportunity** — why a personal site beats a PDF résumé
- **The Paradigm Shift** — what building a website used to cost in time or money, and what it costs now
- **Under the Hood** — a site is folders, files, and text; static versus dynamic
- **The Building Blocks** — the three ingredients: a domain, a repository, and the code
- **The Evolution** and **Your Arsenal** — the tool landscape, from no-code builders to AI-assisted editors
- **Let's Go** — the three-step live build: create an account, describe the site, connect a domain
- **Get Inspired** — six starter templates, one featured
- **Keep Going** — learning resources, free hosting, domain registrars, and design galleries

The page also carries a countdown to the session start and a name-and-email check-in form that opens
for the first thirty minutes. Both are time-gated in JavaScript; see [Known limitations](#known-limitations).

## Why it exists, and who it's for

Students who have never opened a code editor, run by a presenter who has. Nothing on the page assumes
a terminal, a package manager, or a GitHub account — the demo path uses a browser-based builder and
ends with a real domain. `WORKSHOP_NOTES.md` holds the original handwritten outline the site was built
from, so anyone can re-run the session without the person who wrote it.

## Quickstart

The site is static. Open it directly, or serve it so relative paths and the fonts behave:

```bash
git clone https://github.com/NEXUS-UST/build-workshop.git
cd build-workshop
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Any static server works:

```bash
npx serve .
```

There is nothing to install and nothing to compile. Edit `index.html`, reload the browser.

## How it's organised

```
build-workshop/
├── index.html          # The whole workshop — all ten sections, countdown, check-in form
├── style.css           # Design system: dark theme, UST purple (#663399), Inter + JetBrains Mono
├── script.js           # Countdown, check-in window, scroll animations, active-nav tracking
├── nexus-logo.jpg      # Club mark used in the header
├── WORKSHOP_NOTES.md   # Presenter notes: agenda, talking points, tool comparison table
├── CNAME               # build.ustnexus.club — read by GitHub Pages
└── .nojekyll           # Serve files as-is; skip Jekyll processing
```

One external runtime dependency: Lucide icons, loaded from `unpkg.com` at page load. Fonts come from
Google Fonts. Everything else is committed here.

## Deploying

GitHub Pages serves `main` from the repository root. Push to `main` and the change is live within a
minute or two — there is no workflow file and no build step. The custom domain comes from `CNAME`;
the Let's Encrypt certificate is provisioned by GitHub and HTTPS is enforced. If you change the
domain, edit `CNAME` and update the DNS record, then re-check Pages settings — the certificate takes
up to thirty minutes to reissue.

## Known limitations

- **The countdown and check-in window are hardcoded** to 4 December 2025 in `script.js`. Both are past,
  so neither renders now. Re-running the workshop means editing those three constants.
- **Check-ins are stored in `localStorage` only.** They never leave the attendee's browser, so the
  presenter's device is the only place a roster exists. There is no backend.
- **`lucide@latest` is unpinned.** A breaking release upstream would change the icons without a commit here.
- **`WORKSHOP_NOTES.md` still lists open items** — a history mention, a static-versus-dynamic section,
  and a cost comparison that were planned but not built.

## License

No `LICENSE` file is committed, so default copyright applies to the code and the workshop content,
© NEXUS, University of St. Thomas. The material exists to be re-run and copied by students — ask at
[nexus@stthomas.edu](mailto:nexus@stthomas.edu) and it is almost certainly a yes.

Club site: [ustnexus.club](https://ustnexus.club).
