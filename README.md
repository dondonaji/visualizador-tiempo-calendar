# ⏳ Visualizador de Tiempo

> A minimalist, privacy-focused Progressive Web App (PWA) to visualize the passage of time across different scales.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla_JS-yellow)
![PWA](https://img.shields.io/badge/PWA-Ready-blue)

## 📋 Overview

**Visualizador de Tiempo** is a tool designed to provide perspective on how time flows. Unlike a traditional calendar, it visualizes the *percentage* of time elapsed in the current week, month, and year, helping users stay grounded and aware of their temporal context.

Built entirely with **Vanilla JavaScript**, it emphasizes performance, no external dependencies, and modern web capabilities.

## ✨ Key Features

-   **Multi-Scale Visualization**: Switch seamlessly between Week, Month, and Year views to see time from different altitudes.
-   **📅 Custom Periods**: Define specific date ranges (e.g., "Project Deadline", "Quarter 1") to track progress against personal goals.
-   **🎨 Dynamic Theming**: Includes Light, Dark, and Accent modes to match your preference or system settings.
-   **📱 PWA Capable**: Installable on iOS and Android. Works offline and feels like a native app.
-   **⚡ Zero Dependencies**: Blazing fast load times with no heavy frameworks or bundles.

## 🛠️ Tech Stack

*   **Core**: HTML5, CSS3, JavaScript (ES6+ Modules)
*   **Architecture**: Component-based logic without framework overhead (see `monthView.js`, `weekView.js`, etc.)
*   **Styling**: Native CSS Variables for theming.
*   **Font**: [Space Mono](https://fonts.google.com/specimen/Space+Mono) for a clean, data-centric aesthetic.

## 🚀 Getting Started

Since this is a static web application, you don't need `npm install` or a build step.

### 1. Clone the repository
```bash
git clone https://github.com/dondonaji/VISUALIZADOR-TIEMPO.git
cd VISUALIZADOR-TIEMPO
```

### 2. Run Locally
You can use any static file server.

**Using Python:**
```bash
python -m http.server
# Open http://localhost:8000
```

**Using Node (npx):**
```bash
npx serve .
# Open http://localhost:3000
```

**Using VS Code:**
- Install the **Live Server** extension.
- Right-click `index.html` -> "Open with Live Server".

## 📂 Project Structure

```
/
├── assets/             # Icons and static resources
├── app.js              # Main entry point & Orchestrator
├── index.html          # App Shell
├── manifest.json       # PWA Configuration
├── sw.js               # Service Worker (Offline support)
├── styles.css          # Global styles & Theming
└── [view].js           # Modular view logic (week, month, year...)
```

---

Developed by [Donaji Ramírez](https://github.com/dondonaji)
