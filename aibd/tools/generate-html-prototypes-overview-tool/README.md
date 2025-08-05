# HTML Prototype Overview Generator

This tool automates the generation of a high-level overview of the component structure found in the static HTML prototypes.

## Purpose

- Scans all `.html` files in `/workspace/aibd-vibe-specs/1-design/html-prototypes/` for elements marked with `data-component` attributes.
- Builds a hierarchical tree representing the nesting and repetition of components in each prototype.
- Outputs a markdown summary to `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md`.

## Why?

Manually maintaining an overview of component usage in static prototypes is tedious and error-prone. This tool ensures the documentation is always in sync with the actual prototypes.

## How It Works

1. **Scanning:**
   - Recursively scans all `.html` files in `/workspace/aibd-vibe-specs/1-design/html-prototypes/` (including subdirectories).
2. **Parsing:**
   - For each file, parses the DOM and finds all elements with a `data-component` attribute.
   - Builds a tree representing the parent-child relationships of components, including repeated components (using `(xN)` notation).
3. **Output:**
   - Generates a markdown file at `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md`.
   - Each section corresponds to a prototype file and contains a code block with the component tree.

## Example Output

```
## 1.  cards1.html

### Component Tree

```

- MainLayout
  - UiHeroSection
  - UiSearchIngredients
    - UiIngredientChip (x3)
  - UiRecipeGrid
    - UiRecipeCard (x6)
      - UiTagList
        - UiTag (x3)
  - UiRecipeModal
    - UiTagList

```

```

## Usage

1. **Install dependencies:**
   - Ensure you have run `pnpm install` in the project root.
2. **Run the generator:**
   - Use the provided script:
     ```sh
     pnpm run docs:gen-overview
     ```
   - This will update `/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md` with the latest component structure.

## Technical Details

- **Language:** TypeScript
- **Execution:** Uses [`tsx`](https://github.com/esbuild/tsx) for direct TypeScript execution.
- **DOM Parsing:** Uses [`jsdom`](https://github.com/jsdom/jsdom) to parse HTML files.
- **Location:** Script is at `/workspace/aibd/tools/generate-html-prototypes-overview-tool/generate-overview.ts`.

## Contributing

- If you update the structure of the HTML prototypes, re-run the generator to keep the overview up to date.
- For improvements or bug fixes, edit the TypeScript script and update this README as needed.
