# stafura.dev

Source for [stafura.dev](https://stafura.dev) — personal site and blog, built with [Hugo](https://gohugo.io) using the [berg](https://github.com/matusstafura/berg-hugo-theme) theme.

## Setup

```bash
git clone --recurse-submodules https://github.com/matusstafura/stafura.dev-hugo.git
cd stafura.dev-hugo
```

If you already cloned without `--recurse-submodules`:

```bash
make install
```

## Development

```bash
hugo server -D
```

## Build

```bash
hugo
```

Output goes to `public/`.

## Updating the theme

```bash
make update
```

## License

Content is © Matus Stafura. Theme code follows the license of the [berg theme](https://github.com/matusstafura/berg-hugo-theme).
