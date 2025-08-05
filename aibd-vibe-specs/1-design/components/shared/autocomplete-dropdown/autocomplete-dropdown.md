# Component Spec: AutocompleteDropdown

## Role

The `AutocompleteDropdown` is a presentational component responsible for displaying a list of ingredient suggestions. It appears when the user starts typing in the `SearchIngredients` input field and allows the user to select an ingredient from the list.

## Role in Component Tree

`AutocompleteDropdown` is a child of the `SearchIngredients` component.

```
*   `SearchIngredients`
    *   `AutocompleteDropdown`
```

## Inputs (Props)

| Prop Name     | Type             | Description                                                   | Required |
| ------------- | ---------------- | ------------------------------------------------------------- | -------- |
| `suggestions` | `IngredientVM[]` | An array of ingredient objects to display as suggestions.     | Yes      |
| `isVisible`   | `boolean`        | Controls the visibility of the dropdown. Defaults to `false`. | No       |

## Outputs (Events)

| Event Name           | Payload Type   | Description                                       |
| -------------------- | -------------- | ------------------------------------------------- |
| `ingredientSelected` | `IngredientVM` | Emitted when an ingredient suggestion is clicked. |

## States

### 1. Visible

- **Description:** The dropdown is visible and displays a list of suggestions.
- **Visuals:** A list of ingredients, each with an emoji and a name, is shown in a container with a dark background and a border. The dropdown is positioned with proper z-index to appear above other elements including recipe cards.

### 2. Hidden

- **Description:** The dropdown is not visible.
- **Visuals:** The component is not rendered on the screen.

### 3. Interactive

- **Description:** The dropdown is visible and user can interact with suggestions.
- **Visuals:** Each suggestion item has hover states and click handlers. Event handling prevents the dropdown from closing when clicking inside it.
