# Main Layout Store Design

This document defines the store design for the main-layout component, implementing the AIBD Simple Store pattern.

## Store Overview

The main-layout component store manages the component state including:

- Recipe data and filtering (using RecipeDTO → RecipeVM conversion)
- Ingredient and tag data (using IngredientDTO → IngredientVM and TagDTO → TagVM conversion)
- Search state and selected ingredients
- Loading and error states
- Application lifecycle management

## Blueprint Compliance

This store follows the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` pattern.

**For comprehensive validation checklists and enforcement rules, see:** `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.checklist.md`

## Type Definitions

### DTO Types (Raw Data)

```typescript
// Recipe DTO - matches recipes.json structure
export type RecipeDTO = Readonly<{
  id: string;
  name: string;
  description: string;
  ingredients: readonly RecipeIngredientDTO[];
  proTips: readonly string[];
  tags: readonly string[];
}>;

export type RecipeIngredientDTO = Readonly<{
  name: string;
  amount: string;
  unit: string;
}>;

// Ingredient DTO - matches ingredients.json structure
export type IngredientDTO = Readonly<{
  name: string;
  emoji: string;
}>;

// Tag DTO - matches tags.json structure
export type TagDTO = Readonly<{
  name: string;
  color: string;
}>;
```

### VM Types (UI-Ready Data)

```typescript
// Ingredient VM - simple type alias
export type IngredientVM = IngredientDTO;

// Tag VM - simple type alias
export type TagVM = TagDTO;

// Recipe VM - enriched with ingredient emojis and tag colors
export type RecipeIngredientVM = Readonly<{
  ingredient: IngredientVM;
  amount: string;
  unit: string;
}>;

export type RecipeVM = Readonly<{
  id: string;
  name: string;
  description: string;
  ingredients: readonly RecipeIngredientVM[];
  proTips: readonly string[];
  tags: readonly TagVM[];
}>;
```

### Store State

```typescript
export type MainLayoutState = Readonly<{
  // Data collections (VM types for UI)
  recipes: readonly RecipeVM[];
  ingredients: readonly IngredientVM[];
  tags: readonly TagVM[];

  // Search state
  selectedIngredients: readonly IngredientVM[];

  // Modal state
  selectedRecipe: RecipeVM | null;

  // Application lifecycle
  isLoading: boolean;
  error: string | null;
}>;

const initialMainLayoutState: MainLayoutState = {
  recipes: [],
  ingredients: [],
  tags: [],
  selectedIngredients: [],
  selectedRecipe: null,
  isLoading: false,
  error: null,
} as const;
```

## Store Structure

````typescript
/**
 * Main Layout Store Design
 *
 * Type alias defining the complete interface for the main layout store.
 * This type describes all selectors, computed selectors, effects, and actions
 * that the MainLayoutStore class must implement.
 *
 * The main-layout component store manages the component state for the smoothie recipe application,
 * following the AIBD Simple Store pattern.
 *
 * @example
 * ```typescript
 * // Store class implements this design
 * @Injectable({ providedIn: 'root' })
 * export class MainLayoutStore implements MainLayoutStoreDesign {
 *   // Implementation of all selectors, effects, and actions
 * }
 *
 * // Usage in components
 * protected store = inject(MainLayoutStore);
 * const recipes = this.store.recipes();
 * this.store.initialize();
 * ```
 */
export type MainLayoutStoreDesign = Readonly<{
  // State Selectors - Direct access to state slices
  readonly recipes: Signal<readonly RecipeVM[]>;
  readonly ingredients: Signal<readonly IngredientVM[]>;
  readonly tags: Signal<readonly TagVM[]>;
  readonly selectedIngredients: Signal<readonly IngredientVM[]>;
  readonly selectedRecipe: Signal<RecipeVM | null>;
  readonly isLoading: Signal<boolean>;
  readonly error: Signal<string | null>;

  // Computed Selectors - Derived state with memoization
  readonly filteredRecipes: Signal<readonly RecipeVM[]>;
  readonly suggestedIngredients: Signal<readonly IngredientVM[]>;

  // Effects (rxMethod) - Reactive operations
  readonly loadData: rxMethod<void>; // Loads all application data (recipes, ingredients, tags)

  // Actions - Synchronous state updates
  addIngredient(ingredient: IngredientVM): void;
  removeIngredient(ingredientName: string): void;
  clearAllIngredients(): void;
  setSelectedRecipe(recipe: RecipeVM | null): void;
  clearSelectedRecipe(): void;
}>;

/**
 * Main Layout Store Implementation
 *
 * Concrete implementation of the MainLayoutStoreDesign type alias.
 * This main-layout component store manages the component state for the smoothie recipe application,
 * following the AIBD Simple Store pattern.
 *
 * @example
 * ```typescript
 * // Inject the store in a component
 * protected store = inject(MainLayoutStore);
 *
 * // Access state
 * const recipes = this.store.recipes();
 * const loading = this.store.loading();
 *
 * // Trigger effects
 * this.store.loadData();
 *
 * // Update state
 * this.store.setSelectedRecipe(recipe);
 * this.store.addIngredient(ingredient);
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MainLayoutStore implements MainLayoutStoreDesign {
  private state = signalState(initialMainLayoutState);

  // Implementation of all selectors, computed selectors, effects, and actions
}
````

## Data Conversion Strategy

### DTO to VM Conversion

1. **IngredientDTO → IngredientVM**: Direct type alias (no conversion needed)
2. **TagDTO → TagVM**: Direct type alias (no conversion needed)
3. **RecipeDTO → RecipeVM**: Complex conversion that enriches data:
   - Maps recipe ingredients to ingredient VMs (adds emoji)
   - Maps recipe tag names to tag VMs (adds color)
   - Maintains recipe-specific ingredient amounts and units

### Conversion Benefits

- **Type Safety**: Strong typing throughout the conversion process
- **Data Enrichment**: Recipe VMs contain complete ingredient and tag information
- **UI Ready**: VMs are optimized for display with emojis and colors
- **Performance**: Computed selectors provide efficient derived state

## Implementation Validation

**For comprehensive validation checklists and enforcement rules, see:** `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.checklist.md`

### Main-Layout Specific Validation

- [ ] Recipe data fetching from `/assets/recipes.json` works correctly
- [ ] Ingredient data fetching from `/assets/ingredients.json` works correctly
- [ ] Tag data fetching from `/assets/tags.json` works correctly
- [ ] Recipe filtering logic functions properly (shows recipes containing ALL selected ingredients)
- [ ] DTO to VM conversion enriches data correctly
- [ ] Error handling provides user-friendly messages
- [ ] Loading states provide appropriate visual feedback
