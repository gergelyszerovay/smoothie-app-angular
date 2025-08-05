### Shared (Reusable Components)

- `IngredientChip (shared)`
- `Tag (shared)`
- `TagList (shared)`
  - `Tag (xN) (shared)`
- `AutocompleteDropdown (shared)`

### App (Application Structure)

- `MainLayout (Smart Component)`
  - `HeroSection`
  - `SearchIngredients`
    - `IngredientChip (xN) (shared)`
    - `AutocompleteDropdown (shared)`
  - `(Conditional)`
    - `RecipeGrid`
      - `RecipeCard (xN)`
        - `TagList (shared)`
    - `EmptyState`
      - `IngredientChip (xN) (shared)`
  - `RecipeModal (conditionally rendered)`
    - `TagList (shared)`
