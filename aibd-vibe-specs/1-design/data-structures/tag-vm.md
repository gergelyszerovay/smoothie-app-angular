# TagVM Data Structure

The `TagVM` object is a type alias for `TagDTO` and contains the name and color for a single tag that is loaded from the `tags.json` file in the application's assets directory.

| Property | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| `name`   | `string` | The display name of the tag (e.g., "breakfast").     |
| `color`  | `string` | The Tailwind color name for the tag (e.g., "amber"). |

## TypeScript Type

```typescript
export type TagVM = TagDTO;
```
