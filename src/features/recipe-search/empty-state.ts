import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { IngredientVM } from '@shared/vm-types/ingredient-vm';
import { IngredientChip } from '@shared/ingredient-chip/ingredient-chip';

/**
 * EmptyState component is displayed when a search yields no results.
 * It informs the user that no matching recipes were found and provides suggestions
 * for popular ingredients to try next.
 */
@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, IngredientChip],
  template: `
    <div class="w-full max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Empty State Image -->
        <div class="hidden md:block">
          <img 
            ngSrc="/assets/images/empty_state.png"
            alt="No recipes found illustration"
            width="400"
            height="300"
            class="mx-auto rounded-lg shadow-lg w-full max-w-sm object-cover bg-gray-800"
            priority="false"
          />
        </div>
        
        <!-- Message and Actions -->
        <div class="text-center md:text-left">
          <!-- Message -->
          <div class="mb-8">
            <h3 class="text-3xl md:text-4xl font-semibold text-white mb-4">No recipes found</h3>
            <p class="text-gray-300 text-lg leading-relaxed mb-2">
              We couldn't find any smoothie recipes with those ingredients.
            </p>
          </div>

          <!-- Suggested Ingredients -->
          @if (suggestedIngredients().length > 0) {
            <div class="mb-8">
              <h4 class="text-lg font-medium text-white mb-4">Popular ingredients to try:</h4>
              <div class="flex flex-wrap justify-center md:justify-start gap-2">
                @for (ingredient of suggestedIngredients(); track ingredient.name) {
                  <app-ingredient-chip
                    [ingredient]="ingredient"
                    [isRemovable]="false"
                    (ingredientSelected)="onIngredientSuggested($event)"
                  />
                }
              </div>
            </div>
          }

          <!-- Browse All Recipes Link -->
          <div>
            <button
              (click)="onBrowseAll()"
              class="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-colors"
              [attr.aria-label]="'Browse all recipes'"
            >
              Browse All Recipes
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem 1rem;
    }
  `]
})
export class EmptyState {
  /** A list of popular ingredients to suggest */
  readonly suggestedIngredients = input.required<readonly IngredientVM[]>();
  
  /** Emitted when a suggested ingredient chip is clicked */
  ingredientSuggested = output<string>();
  
  /** Emitted when the "Browse All Recipes" link is clicked */
  browseAll = output();

  /**
   * Handles suggested ingredient selection
   */
  protected onIngredientSuggested(ingredientName: string): void {
    this.ingredientSuggested.emit(ingredientName);
  }

  /**
   * Handles browse all recipes click
   */
  protected onBrowseAll(): void {
    this.browseAll.emit();
  }
}