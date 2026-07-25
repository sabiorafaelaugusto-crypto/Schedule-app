# Contributing to Prospecting Schedule

Thanks for your interest in contributing! This is a personal portfolio
project, but issues, suggestions, and pull requests are welcome.

## Getting set up

```bash
git clone https://github.com/<your-username>/prospect-schedule.git
cd prospect-schedule
npm install
npm run dev
```

Open the local URL Vite prints. See the main [README](./README.md) for the
iOS/Xcode build instructions.

## Project structure

```
src/
  components/   Presentational pieces (card, popups, drawers, nav)
  data/         Seed data used to preview the app
  lib/          Date classification, storage, and interaction helpers
  screens/      Full-page screens (e.g. the appointment form)
  App.jsx       Top-level state and screen orchestration
ios/            Generated Capacitor/Xcode project — don't hand-edit
```

## Making changes

1. Fork the repo and create a branch from `main`:
   ```bash
   git checkout -b your-feature-name
   ```
2. Make your changes. Keep components small and focused — most existing
   components do one thing (a card, a drawer, a dialog).
3. Before opening a PR, make sure the app still builds:
   ```bash
   npm run build
   ```
4. If your change affects the app shown on iOS, sync and check it there too:
   ```bash
   npm run ios:sync
   ```
5. Open a pull request describing what changed and why. Screenshots or a
   short screen recording are appreciated for anything visual.

## Reporting bugs / suggesting features

Please open an issue with:
- What you expected to happen
- What actually happened
- Steps to reproduce (for bugs)

## Code style

- Functional React components, no class components.
- Tailwind utility classes for styling — the design tokens (colors, fonts)
  live in `tailwind.config.js`; avoid hardcoding raw hex values elsewhere.
- Keep business rules (e.g. how appointments are classified into tabs) in
  `src/lib/`, not scattered across components.
