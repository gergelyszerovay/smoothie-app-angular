# Component Spec: RecipeCard

## Role

The `RecipeCard` component displays a summary of a single recipe, including its image, name, a brief description, and a list of tags. It is designed to be visually appealing and to provide enough information for a user to decide if they are interested in viewing the full recipe.

## Role in Component Tree

`RecipeCard` is a child of the `RecipeGrid` component.

```
*   `RecipeGrid`
    *   `RecipeCard (xN)`
        *   `TagList (shared)`
```

## Inputs (Props)

| Prop Name | Type       | Description                   | Required |
| --------- | ---------- | ----------------------------- | -------- |
| `recipe`  | `RecipeVM` | The recipe object to display. | Yes      |

## Outputs (Events)

None. User interactions are handled by the parent `RecipeGrid`.

## States

### 1. Default

- **Description:** The standard appearance of the recipe card.
- **Visuals:** Displays the recipe image, name, description, and tags.

### 2. Hover

- **Description:** The appearance of the card when a user hovers their mouse over it.
- **Visuals:** The card subtly scales up and a soft glow appears around it to indicate that it is interactive.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
