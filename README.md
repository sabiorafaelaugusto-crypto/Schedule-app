# Prospecting Schedule

A mobile-first app to organize job-prospecting appointments — designed and
built end-to-end as a personal project, from product spec to a real,
installable iOS app.

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-iOS-119EFF?logo=capacitor&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)

## Table of contents

- [About](#about)
- [Features](#features)
- [Stack](#stack)
- [Running locally](#running-locally)
- [Building the iOS app (Xcode)](#turning-this-into-an-installable-ios-app-xcode--capacitor)
- [Project structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## About

This app grew out of an earlier prototype (V1) built to track appointments
tied to a job search — follow-ups, interviews, application deadlines. This
version (V2) was rebuilt from the ground up with a clearer product spec and
a distinct visual identity, then shipped as a real app on an iPhone using
Capacitor.

The full product-planning process — module inventory, functional decisions,
and feature specs — is intentionally part of this project's story, not just
the code.

## Features

- **Schedule view** with three tabs — `Previous`, `Today`, `Upcoming` —
  appointments are classified automatically by date, with a rolling 7-day
  window for `Upcoming` and a 30-day retention window for `Previous`.
- **Appointment creation** on a dedicated screen: title, date, time,
  priority, and notes — only the date is required.
- **Visual priority picker** (a bottom drawer) instead of a plain dropdown,
  color-coded High/Medium/Low.
- **Long-press interactions** on any appointment card: Edit, Duplicate, or
  Delete — no destructive action is ever a single accidental tap away.
- **Delete confirmation with a 5-second undo window** before a deletion
  becomes permanent.
- **Local persistence** — no backend, no account, no login. Data lives on
  the device.

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) with a custom design-token set
  (see `tailwind.config.js`)
- [Capacitor](https://capacitorjs.com/) to ship it as a real iOS app,
  using Swift Package Manager (no CocoaPods needed)
- No backend, no database — all data is local to the device for now

## Running locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). The
layout is mobile-first — use your browser's device toolbar, or open the
URL on your phone while on the same network, to preview it as intended.

> **Don't double-click `index.html` directly.** Browsers block ES module
> scripts opened via `file://`, so the page will look blank. Always use
> `npm run dev` (or `npm run build` + a local server) instead.

## Turning this into an installable iOS app (Xcode + Capacitor)

This repo already includes the Capacitor setup and a generated `ios/`
Xcode project. It uses Swift Package Manager, not CocoaPods, so **Xcode is
the only extra tool you need** beyond Node.js.

1. **Install dependencies and build the web app:**
   ```bash
   npm install
   npm run build
   ```
2. **Copy the build into the iOS project:**
   ```bash
   npm run ios:sync
   ```
3. **Open the project in Xcode:**
   ```bash
   npm run ios:open
   ```
4. In Xcode, select `App` in the sidebar → **Signing & Capabilities** →
   choose your Apple ID under **Team** (any free Apple ID works).
5. Connect your iPhone, select it as the run destination next to the Play
   button, and press **Play**.
6. On the iPhone: **Settings → General → VPN & Device Management** → trust
   your developer certificate, then open the app.

With a free Apple ID (no paid Developer Program), the installed app expires
after 7 days — just repeat steps 5–6 to reinstall. The $99/year Apple
Developer Program removes that limit and is only needed for App Store
distribution.

Any time you change the code: `npm run ios:sync`, then press Play again.

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

## Roadmap

Ideas parked for later, not yet built:

- Connecting the schedule to Apple Calendar and/or Google Calendar.
- Revisiting whether "empty" appointments (only a date, no other field)
  should be preventable, based on real usage.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md) for
setup steps, project conventions, and how to open a pull request.

## License

[MIT](./LICENSE)
