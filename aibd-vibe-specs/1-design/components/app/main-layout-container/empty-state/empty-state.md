# Component Spec: EmptyState

## Role

The `EmptyState` component is displayed when a search yields no results. It informs the user that no matching recipes were found and provides suggestions for popular ingredients to try next.

## Role in Component Tree

`EmptyState` is a child of the `MainLayoutContainer` component and is conditionally rendered.

```
*   `MainLayoutContainer (Smart Component)`
    *   `EmptyState`
        *   `IngredientChip (xN) (shared)`
```

## Inputs (Props)

| Prop Name              | Type             | Description                               | Required |
| ---------------------- | ---------------- | ----------------------------------------- | -------- |
| `suggestedIngredients` | `IngredientVM[]` | A list of popular ingredients to suggest. | Yes      |

## Outputs (Events)

| Event Name            | Payload Type | Description                                            |
| --------------------- | ------------ | ------------------------------------------------------ |
| `ingredientSuggested` | `string`     | Emitted when a suggested ingredient chip is clicked.   |
| `browseAll`           | `void`       | Emitted when the "Browse All Recipes" link is clicked. |

## States

### 1. Default

- **Description:** This is the only state for this component. It displays a message indicating no results were found when the selected ingredients don't match any recipes (recipes must contain ALL selected ingredients), along with a list of suggested `IngredientChip` components and a link to browse all recipes.
- **Visuals:** A prominent heading, a sub-heading, a list of chips, and a link.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/empty1.html`
- **Illustration:** `/assets/empty_state.png`
