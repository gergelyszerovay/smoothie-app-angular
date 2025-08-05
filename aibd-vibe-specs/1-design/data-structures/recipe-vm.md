# RecipeVM Data Structure

The `RecipeVM` object contains all the information needed to display a single smoothie recipe in the UI, including enriched data with ingredient emojis and tag colors. This ViewModel is created by combining data from `recipes.json`, `ingredients.json`, and `tags.json` files.

| Property      | Type                   | Description                                                         |
| ------------- | ---------------------- | ------------------------------------------------------------------- |
| `id`          | `string`               | A unique identifier for the recipe (e.g., "berry-banana-smoothie"). |
| `name`        | `string`               | The display name of the smoothie.                                   |
| `description` | `string`               | A brief summary of the smoothie's flavor and benefits.              |
| `ingredients` | `RecipeIngredientVM[]` | An array of ingredient objects with emoji data.                     |
| `proTips`     | `string[]`             | An array of helpful tips for preparing the smoothie.                |
| `tags`        | `TagVM[]`              | An array of tag objects with color information.                     |

## RecipeIngredientVM Data Structure

| Property     | Type           | Description                                     |
| ------------ | -------------- | ----------------------------------------------- |
| `ingredient` | `IngredientVM` | The ingredient data with name and emoji.        |
| `amount`     | `string`       | The quantity of the ingredient (e.g., "1").     |
| `unit`       | `string`       | The unit of measurement (e.g., "large", "cup"). |

## TypeScript Types

```typescript
export type RecipeIngredientVM = {
  readonly ingredient: IngredientVM;
  readonly amount: string;
  readonly unit: string;
};

export type RecipeVM = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredients: readonly RecipeIngredientVM[];
  readonly proTips: readonly string[];
  readonly tags: readonly TagVM[];
};
```
