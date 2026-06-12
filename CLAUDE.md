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

Single-component React app (no router, no external state library). All logic lives in `src/App.jsx`:

- **State**: `transactions` array held in `useState` — no persistence (data resets on page reload). Each transaction has `{ id, description, amount, type, category, date }`. `amount` is stored as a string from the input and used directly in arithmetic — coercion happens at reduce time.
- **Derived values**: `totalIncome`, `totalExpenses`, and `balance` are computed inline on every render by filtering and reducing `transactions`.
- **Filtering**: `filterType` and `filterCategory` state drives `filteredTransactions`, which is what the table renders.
- **Add form**: `handleSubmit` appends a new transaction object and resets form fields.
- **Styling**: flat CSS in `src/App.css` and `src/index.css` — no CSS framework or CSS modules. Class names like `.income-amount` / `.expense-amount` / `.balance-amount` are shared between the summary cards and the transaction table.

## Known issues

- `amount` is stored as a string, so `reduce((sum, t) => sum + t.amount, 0)` does string concatenation for seed transactions where the value was entered as a string literal — newly added transactions inherit the same string type from the `<input type="number">`. Totals will be wrong until this is fixed by parsing amounts to numbers.
- No delete or edit capability on transactions.
- No data persistence (localStorage or backend).
