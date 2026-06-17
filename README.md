# ReactFlow Canvas Demo

A responsive App Graph Builder built for the Frontend Intern Task brief.

## Setup

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## Key Decisions

- ReactFlow owns graph rendering and interactions: dragging, selection, deletion, zoom, pan, and fit view.
- TanStack Query handles the mock `/apps` and `/apps/:appId/graph` data flow with simulated latency and cached graph responses.
- Zustand stores only UI/app state: selected app, selected node, mobile panel open state, active inspector tab, and the mock error toggle.
- The right panel becomes a Radix Dialog powered mobile drawer on smaller screens.
- shadcn/ui-style primitives are local components backed by Radix where needed, so the app can stay small and explicit.

## Known Limitations

- Mock APIs are in-memory promise functions rather than a real backend.
- The plus button in the app list is visual only because add-node behavior is listed as a bonus item, not a core requirement.
- No deployment is included.
