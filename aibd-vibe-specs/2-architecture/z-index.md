**Z-Index Hierarchy:**

The feature MUST follow the established z-index hierarchy to ensure proper layering across all components:

- Component Highlighter: 10000-10001 (CSS)
- Recipe Modal: 9999 (CSS)
- Autocomplete Dropdown: 9999 (Tailwind) - Must appear above recipe cards
- Search Container: 9998 (Tailwind) - Creates stacking context
- Recipe Grid: 10 (Tailwind) - Base content layer
