# IngredientVM Data Structure

The `IngredientVM` object is a type alias for `IngredientDTO` and contains the name and emoji for a single ingredient that is loaded from the `ingredients.json` file in the application's assets directory.

| Property | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| `name`   | `string` | The display name of the ingredient (e.g., "Banana"). |
| `emoji`  | `string` | The emoji representing the ingredient (e.g., "🍌").  |

## TypeScript Type

```typescript
export type IngredientVM = IngredientDTO;
```
