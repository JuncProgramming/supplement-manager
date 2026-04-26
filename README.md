# 💊 Supplement Manager

A web app for planning supplement routines, tracking daily intake, and reviewing long-term consistency.

The app is designed for users who want a simple daily checklist and history insights without needing an account.

## Project Gallery

<table align="center">
  <tr>
    <td align="center">
      <strong>Dashboard Overview</strong><br/>
      <img src="https://github.com/user-attachments/assets/056810e8-ccf0-4575-bac4-48704659081d" alt="Dashboard overview" width="400"/>
    </td>
    <td align="center">
      <strong>Inventory Management</strong><br/>
      <img src="https://github.com/user-attachments/assets/05fa254b-180f-48e2-b4a5-9ce5654dbfad" alt="Inventory page" width="400"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>Add/Edit Supplement</strong><br/>
      <img src="https://github.com/user-attachments/assets/fd72c183-3980-4fb3-b416-bb50d40d128b" alt="Add/Edit modal" width="400"/>
    </td>
    <td align="center">
      <strong>Intake History</strong><br/>
      <img src="https://github.com/user-attachments/assets/37351102-47bc-4b66-82a6-a45aafc4cb10" alt="History page" width="400"/>
    </td>
  </tr>
</table>

## Key Features

- Daily schedule tracking: check off supplements by time-of-day slots (morning, afternoon, evening, before/during/after workout).
- Progress analytics: today's completion percentage, remaining doses, and current routine size.
- Inventory management: create, edit, and delete supplements with unit-aware dosage and stock data.
- Stock awareness: automatic servings-left calculation with low-stock warnings.
- Historical reconstruction: daily snapshots preserve what was scheduled on each date, even if routine changes later.
- Rich history filters: filter by status (all, taken, missed) and by one or more time windows.
- Consistency metrics: completion rate and current all-taken day streak.
- Responsive UX: desktop navigation plus mobile menu, loading states, and confirmation modals.

## App Structure

### Routes

- `/` Dashboard: daily schedule and progress cards.
- `/inventory` Inventory: supplement CRUD and stock overview.
- `/history` History: grouped intake logs, filtering, and adherence stats.

### Data Layer (IndexedDB via Dexie)

- `supplements`: core supplement definitions (name, brand, stock, unit, dosage, schedule).
- `intakeLogs`: actual checkbox actions by date/time.
- `dailySnapshots`: immutable daily schedule snapshots used to build complete history, including missed items.

This approach keeps the app fully local and fast while still supporting robust historical analytics.

## Tech Stack

- Language: TypeScript
- Frontend: React
- Routing: React Router
- Styling: Tailwind
- Local storage DB: Dexie + IndexedDB
- Date utilities: date-fns
- Icons: lucide-react
- Testing: Vitest + Testing Library + jsdom
- Build tool: Vite

## Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/JuncProgramming/supplement-manager.git
```

2. Enter the project folder:

```bash
cd supplement-manager
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

5. Open the app in your browser:

- `http://localhost:5173` (or the port printed by Vite)

## Available Scripts

- `npm run dev` Starts Vite dev server.
- `npm run build` Type-checks and builds production assets.
- `npm run preview` Serves the production build locally.
- `npm run test` Runs the Vitest suite.
- `npm run lint` Runs ESLint with autofix and Prettier formatting.

## Testing

Run tests:

```bash
npm run test
```

Current suite focuses on component behavior and UX-critical interactions, including:

- Modal behavior and async button states
- Mobile menu toggling and navigation
- Daily schedule checkbox mapping and toggling
- Intake history cards and progress visualization
- Inventory cards, stock thresholds, and action callbacks
- Form validation and API-call wiring for create/edit flows

## Validation and UX Rules Implemented

- Current stock must be 0 or greater.
- Dosage per serving must be greater than 0.
- At least one time-of-day slot must be selected.
- Form submission provides loading states and clear error messages.
- Destructive actions are confirmed through a dedicated confirmation modal.

## What I Learned / Project Challenges

* Used a snapshot system to maintain an accurate history of supplement intake. By recording both individual intake logs and daily state snapshots, I ensured that historical records remain consistent, even as schedules or dosages change over time. Before snapshots were implemented, the current routine could modify the history.
* **Local Persistence with Dexie.js**: Implemented **IndexedDB** managed through **Dexie.js**. This allowed for a more scalable alternative to LocalStorage.
