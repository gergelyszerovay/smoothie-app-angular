import { IngredientVM } from './ingredient-vm';
import { TagVM } from './tag-vm';

/**
 * RecipeIngredientVM represents a single ingredient within a recipe.
 * Contains readonly properties to ensure immutability.
 */
export type RecipeIngredientVM = {
  readonly ingredient: IngredientVM;
  readonly amount: string;
  readonly unit: string;
};

/**
 * RecipeVM represents the view model for a complete smoothie recipe.
 * Contains readonly properties to ensure immutability.
 */
export type RecipeVM = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredients: readonly RecipeIngredientVM[];
  readonly proTips: readonly string[];
  readonly tags: readonly TagVM[];
};