# Task: Create HTML Prototype Overview Generator

## Functional Requirements

### 1. Goal

To automate the generation of the `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md` file by creating a script that analyzes the static HTML prototypes.

### 2. Inputs

1.  **Language:** The tool **MUST** be written in TypeScript and executed using `tsx`.
2.  **Input:** The script **MUST** scan all `.html` files within the `/workspace/aibd-vibe-specs/1-design/html-prototypes/` directory and all its subdirectories.
3.  **Processing:**
    - For each HTML file, the script **MUST** parse the DOM to find all elements with a `data-component` attribute.
    - It **MUST** build a hierarchical tree representing the nesting of these components.
    - It **SHOULD** intelligently handle multiple instances of the same component under a parent by using the `(xN)` notation.

### 4. Outputs

- The script **MUST** generate a markdown file at `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md`.
- The output **MUST** group the component trees by the HTML file they were found in.
- The output **MUST** use the `(xN)` notation to indicate multiple occurrences of the same component at the same level.

## Technical Details

- **Package Manager:** The project uses `pnpm`.
- **Execution:** The TypeScript script **SHOULD** be executed directly using `tsx`.
- **Dependencies:** The script **MUST** use the `jsdom` library for DOM parsing. It **MUST** be added to `devDependencies` using `pnpm`.

## Acceptance Criteria

### 2. Verification

- The script runs without errors.
- The generated `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md` file is accurate.

---
