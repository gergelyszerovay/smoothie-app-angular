# RecipeDTO Data Structure

The `RecipeDTO` object contains all the information needed to display a single smoothie recipe, including its name, description, ingredients, and pro tips. This data structure is loaded from the `recipes.json` file in the application's assets directory as part of the project foundation setup (Story 1.1).

| Property      | Type                    | Description                                                         |
| ------------- | ----------------------- | ------------------------------------------------------------------- |
| `id`          | `string`                | A unique identifier for the recipe (e.g., "berry-banana-smoothie"). |
| `name`        | `string`                | The display name of the smoothie.                                   |
| `description` | `string`                | A brief summary of the smoothie's flavor and benefits.              |
| `ingredients` | `RecipeIngredientDTO[]` | An array of ingredient objects.                                     |
| `proTips`     | `string[]`              | An array of helpful tips for preparing the smoothie.                |
| `tags`        | `string[]`              | An array of tags for categorizing the recipe.                       |

## RecipeIngredientDTO Data Structure

| Property | Type     | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| `name`   | `string` | The name of the ingredient (e.g., "banana").    |
| `amount` | `string` | The quantity of the ingredient (e.g., "1").     |
| `unit`   | `string` | The unit of measurement (e.g., "large", "cup"). |

## TypeScript Types

```typescript
export type RecipeIngredientDTO = {
  readonly name: string;
  readonly amount: string;
  readonly unit: string;
};

export type RecipeDTO = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredients: readonly RecipeIngredientDTO[];
  readonly proTips: readonly string[];
  readonly tags: readonly string[];
};
```
