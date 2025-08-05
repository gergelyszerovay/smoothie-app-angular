# Component Spec: Tag

## Role

The `Tag` component is a small, non-interactive element used to display a category or keyword associated with a recipe. It provides a quick visual cue about the nature of the smoothie (e.g., "Vegan", "Summer", "Breakfast"). It is typically used within a `TagList` component.

## Inputs (Props)

| Prop Name | Type    | Description                                                               | Required |
| --------- | ------- | ------------------------------------------------------------------------- | -------- |
| `tag`     | `TagVM` | The tag object to display. See `docs/1-design/data-structures/tag-vm.md`. | Yes      |

## Outputs (Events)

None. This is a display-only component.

## States

1.  **Default:** The standard appearance of the tag with a colored background and text.

## Example

This component is implemented in the `cards1.html` design draft. You can find examples of its usage by searching for the `data-component="Tag"` attribute in that file.

Here is an example from a recipe card:
