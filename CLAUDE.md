# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # type-check (tsc -b) then production build
npm run lint      # run oxlint
npm run preview   # preview the production build locally
```

There is no test runner configured yet.

## Project state

This is a freshly scaffolded Vite + React 19 + TypeScript project (`npm create vite -- --template react-ts`), not yet customized — `src/App.tsx` still holds the default Vite starter markup. It is the starting point for an English part-of-speech quiz game (word shown → user picks noun/verb/adjective/adverb, some words accept multiple correct answers, ends in a score summary with a restart-and-reshuffle option). No app-specific code, routing, or state management exists yet.

Tailwind CSS is the intended styling approach per project plan but is **not yet installed** — check `package.json` / `src/index.css` before assuming it's available.

## Architecture

- TypeScript project uses composite `tsconfig.json` referencing `tsconfig.app.json` (browser code, `src/`) and `tsconfig.node.json` (Vite config). Run `tsc -b` (as `npm run build` does), not plain `tsc`, so both project references are checked.
- `tsconfig.app.json` has `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax` enabled — unused vars fail the build and type-only imports must use `import type`.
- Linting is via `oxlint` (Rust-based, not ESLint) configured in `.oxlintrc.json`. It currently runs without type-aware rules; see `README.md` for how to enable `oxlint-tsgolint` type-aware linting if needed.
- No test framework, router, or state management library is installed — introduce them only as the app actually needs them.
