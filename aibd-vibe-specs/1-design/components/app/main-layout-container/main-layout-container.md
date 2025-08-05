# Component Spec: MainLayoutContainer

## Role

The `MainLayoutContainer` component is the top-level container for the entire application. It defines the overall structure, including the header, main content area, and footer, ensuring a consistent layout across all pages. It is a smart component that manages the main state of the application.

## Role in Component Tree

`MainLayoutContainer` is the root component of the application's UI.

```
*   `MainLayoutContainer (Smart Component)`
    *   `HeroSection`
    *   `SearchIngredients`
    *   `(Conditional)`
        *   `RecipeGrid`
        *   `EmptyState`
    *   `RecipeModal (conditionally rendered)`
```

## Inputs (Props)

None. This component is the root of the application and does not receive props from a parent.

## Outputs (Events)

None.

## States

- **Loading:** The initial state when the application is fetching recipe data.
- **Ready:** The state when the recipe data has been loaded and the UI is interactive. Recipe filtering shows recipes containing ALL selected ingredients.
- **Error:** The state when there is an issue fetching the recipe data.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
