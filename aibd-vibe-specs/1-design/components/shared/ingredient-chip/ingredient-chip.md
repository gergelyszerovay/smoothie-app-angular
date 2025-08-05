# Component Spec: IngredientChip

## Role

The `IngredientChip` component is a small, interactive element that represents a single ingredient. It is used in two main contexts:

1.  **In the search bar:** To display the ingredients that the user has currently selected for their recipe search. In this context, it includes a "remove" button.
2.  **In the empty/error state:** To suggest popular ingredients that the user might want to try searching for. In this context, it acts as a button to select an ingredient for the search.

## Inputs (Props)

| Prop Name     | Type           | Description                                                                             | Required |
| ------------- | -------------- | --------------------------------------------------------------------------------------- | -------- |
| `ingredient`  | `IngredientVM` | The ingredient object to display. See `docs/1-design/data-structures/ingredient-vm.md`. | Yes      |
| `isRemovable` | `boolean`      | A boolean that determines whether to display the "remove" button. Defaults to `false`.  | No       |

## Outputs (Events)

| Event Name           | Payload Type | Description                                                                                                   |
| -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `ingredientRemoved`  | `string`     | Emitted when the "remove" button is clicked. Passes the `ingredient.name` string as a payload.                |
| `ingredientSelected` | `string`     | Emitted when the chip is clicked in the suggestion context. Passes the `ingredient.name` string as a payload. |

## States

### 1. Default (Removable)

- **Description:** The standard appearance of the chip when it represents a selected ingredient in the search bar. It includes a button to remove the ingredient from the search query.
- **Visuals:** Displays the ingredient name and a prominent "X" icon.

### 2. Suggestion

- **Description:** The appearance of the chip when presented as a clickable suggestion, for example, in the empty state.
- **Visuals:** Displays the ingredient name, and the entire chip is clickable. No "X" icon is present.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
- **Notes:** See the "Removable" state in this prototype.
- **Prototype:** `docs/1-design/html-prototypes/empty1.html`
- **Notes:** See the "Suggestion" state in this prototype.
