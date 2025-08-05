/**
 * IngredientVM represents the view model for a single ingredient.
 * Contains readonly properties to ensure immutability.
 */
export type IngredientVM = {
  readonly name: string;
  readonly emoji: string;
};