# Pre-landers UI Cheatsheet

**[Open the live page →](https://playua20.github.io/pre-lander-cheat-sheet/)**

A working catalogue of the interface pieces a pre-lander actually needs, in
plain HTML, CSS and JavaScript. Open `index.html` and every block is on one
page, in its real state, ready to be lifted into a project.

## What is in it

**Components** — `assets/components/`

| | |
|---|---|
| `hero` | opening block with the headline and the first call to action |
| `navbar` | top bar, with the mobile state |
| `buttons` | the button set, in every size and state |
| `modal` | dialog with focus handling and a close on `Escape` |
| `disclosure` | show / hide blocks, keyboard accessible |
| `story-card` | testimonial and story cards |
| `product` | product block with price and action |
| `callout` | notices and warnings |
| `avatars` | round portraits, single and stacked |
| `breadcrumbs` | path above the content |
| `images` | responsive images with the right loading attributes |
| `footer` | closing block |
| `ripple` | touch feedback on tap |

**Interactive** — `assets/interactive/`

- `sweepstake` — the prize-draw block, and with it the lead form: it catches
  the submit, stops the reload, and swaps the form for a confirmation panel
- `form/form.js` and `congrats/congrats.js` are **empty placeholders** — the
  folders exist, the files hold nothing. What they were meant to carry already
  lives in `sweepstake.js`.

Nothing here sends anything, and nothing is meant to: this is a source of
frontend code to copy, not an intake. Submission belongs to the project the
block is copied into, together with its endpoint, its validation rules and
its spam traps — none of which can be decided here.

## How to use it

Nothing to install. Clone or download, open `index.html` in a browser, and copy
the block you need — each component keeps its CSS and its JS in its own folder,
so a block travels with everything it requires:

```
assets/components/modal/
    modal.js
assets/components/story-card/
    story-card.css
```

## Notes

- Everything is static: it runs straight from the file system, or from any host
  that serves files — GitHub Pages, where the live page above sits, as well as
  Vercel, Netlify and the rest.
- A few labels on the page are in Ukrainian — this started as a working tool.
  The component code itself carries no language.
- `*-OLD.*` files are the first version, kept for reference since the rewrite
  to a component-based layout.
