# Component Spec: RecipeModal

## Role

The `RecipeModal` component displays the full details of a selected recipe in a modal overlay. It includes the recipe's image, a list of ingredients, preparation instructions, pro tips, and tags. The modal can be closed by the user.

## Role in Component Tree

`RecipeModal` is a child of the `MainLayoutContainer` component and is conditionally rendered.

```
*   `MainLayoutContainer (Smart Component)`
    *   `RecipeModal (conditionally rendered)`
        *   `TagList (shared)`
```

## Inputs (Props)

| Prop Name | Type       | Description                                                   | Required |
| --------- | ---------- | ------------------------------------------------------------- | -------- |
| `recipe`  | `RecipeVM` | The recipe object to display. If `null`, the modal is hidden. | Yes      |

## Outputs (Events)

| Event Name    | Payload Type | Description                             |
| ------------- | ------------ | --------------------------------------- |
| `modalClosed` | `void`       | Emitted when the user closes the modal. |

## States

### 1. Hidden

- **Description:** This is the default state of the modal. It is not visible on the screen.
- **Visuals:** The component is not rendered, or is hidden via CSS.

### 2. Visible

- **Description:** The modal is displayed as an overlay on top of the main content.
- **Visuals:** A full-screen overlay with a centered container that displays the recipe details. A close button is visible.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
