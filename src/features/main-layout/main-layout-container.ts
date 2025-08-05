import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutStore } from './internal/main-layout-store';
import { HeroSection } from './internal/hero-section';
import { SearchIngredients } from '@features/recipe-search/search-ingredients';
import { RecipeGrid } from '@features/recipe-search/recipe-grid';
import { EmptyState } from '@features/recipe-search/empty-state';
import { RecipeModal } from '@features/recipe-display/recipe-modal';
import { IngredientVM } from '@shared/vm-types/ingredient-vm';

/**
 * MainLayoutContainer Component
 * 
 * The top-level container for the entire application. It defines the overall structure,
 * including the header, main content area, and footer, ensuring a consistent layout
 * across all pages. It is a smart component that manages the main state of the application.
 */
@Component({
  selector: 'app-main-layout-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeroSection, SearchIngredients, RecipeGrid, EmptyState, RecipeModal],
  template: `
    <div class="bg-gray-900 min-h-screen text-white">
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Loading State -->
        @if (store.isLoading()) {
          <div class="flex items-center justify-center min-h-[50vh]">
            <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
              <p class="text-gray-300">Loading recipes...</p>
            </div>
          </div>
        }
        
        <!-- Error State -->
        @else if (store.error()) {
          <div class="flex items-center justify-center min-h-[50vh]">
            <div class="text-center">
              <div class="text-red-400 text-6xl mb-4">⚠️</div>
              <h2 class="text-2xl font-semibold text-white mb-2">Something went wrong</h2>
              <p class="text-gray-300 mb-4">{{ store.error() }}</p>
              <button 
                (click)="handleRetry()"
                class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        }
        
        <!-- Ready State -->
        @else {
          <!-- Hero Section -->
          <app-hero-section />
          
          <!-- Search Ingredients -->
          <app-search-ingredients
            [availableIngredients]="store.ingredients()"
            [selectedIngredients]="store.selectedIngredients()"
            (ingredientsChanged)="handleIngredientsChanged($event)"
          />
          
          <!-- Recipe Results -->
          @if (store.filteredRecipes().length > 0) {
            <app-recipe-grid
              [recipes]="store.filteredRecipes()"
              (recipeSelected)="handleRecipeSelected($event)"
            />
          } @else {
            <app-empty-state
              [suggestedIngredients]="store.suggestedIngredients().slice(0, 6)"
              (ingredientSuggested)="handleIngredientSuggested($event)"
              (browseAll)="handleBrowseAll()"
            />
          }
        }
        
      </div>

      <!-- Recipe Modal -->
      <app-recipe-modal
        [recipe]="store.selectedRecipe()"
        (modalClosed)="handleModalClosed()"
      />
    </div>
  `,
  styles: [`
    .fade-in { 
      animation: fadeIn 0.8s ease-out forwards; 
      opacity: 0; 
    }
    .slide-up { 
      animation: slideUp 0.8s ease-out forwards; 
      opacity: 0; 
      transform: translateY(20px); 
    }
    @keyframes fadeIn { 
      to { opacity: 1; } 
    }
    @keyframes slideUp { 
      to { opacity: 1; transform: translateY(0); } 
    }
  `]
})
export class MainLayoutContainer implements OnInit {
  protected store = inject(MainLayoutStore);

  ngOnInit(): void {
    // Initialize data loading on component startup
    this.store.loadData();
  }

  protected handleRetry(): void {
    this.store.loadData();
  }

  /**
   * Handles ingredient selection changes from SearchIngredients component
   */
  protected handleIngredientsChanged(ingredients: IngredientVM[]): void {
    // Clear current ingredients first
    this.store.clearAllIngredients();
    
    // Add each ingredient
    ingredients.forEach(ingredient => {
      this.store.addIngredient(ingredient);
    });
  }

  /**
   * Handles recipe selection from RecipeGrid component
   */
  protected handleRecipeSelected(recipeId: string): void {
    const recipe = this.store.recipes().find(r => r.id === recipeId);
    if (recipe) {
      this.store.setSelectedRecipe(recipe);
    }
  }

  /**
   * Handles ingredient suggestion from EmptyState component
   */
  protected handleIngredientSuggested(ingredientName: string): void {
    const ingredient = this.store.ingredients().find(
      ing => ing.name.toLowerCase() === ingredientName.toLowerCase()
    );
    if (ingredient) {
      this.store.addIngredient(ingredient);
    }
  }

  /**
   * Handles browse all action from EmptyState component
   */
  protected handleBrowseAll(): void {
    this.store.clearAllIngredients();
  }

  /**
   * Handles modal close event from RecipeModal component
   */
  protected handleModalClosed(): void {
    this.store.clearSelectedRecipe();
  }
}