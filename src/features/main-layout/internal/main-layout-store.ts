import { signalState, patchState } from "@ngrx/signals";
import { computed, inject, Injectable } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { RxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { exhaustMap, pipe, tap, forkJoin } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Signal } from "@angular/core";

import { RecipeDTO } from "./recipe-dto";
import { IngredientDTO } from "./ingredient-dto";
import { TagDTO } from "./tag-dto";
import { RecipeVM, RecipeIngredientVM } from "@shared/vm-types/recipe-vm";
import { IngredientVM } from "@shared/vm-types/ingredient-vm";
import { TagVM } from "@shared/vm-types/tag-vm";

// VM Types (UI-Ready Data) - Direct aliases as per design
export type IngredientVMAlias = IngredientVM;
export type TagVMAlias = TagVM;

// Store State
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
 * this.store.loadData();
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
  readonly loadData: RxMethod<void>; // Loads all application data (recipes, ingredients, tags)

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
 * const loading = this.store.isLoading();
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
  private http = inject(HttpClient);

  // Signal State: Create reactive state
  private state = signalState(initialMainLayoutState);

  // State Selectors: Direct access to state slices
  readonly recipes = this.state.recipes;
  readonly ingredients = this.state.ingredients;
  readonly tags = this.state.tags;
  readonly selectedIngredients = this.state.selectedIngredients;
  readonly selectedRecipe = this.state.selectedRecipe;
  readonly isLoading = this.state.isLoading;
  readonly error = this.state.error;

  // Computed Selectors: Derived state with memoization
  readonly filteredRecipes = computed(() => {
    const recipes = this.recipes();
    const selectedIngredients = this.selectedIngredients();
    
    if (selectedIngredients.length === 0) {
      return recipes;
    }

    // Filter recipes that contain ALL selected ingredients
    return recipes.filter(recipe => {
      return selectedIngredients.every(selectedIngredient =>
        recipe.ingredients.some(recipeIngredient =>
          this.normalizeIngredientName(recipeIngredient.ingredient.name) === 
          this.normalizeIngredientName(selectedIngredient.name)
        )
      );
    });
  });

  readonly suggestedIngredients = computed(() => {
    const allIngredients = this.ingredients();
    const selectedIngredients = this.selectedIngredients();
    
    // Return ingredients not yet selected
    return allIngredients.filter(ingredient =>
      !selectedIngredients.some(selected =>
        this.normalizeIngredientName(selected.name) === 
        this.normalizeIngredientName(ingredient.name)
      )
    );
  });

  // RxMethod Effects: Complete data loading operations
  readonly loadData = rxMethod<void>(
    pipe(
      tap(() => {
        patchState(this.state, { isLoading: true, error: null });
      }),
      exhaustMap(() =>
        forkJoin({
          recipes: this.http.get<RecipeDTO[]>('/assets/recipes.json'),
          ingredients: this.http.get<IngredientDTO[]>('/assets/ingredients.json'),
          tags: this.http.get<TagDTO[]>('/assets/tags.json')
        }).pipe(
          tapResponse({
            next: ({ recipes, ingredients, tags }) => {
              // Convert DTOs to VMs
              const ingredientVMs: IngredientVM[] = ingredients.map((dto) => this.convertIngredientDTOToVM(dto));
              const tagVMs: TagVM[] = tags.map((dto) => this.convertTagDTOToVM(dto));
              const recipeVMs: RecipeVM[] = recipes.map(recipe => {
                return this.convertRecipeDTOToVM(recipe, ingredientVMs, tagVMs);
              });

              patchState(this.state, { 
                recipes: recipeVMs,
                ingredients: ingredientVMs,
                tags: tagVMs
              });
            },
            error: (error: HttpErrorResponse) => {
              this.logError(error.message);
            },
            finalize: () => {
              patchState(this.state, { isLoading: false });
            },
          })
        )
      )
    )
  );

  // Synchronous Actions: State updates
  addIngredient(ingredient: IngredientVM): void {
    const selectedIngredients = this.selectedIngredients();
    const exists = selectedIngredients.some(selected =>
      this.normalizeIngredientName(selected.name) === 
      this.normalizeIngredientName(ingredient.name)
    );
    
    if (!exists) {
      patchState(this.state, { 
        selectedIngredients: [...selectedIngredients, ingredient] 
      });
    }
  }

  removeIngredient(ingredientName: string): void {
    const selectedIngredients = this.selectedIngredients();
    patchState(this.state, { 
      selectedIngredients: selectedIngredients.filter(ingredient =>
        this.normalizeIngredientName(ingredient.name) !== 
        this.normalizeIngredientName(ingredientName)
      )
    });
  }

  clearAllIngredients(): void {
    patchState(this.state, { selectedIngredients: [] });
  }

  setSelectedRecipe(recipe: RecipeVM | null): void {
    patchState(this.state, { selectedRecipe: recipe });
  }

  clearSelectedRecipe(): void {
    patchState(this.state, { selectedRecipe: null });
  }

  // Private helper methods for data conversion
  private convertIngredientDTOToVM(dto: IngredientDTO): IngredientVM {
    return {
      name: dto.name,
      emoji: dto.emoji
    };
  }

  private convertTagDTOToVM(dto: TagDTO): TagVM {
    return {
      name: dto.name,
      color: dto.color
    };
  }

  private convertRecipeDTOToVM(
    recipe: RecipeDTO, 
    ingredientVMs: IngredientVM[], 
    tagVMs: TagVM[]
  ): RecipeVM {
    // Convert recipe ingredients with enriched data
    const recipeIngredients: RecipeIngredientVM[] = recipe.ingredients.map(ingredient => {
      const ingredientVM = ingredientVMs.find(vm =>
        this.normalizeIngredientName(vm.name) === 
        this.normalizeIngredientName(ingredient.name)
      ) ?? {
        name: ingredient.name,
        emoji: '🥄' // Default emoji for unknown ingredients
      };

      return {
        ingredient: ingredientVM,
        amount: ingredient.amount,
        unit: ingredient.unit
      };
    });

    // Convert recipe tags with enriched data
    const recipeTags: TagVM[] = recipe.tags.map(tagName => {
      return tagVMs.find(vm =>
        this.normalizeTagName(vm.name) === 
        this.normalizeTagName(tagName)
      ) ?? {
        name: tagName,
        color: 'gray' // Default color for unknown tags
      };
    });

    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      ingredients: recipeIngredients,
      proTips: recipe.proTips,
      tags: recipeTags
    };
  }

  private normalizeIngredientName(name: string): string {
    return name.toLowerCase().trim();
  }

  private normalizeTagName(name: string): string {
    return name.toLowerCase().trim();
  }

  private logError(message: string): void {
    patchState(this.state, { error: message });
    console.error("MainLayoutStore operation failed", { message });
  }
}