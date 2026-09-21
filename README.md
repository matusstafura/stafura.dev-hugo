# stafura.dev

Source for [stafura.dev](https://stafura.dev): personal site and blog, built with [Hugo](https://gohugo.io) and [Tailwind CSS](https://tailwindcss.com) v4. All templates live in `layouts/` (no external theme).

## Setup

```bash
npm install
```

## Development

Run both, in two terminals:

```bash
npm run dev      # Tailwind in watch mode: styles/main.css -> assets/css/site.css
hugo server -D
```

## Build

```bash
npm run build    # compile + minify the CSS
hugo             # output goes to public/
```

`assets/css/site.css` is compiled output and is committed on purpose, so the site can be deployed with Hugo alone. Because `package.json` exists, DigitalOcean App Platform uses the Node buildpack, where `hugo` isn't on the PATH; the `hugo-bin` dev dependency provides it, and the build command should be `npm run build:site`. Run `npm run build` and commit it after changing anything in `styles/main.css` or adding new Tailwind classes to templates.

## Design system

Everything visual is defined in `styles/main.css`:

- **Tokens**: `paper`, `ink`, `muted`, `line`, `edge`, `accent` (light/dark via CSS variables on `:root` / `.dark`).
- **One link style**: `.link` (underlined) and `.link-quiet` (underline on hover); prose links use the same look.
- **One button style**: `.btn`, with `.btn-outline` and `.btn-icon` variants.
- **One card style**: `.card`.
- The diagonal stripe background is the `bg-stripes` utility.

## License

Content is © Matus Stafura.
