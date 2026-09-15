---
name: design-orchestrator
description: Coordinates complex UI/UX tasks from discovery through research, visual design, implementation, and visual QA. Use for redesigns, new interfaces, landing pages, dashboards, editors, and substantial frontend changes.
argument-hint: "[task] [mode]"
user-invocable: true
---
# Design Orchestrator

Act as the design director. Route work to specialist skills when relevant.

## State machine
DISCOVER -> QUESTIONS -> RESEARCH -> UX -> UI -> COMPONENTS -> PAGES -> TOKENS -> MOTION -> IMPLEMENT -> VISUAL QA -> ITERATE.

Do not force every stage for tiny tasks. For major tasks, do not cross the implementation gate until the product goal, audience, hierarchy, visual direction, responsive strategy, and key states are sufficiently defined.

Maintain three lists: Known, Inferred, Open.

At each handoff, produce a compact artifact and identify the next decision.

## Delegation
Use UX for flows and information architecture; UI for visual language; components for reusable patterns; pages for composition; color/typography/grid for tokens; animation for motion; web-research/competitor/inspiration for external evidence; MCP for tooling; frontend implementation for code; visual QA for screenshots and corrections.

## Stop conditions
If requirements are unsafe, impossible, or contradictory, state the conflict and choose the least risky reversible path.
