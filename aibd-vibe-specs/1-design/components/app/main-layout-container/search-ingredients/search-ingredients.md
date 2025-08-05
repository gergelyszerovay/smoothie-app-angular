# Component Spec: SearchIngredients

## Role

The `SearchIngredients` component provides the main search interface for the application. It allows users to select ingredients and see the list of matching recipes update in real-time. It includes an input field with autocomplete suggestions and displays the currently selected ingredients as a list of chips.

## Role in Component Tree

`SearchIngredients` is a child of the `MainLayoutContainer` component.

```
*   `MainLayoutContainer (Smart Component)`
    *   `SearchIngredients`
        *   `IngredientChip (xN) (shared)`
        *   `AutocompleteDropdown`
```

## Inputs (Props)

| Prop Name              | Type             | Description                                                           | Required |
| ---------------------- | ---------------- | --------------------------------------------------------------------- | -------- |
| `availableIngredients` | `IngredientVM[]` | The full list of ingredients to be used for autocomplete suggestions. | Yes      |
| `selectedIngredients`  | `IngredientVM[]` | The list of ingredients that the user has currently selected.         | Yes      |

## Outputs (Events)

| Event Name           | Payload Type     | Description                                            |
| -------------------- | ---------------- | ------------------------------------------------------ |
| `ingredientsChanged` | `IngredientVM[]` | Emitted when the list of selected ingredients changes. |

## States

### 1. Default (With Selections)

- **Description:** The standard appearance of the search bar when one or more ingredients have been selected.
- **Visuals:**
  - Selected ingredients are displayed as `IngredientChip` components inside the search container.
  - An "X" icon is visible on the right to clear all selected ingredients.
  - The text input field is available for adding more ingredients.

### 2. Empty

- **Description:** The state when no ingredients are selected.
- **Visuals:**
  - A placeholder text prompts the user to enter ingredients (e.g., "Banana, spinach, mango...").
  - The "clear all" button is hidden.

### 3. Focused with Autocomplete

- **Description:** The state when the user clicks into the text input and begins typing.
- **Visuals:**
  - The `AutocompleteDropdown` component is rendered and displays a list of suggested ingredients with proper z-index layering.
  - The search input has a subtle glow effect to indicate focus.
  - Suggestions are filtered based on the user's input.
  - Event handling prevents the dropdown from closing when clicking inside it.
  - The dropdown appears above recipe cards and other elements.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
- **Notes:** The `AutocompleteDropdown` is not visually represented in the static prototype, but its behavior is part of the "Focused with Autocomplete" state of this component.
