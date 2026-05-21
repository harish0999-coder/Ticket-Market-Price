# Reelax — Ticket Marketplace Dashboard

A pixel-perfect, fully responsive React JS implementation of the Reelax ticket resale platform UI, built as part of the frontend assignment.

## 🚀 Live Demo
> Deploy to Vercel/Netlify after cloning — see instructions below.

## 🛠️ Tech Stack
- **React 18** — Component-based UI framework
- **Vite** — Lightning-fast build tool & dev server
- **Tailwind CSS v3** — Utility-first styling with custom design tokens
- **Lucide React** — Clean, consistent icon library
- **DM Sans + Syne + JetBrains Mono** — Typography from Google Fonts

## 📁 Project Structure
```
reelax-assignment/
├── src/
│   ├── components/
│   │   ├── common/         # Badge, Button, Modal, SearchBar, StatsCard, TabSwitcher
│   │   ├── layout/         # Sidebar, Header, LayoutWrapper
│   │   └── dashboard/      # AnalyticsCard, DataTable, TicketCard
│   ├── hooks/              # useWindowSize
│   ├── pages/              # DashboardPage, TicketsPage, AnalyticsPage, CommunityPage, SettingsPage
│   ├── utils/              # mockData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── README.md
```

## ⚙️ Running Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone <your-repository-url>
cd reelax-assignment

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open : https://ticket-market-price.vercel.app/

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features
- Responsive layout (mobile / tablet / desktop) with hamburger sidebar
- Dashboard with KPI cards, bar chart, upcoming events, recent tickets
- Tickets grid with search + status + category filters
- Analytics page with revenue visualization and category breakdown
- Community page with leaderboard and discussions
- Settings page: profile editor, notification toggles, security, billing, appearance
- Ticket detail modal on card click
- Sortable transactions data table
- Component-based architecture — atomic, DRY, reusable

## 🚢 Deploy to Vercel
Connect your GitHub repo at vercel.com or run:
```bash
npm install -g vercel && vercel --prod
```
