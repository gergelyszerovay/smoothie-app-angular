# Component Spec: TagList

## Role

The `TagList` component is a container for displaying a collection of `Tag` components. It arranges the tags in a horizontal list with appropriate spacing. It is used on recipe cards and in the recipe modal to show all the categories a recipe belongs to.

## Role in Component Tree

`TagList` is a container component that renders multiple `Tag` components.

```
*   `TagList (shared)`
    *   `Tag (xN) (shared)`
```

## Inputs (Props)

| Prop Name | Type      | Description                                                                        | Required |
| --------- | --------- | ---------------------------------------------------------------------------------- | -------- |
| `tags`    | `TagVM[]` | An array of tag objects to display. See `docs/1-design/data-structures/tag-vm.md`. | Yes      |

## Outputs (Events)

None. This is a display-only component.

## States

### 1. Default

- **Description:** Renders a horizontal list of `Tag` components.
- **Visuals:** Tags are displayed with a set amount of space between them. The list will wrap to a new line if the container is not wide enough to hold all of them.

### Visual Reference

- **Prototype:** `docs/1-design/html-prototypes/cards1.html`
