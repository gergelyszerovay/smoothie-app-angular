import { Component, input, output, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IngredientVM } from '@shared/vm-types/ingredient-vm';
import { IngredientChip } from '@shared/ingredient-chip/ingredient-chip';
import { AutocompleteDropdown } from '@shared/autocomplete-dropdown/autocomplete-dropdown';

/**
 * SearchIngredients component provides the main search interface for the application.
 * It allows users to select ingredients and see the list of matching recipes update in real-time.
 * It includes an input field with autocomplete suggestions and displays the currently selected
 * ingredients as a list of chips.
 */
@Component({
  selector: 'app-search-ingredients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IngredientChip, AutocompleteDropdown],
  template: `
    <div class="slide-up mb-12 relative z-[9998]" style="animation-delay: 0.2s;">
      <div class="max-w-2xl mx-auto">
        <label class="block text-sm font-medium text-gray-300 mb-3">Ingredients you have</label>
        <div class="relative">
          <div 
            class="min-h-[56px] flex flex-wrap gap-2 transition-all relative bg-gray-800 border-gray-600 border rounded-lg pt-3 pr-10 pb-3 pl-3 items-center"
            [class.search-glow]="isFocused()"
          >
            <!-- Selected Ingredients -->
            <div class="flex flex-wrap gap-2">
              @for (ingredient of selectedIngredients(); track ingredient.name) {
                <app-ingredient-chip
                  [ingredient]="ingredient"
                  [isRemovable]="true"
                  (ingredientRemoved)="onIngredientRemoved($event)"
                />
              }
            </div>
            
            <!-- Text Input -->
            <input 
              type="text"
              #searchInput
              [(ngModel)]="searchQuery"
              (input)="onSearchInput($event)"
              (focus)="onInputFocus()"
              (blur)="onInputBlur()"
              (keydown)="onKeyDown($event)"
              [placeholder]="inputPlaceholder()"
              class="flex-1 min-w-[200px] outline-none placeholder-gray-400 text-gray-100 bg-transparent"
              [attr.aria-label]="'Search for ingredients'"
              [attr.aria-expanded]="isDropdownVisible()"
              [attr.aria-describedby]="'autocomplete-suggestions'"
            />
            
            <!-- Clear All Button -->
            @if (selectedIngredients().length > 0) {
              <button 
                (click)="onClearAll()"
                class="text-gray-400 hover:text-pink-400 transition-colors absolute top-3 right-3"
                [attr.aria-label]="'Clear all selected ingredients'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-[20px] h-[20px]">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            }
          </div>
          
          <!-- Autocomplete Dropdown -->
          <app-autocomplete-dropdown
            [suggestions]="filteredSuggestions()"
            [isVisible]="isDropdownVisible()"
            (ingredientSelected)="onIngredientSelected($event)"
            id="autocomplete-suggestions"
          />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-glow {
      box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.3), 0 0 20px rgba(255, 107, 107, 0.2);
    }
    .slide-up { 
      animation: slideUp 0.8s ease-out forwards; 
      opacity: 0; 
      transform: translateY(20px); 
    }
    @keyframes slideUp { 
      to { opacity: 1; transform: translateY(0); } 
    }
  `]
})
export class SearchIngredients {
  /** The full list of ingredients to be used for autocomplete suggestions */
  readonly availableIngredients = input.required<readonly IngredientVM[]>();
  
  /** The list of ingredients that the user has currently selected */
  readonly selectedIngredients = input.required<readonly IngredientVM[]>();
  
  /** Emitted when the list of selected ingredients changes */
  ingredientsChanged = output<IngredientVM[]>();

  // Component state
  protected readonly searchQuery = signal('');
  protected readonly isFocused = signal(false);

  // Computed properties
  protected readonly inputPlaceholder = computed(() => {
    return this.selectedIngredients().length === 0 ? 'Banana, spinach, mango...' : '';
  });

  protected readonly filteredSuggestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (query.length === 0) {
      return [];
    }

    const selectedNames = this.selectedIngredients().map(ing => ing.name.toLowerCase());
    
    return this.availableIngredients()
      .filter(ingredient => 
        ingredient.name.toLowerCase().includes(query) && 
        !selectedNames.includes(ingredient.name.toLowerCase())
      )
      .slice(0, 10);
  });

  protected readonly isDropdownVisible = computed(() => {
    return this.isFocused() && this.filteredSuggestions().length > 0;
  });

  /**
   * Handles search input changes
   */
  protected onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  /**
   * Handles input focus
   */
  protected onInputFocus(): void {
    this.isFocused.set(true);
  }

  /**
   * Handles input blur with delay to allow for dropdown clicks
   */
  protected onInputBlur(): void {
    // Delay to allow dropdown clicks to register
    setTimeout(() => {
      this.isFocused.set(false);
    }, 150);
  }

  /**
   * Handles keyboard navigation
   */
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = this.searchQuery().toLowerCase().trim();
      if (query) {
        const match = this.filteredSuggestions().find(ingredient =>
          ingredient.name.toLowerCase() === query
        );
        if (match) {
          this.selectIngredient(match);
        }
      }
    } else if (event.key === 'Escape') {
      this.isFocused.set(false);
    }
  }

  /**
   * Handles ingredient selection from autocomplete
   */
  protected onIngredientSelected(ingredient: IngredientVM): void {
    this.selectIngredient(ingredient);
  }

  /**
   * Handles ingredient removal
   */
  protected onIngredientRemoved(ingredientName: string): void {
    const updatedIngredients = this.selectedIngredients().filter(
      ingredient => ingredient.name !== ingredientName
    );
    this.ingredientsChanged.emit([...updatedIngredients]);
  }

  /**
   * Handles clear all button click
   */
  protected onClearAll(): void {
    this.ingredientsChanged.emit([]);
  }

  /**
   * Private helper to select an ingredient
   */
  private selectIngredient(ingredient: IngredientVM): void {
    const currentIngredients = this.selectedIngredients();
    const alreadySelected = currentIngredients.some(
      selected => selected.name.toLowerCase() === ingredient.name.toLowerCase()
    );

    if (!alreadySelected) {
      this.ingredientsChanged.emit([...currentIngredients, ingredient]);
      this.searchQuery.set('');
    }
  }
}