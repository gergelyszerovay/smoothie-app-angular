# IngredientDTO Data Structure

The `IngredientDTO` object contains the name and emoji for a single ingredient that is loaded from the `ingredients.json` file in the application's assets directory as part of the project foundation setup (Story 1.1).

| Property | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| `name`   | `string` | The display name of the ingredient (e.g., "Banana"). |
| `emoji`  | `string` | The emoji representing the ingredient (e.g., "🍌").  |

## TypeScript Type

```typescript
export type IngredientDTO = {
  readonly name: string;
  readonly emoji: string;
};
```
