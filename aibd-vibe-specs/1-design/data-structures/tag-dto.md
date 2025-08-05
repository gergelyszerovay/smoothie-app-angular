# TagDTO Data Structure

The `TagDTO` object contains the name and color for a single tag that is loaded from the `tags.json` file in the application's assets directory as part of the project foundation setup (Story 1.1).

| Property | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| `name`   | `string` | The display name of the tag (e.g., "breakfast").     |
| `color`  | `string` | The Tailwind color name for the tag (e.g., "amber"). |

## TypeScript Type

```typescript
export type TagDTO = {
  readonly name: string;
  readonly color: string;
};
```
