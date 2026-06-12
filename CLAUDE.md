# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies (required before first run)
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Architecture

React + Vite app with no router and no external state library. The `transactions` array is the single source of truth, held in `useState` in `App.jsx` and passed down as props.

### Component tree

```
App
├── Summary          — receives transactions, computes and displays totals
├── TransactionForm  — owns its own form state, calls onAdd(transaction) on submit
└── TransactionList  — owns its own filter state, renders filtered table from transactions prop
```

### Data flow

- `App.jsx` holds the `transactions` array and a `handleAdd` callback that appends new entries.
- `TransactionForm` is fully self-contained for form state; it calls `onAdd` with a complete transaction object (`{ id, description, amount, type, category, date }`). `amount` is stored as a number (`parseFloat`).
- `TransactionList` manages its own `filterType` / `filterCategory` state internally — filter state does not live in `App`.
- `Summary` derives `totalIncome`, `totalExpenses`, and `balance` from the `transactions` prop on every render.

### Styling

Flat CSS in `src/App.css` and `src/index.css` — no CSS framework or CSS modules. Class names `.income-amount`, `.expense-amount`, and `.balance-amount` are shared between the summary cards and the transaction table rows.

## Known issues

- No delete or edit capability on transactions.
- No data persistence (localStorage or backend) — state resets on page reload.
