# Pre-landers UI Cheatsheet

**[Open the live page →](https://playua20.github.io/pre-lander-cheat-sheet/)**

A working catalogue of the interface pieces a pre-lander actually needs, built
in plain HTML, CSS and JavaScript — no framework, no build step, no CDN. Open
`index.html` and every block is on one page, in its real state, ready to be
lifted into a project.

It exists because the same dozen blocks come back on every pre-lander, and
rewriting them each time is where the hours go. Here they are once, with the
behaviour already attached.

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

- `form` — the request form: inline validation, states, submission
- `congrats` — the confirmation screen after a send
- `sweepstake` — the prize-draw block

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

- Everything is static: it runs from the file system, from GitHub Pages, or
  from any host that serves files.
- A few labels on the page are in Ukrainian — this started as a working tool.
  The component code itself carries no language.
- `*-OLD.*` files are the first version, kept for reference since the rewrite
  to a component-based layout.
