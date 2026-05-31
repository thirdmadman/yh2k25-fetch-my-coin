# 🪙 Fetch My Coin

A modern cryptocurrency rate tracking application that displays real-time exchange rates, detailed market statistics, and interactive price charts — all powered by the YouHodler API.

> **Live Demo**: [thirdmadman.github.io/yh2k25-fetch-my-coin](https://thirdmadman.github.io/yh2k25-fetch-my-coin)

## 📋 Overview

**Fetch My Coin** is a single-page application (SPA) that fetches real-time cryptocurrency exchange data from the [YouHodler API](https://app.youhodler.com/api/v3/rates/extended) and presents it in a clean, responsive interface. Users can browse a comprehensive list of cryptocurrencies, filter and sort the data, select any coin as a base currency for rate calculations, and view detailed analytics for individual coins.

### Supported Assets

The app supports **100+ cryptocurrencies and fiat currencies**, including:

- **Fiat**: USD, EUR, GBP, CHF, RUB
- **Stablecoins**: USDT, USDC, DAI, BUSD, PAXG, PYUSD, and more
- **Major Cryptos**: BTC, ETH, SOL, XRP, ADA, DOT, and others
- **DeFi Tokens**: AAVE, UNI, COMP, MKR, SUSHI, and more
- **Meme Coins**: DOGE, SHIB, PEPE, FLOKI, and more
- **Platform Tokens**: BNB, MATIC, AVAX, NEAR, TON, and more

Each asset includes metadata such as ticker icons, full names, and supported blockchain versions (e.g., ERC-20, BEP-20, TRC-20).

---

## ✨ Features

### Core Features

#### UI Features

- **Real-time Rates**: Fetches live exchange rates from the YouHodler API
- **Interactive Table**: Sortable columns, searchable by name or ticker
- **Column Visibility Toggle**: Show/hide table columns via dropdown menu
- **Base Currency Selector**: Calculate all rates relative to any coin (default: USD)
- **Any-coin Base**: Rates can be calculated relative to **any** coin in the list, not just fiat
- **Coin Detail Page**: View detailed rates, 1-hour price chart, and market statistics
- **1H Price History**: Line chart visualization of the past hour's price movement
- **Market Statistics**: Includes market cap, 24h volume, circulating/total supply, and market cap dominance
- **Dark/Light Mode**: Toggle between themes via the navbar
- **Responsive Design**: Fully functional on mobile and desktop

#### Technical Features

- **Hash-based Routing**: Compatible with static hosting (GitHub Pages)
- **Toast Notifications**: Real-time error feedback from API calls
- **Data Validation**: Zod schemas validate all API responses
- **Dynamic Page Titles**: Automatically updates based on the current route
- **Breadcrumbs**: Auto-generated navigation breadcrumbs in the navbar

## 🛠️ Tech Stack

| Category       | Technology                                      |
|----------------|-------------------------------------------------|
| **Frontend**   | React 19, TypeScript, Vite 6                    |
| **State Mgmt** | MobX (with `mobx-react-lite`)                   |
| **Routing**    | React Router 7 (hash-based)                     |
| **UI Library** | HeroUI (beta), Tailwind CSS v4, Framer Motion   |
| **Charts**     | Recharts                                        |
| **Validation** | Zod                                             |
| **Linting**    | ESLint 9 + Prettier                             |

## 📁 Project Structure

The project follows a **feature-sliced design** architecture:

```
src/
├── app/                    # Application core
├── constants.ts            # App constants (name, API URL, routes)
├── features/               # Feature-specific modules
├── pages/                  # Page components
├── services/               # API clients
│   └── YouHodlerApiClient.ts  # API wrapper with Zod validation
├── shared/                 # Shared utilities & assets
│   ├── assets/             # Static JSON (tickers, icons, names, types)
│   ├── ui/                 # Reusable UI components (icons, logo)
│   └── utils/              # Helper functions (rate calculations, formatting)
├── types/                  # TypeScript types & Zod schemas
├── widgets/                # Layout widgets
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20+)
- [npm](https://www.npmjs.com/) 9+ (or yarn/pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/thirdmadman/yh2k25-fetch-my-coin.git
cd fetch-my-coin

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Available Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm run dev`    | Start Vite dev server with HMR           |
| `npm run build`  | Type-check (`tsc -b`) + build for prod   |
| `npm run preview`| Preview the production build locally     |
| `npm run lint`   | Run ESLint across the project            |

## 🌐 Deployment

The application is configured for **GitHub Pages** deployment:

1. The Vite config uses `base: './'` (relative paths) for static hosting
2. React Router uses `createHashRouter` (hash-based routing) to avoid 404 errors on static hosts
3. A GitHub Actions workflow (`github/workflows/main.yaml`) automates build and deploy on push to `master`

### Manual Deployment

```bash
npm run build
# Deploy the contents of the `dist/` folder to your hosting provider
```

## 📡 API Client

The app communicates with the [YouHodler API](https://app.youhodler.com/api/v3/rates/extended):

| Endpoint                                      | Method | Description                          |
|-----------------------------------------------|--------|--------------------------------------|
| `/api/v3/rates/extended`                      | GET    | Fetch all cryptocurrency rates       |
| `/api/v3/hodl/grpc/getMarketStatsBySymbol`    | GET    | Get market stats for a coin pair     |
| `/api/v3/rates/chart`                         | GET    | Get historical price chart data      |

The `YouHodlerApiClient` class handles:

- Request construction and fetching
- JSON parsing
- Zod schema validation
- Error handling with structured return types (`{ isError, error, errorDescription, data }`)

All API responses are validated against Zod schemas before use.

## 🏗️ Architecture

### State Management

The app uses **MobX** for reactive state management:

- **`RootStore`**: Central store that composes child stores
- **`CoinsRatesStore`**: Manages fetched rates and the selected base currency
- **`CoinsListStore`**: Manages table state (filter, sort, visible columns)

Stores are provided via React Context (`StoreProvider`) and consumed with the `useRootStore()` hook.

### Routing

- **Hash-based routing** via `createHashRouter` for GitHub Pages compatibility
- **Typed routes** with extended route objects containing `name` for breadcrumb generation
- **Dynamic breadcrumbs** computed from the current URL path

### Data Flow

```
User Action
    ↓
Component (e.g., MainPage)
    ↓
useRootStore() → MobX Store (action)
    ↓
YouHodlerApiClient (fetch + Zod validation)
    ↓
Store updates (observable)
    ↓
Components re-render (observer)
```

## 📄 License

This project is licensed under the **GPL-3.0-or-later** License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

Created by **[thirdmadman](https://thirdmadman.com)**
