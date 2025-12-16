# Frontend Developer Take-Home Assessment

This is my implementation of the frontend assessment. The requirement was to implement 2 pages from the Figma design, but I decided to build out the entire flow instead.

**Live Demo:** https://fe-quick-test.netlify.app/  
**Repository:** https://github.com/xyzeez/frontend-role-quick-test  
**Figma Design:** https://www.figma.com/design/FRfbMHys4JINX4V9qBxgbf/Frontend-Assessment?node-id=0-1

## Setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## What I Built

I implemented the complete checkout flow from start to finish. The home page has all three tabs (Crypto to Cash, Cash to Crypto, Crypto to Fiat Loan). The crypto-to-cash flow is fully functional with the complete payment flow. The other two tabs have "coming soon" placeholders with email forms.

**Pages implemented:**

- Home page with tabbed interface (all 3 tabs, crypto-to-cash is fully functional)
- Complete payment flow: Bank Info → Contact Info → Sender Details → Success

**Features:**

- Form validation using Zod and react-hook-form
- Real-time currency conversion as you type
- Multi-step form with state passed through React Router
- Responsive design that works on mobile and desktop
- Reusable UI components using shadcn/ui

## Tech Stack

- React 19 + TypeScript
- Vite for building
- Tailwind CSS v4
- React Hook Form + Zod for forms
- React Router v7
- shadcn/ui (built on Radix UI) for accessible components

## Project Structure

```
src/
├── components/
│   ├── common/     # Shared components like Clipboarder
│   ├── layouts/    # AppLayout wrapper
│   └── ui/         # Reusable components (Button, Input, Select, etc.)
├── pages/
│   ├── index/      # Home page with tabs
│   └── pay/        # Payment flow pages
├── assets/         # Images
└── router.tsx      # Routes
```

## Assumptions & Trade-offs

**Assumptions:**

- All data is mocked (conversion rates, wallet addresses, transaction IDs)
- Only 4 crypto currencies and 4 fiat currencies with hardcoded rates
- 4 Nigerian banks in the selection (Access Bank, Zenith Bank, GTBank, UBA)
- Wallet selection is just UI - no actual wallet connection
- Form state is passed via React Router location state, not persisted

**Trade-offs:**

- Used React Router state instead of a global state manager. Seemed like overkill for this scope.
- Basic error handling - just inline form validation errors. No error boundaries or loading states for async stuff.
- Accessibility is basic - semantic HTML and some ARIA labels, but could be more comprehensive.
- No tests. Focused on getting the UI right.
- No code splitting. Everything loads upfront, which is fine for this size.

**Design decisions:**

- Used shadcn/ui for components - it's built on Radix UI primitives but gives you full control since the components live in your codebase. Easy to customize and matches the design system well.
- Used Zod for validation because it works well with TypeScript and gives clear error messages.
- Mobile-first responsive design using Tailwind's default breakpoints.
- Custom color system in Tailwind to match the design tokens.

## Running Locally

```bash
npm run dev
```

For production build:

```bash
npm run build
npm run preview
```

All form submissions just log to console - there's no backend. The currency conversion uses hardcoded rates, and navigation guards prevent jumping ahead in the payment flow without filling in previous steps.
