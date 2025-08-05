export type RecipeIngredientDTO = Readonly<{
  name: string;
  amount: string;
  unit: string;
}>;

export type RecipeDTO = Readonly<{
  id: string;
  name: string;
  description: string;
  ingredients: readonly RecipeIngredientDTO[];
  proTips: readonly string[];
  tags: readonly string[];
}>;