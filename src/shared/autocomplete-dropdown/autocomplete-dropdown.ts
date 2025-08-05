import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { IngredientVM } from '@shared/vm-types/ingredient-vm';

/**
 * AutocompleteDropdown is a presentational component for displaying ingredient suggestions.
 * It shows/hides based on visibility state and emits selection events.
 */
@Component({
  selector: 'app-autocomplete-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div 
        class="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-lg mt-1 shadow-xl max-h-48 overflow-y-auto z-[9999]"
        role="listbox"
        [attr.aria-label]="'Ingredient suggestions, ' + suggestions().length + ' available'"
      >
        @for (suggestion of suggestions(); track suggestion.name) {
          <div 
            class="px-3 py-2 cursor-pointer hover:bg-gray-700 transition-colors flex items-center gap-2"
            role="option"
            [attr.aria-label]="'Add ' + suggestion.name"
            (click)="onSuggestionClick(suggestion)"
            (keydown.enter)="onSuggestionClick(suggestion)"
            (keydown.space)="onSuggestionClick(suggestion)"
            tabindex="0"
          >
            <span>{{ suggestion.emoji }}</span>
            <span>{{ suggestion.name }}</span>
          </div>
        } @empty {
          <div class="px-3 py-2 text-gray-500 text-sm">
            No matching ingredients found
          </div>
        }
      </div>
    }
  `
})
export class AutocompleteDropdown {
  /** Array of ingredient suggestions to display */
  readonly suggestions = input.required<readonly IngredientVM[]>();
  
  /** Controls visibility of the dropdown */
  readonly isVisible = input<boolean>(false);
  
  /** Emitted when an ingredient suggestion is selected */
  ingredientSelected = output<IngredientVM>();
  
  /**
   * Handles click on a suggestion item
   */
  onSuggestionClick(suggestion: IngredientVM): void {
    this.ingredientSelected.emit(suggestion);
  }
}