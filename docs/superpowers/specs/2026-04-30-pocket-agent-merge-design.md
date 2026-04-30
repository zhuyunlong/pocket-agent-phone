# PocketAgent Page Merge Design

## Goal

Merge the two existing page variants with these priorities:

- Use the current workspace version as the source of truth for content and behavior.
- Use the `Downloads/pocket-agent-phone-demo` version as the primary visual reference.
- Do not include the `applicationText` / copy-to-form section from the `Downloads` version.

## Scope

Files in scope:

- `index.html`
- `styles.css`
- `script.js`

## Confirmed Decisions

### Keep from current workspace version

- Current page copy and information hierarchy in the hero section
- Existing phone-card interaction hooks: `#taskCard`, `#planCard`, `#agentStatus`
- Existing button SVG, task-switch animation, agent entry animation, and plan fade animation
- Existing 5 scenario data set in `script.js`
- Existing footer section

### Take from Downloads visual direction

- Overall spacing density and simplified visual rhythm
- Simpler card and button proportions where they improve readability
- Cleaner phone shell sizing and layout balance
- Reduced visual clutter in static sections

### Explicitly exclude

- `form-copy` section
- `#applicationText`
- `#copyBtn`
- `#copyTip`
- Clipboard-copy logic in JavaScript
- Any reduction of the current scenario count or interaction richness

## Implementation Approach

### HTML

Keep the current `index.html` structure as the base. Do not switch to the `Downloads` DOM shape because that would weaken existing JavaScript bindings and increase regression risk.

Allowed HTML edits:

- Small text or spacing-oriented markup adjustments if needed for visual alignment
- No addition of the copy-to-form section
- No removal of footer or animation hook elements

### CSS

Refactor `styles.css` toward the `Downloads` visual direction while preserving current behavior.

Expected CSS outcomes:

- Hero, phone shell, cards, and logic section visually closer to the `Downloads` version
- Existing hover and animation states continue to work
- Current layout remains responsive on narrow screens
- No styling added for excluded copy-to-form UI

### JavaScript

Keep the current `script.js` logic as the base.

Allowed JavaScript edits:

- Only adjust selectors or animation timing if required by safe HTML/CSS changes
- No feature reduction
- No clipboard logic
- No scenario deletion

## Risks

1. Over-fitting the current DOM to the `Downloads` styling could accidentally break animation timing or element targeting.
2. Pulling too much from the `Downloads` CSS could reintroduce styles for elements that are intentionally excluded.
3. Visual parity should be approximate, not literal, because the chosen base DOM is the current workspace version.

## Verification

After implementation, verify:

1. The page still renders correctly from local static files.
2. Clicking `换一个手机任务` still rotates through all existing scenarios.
3. Agent/task/plan animations still trigger.
4. The page does not show any copy-to-form section.
5. Footer remains visible.

## Non-Goals

- Rebuilding the page to match the `Downloads` DOM exactly
- Adding new product content
- Changing the data model for scenarios
- Introducing build tooling or framework changes
