# Component Spec: RecipeGrid

## Role

The `RecipeGrid` component is responsible for displaying a collection of `RecipeCard` components in a responsive grid layout. It takes a list of recipes and renders them, handling the arrangement and spacing of the cards.

## Role in Component Tree

`RecipeGrid` is a child of the `MainLayoutContainer` component.

```
*   `MainLayoutContainer (Smart Component)`
    *   `RecipeGrid`
        *   `RecipeCard (xN)`
```

## Inputs (Props)

| Prop Name | Type         | Description                            | Required |
| --------- | ------------ | -------------------------------------- | -------- |
| `recipes` | `RecipeVM[]` | An array of recipe objects to display. | Yes      |

## Outputs (Events)

| Event Name       | Payload Type | Description                                                  |
| ---------------- | ------------ | ------------------------------------------------------------ |
| `recipeSelected` | `string`     | Emitted when a recipe card is clicked. Passes the recipe ID. |

## States

### 1. Default

- **Description:** Displays the grid of recipe cards. The number of columns adjusts based on the screen size. Shows recipes that contain ALL selected ingredients.
- **Visuals:** A responsive grid containing one or more `RecipeCard` components.

### 2. Filtered

- **Description:** Displays filtered recipe cards based on selected ingredients. Only shows recipes containing ALL selected ingredients.
- **Visuals:** A responsive grid containing filtered `RecipeCard` components that match the ingredient criteria.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
