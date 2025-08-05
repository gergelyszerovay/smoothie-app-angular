import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { IngredientVM } from '@shared/vm-types/ingredient-vm';

/**
 * IngredientChip is a reusable component for displaying individual ingredients.
 * It supports two modes: removable (with X button) and suggestion (fully clickable).
 */
@Component({
  selector: 'app-ingredient-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      class="px-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-gray-300 hover:bg-gray-700 transition-all flex items-center gap-2"
      [class.hover:border-yellow-400]="!isRemovable()"
      [class.hover:text-yellow-400]="!isRemovable()"
      (click)="onChipClick()"
      [attr.aria-label]="isRemovable() ? 'Remove ' + ingredient().name : 'Add ' + ingredient().name"
    >
      <span>{{ ingredient().emoji }}</span>
      <span>{{ ingredient().name }}</span>
      @if (isRemovable()) {
        <button 
          class="hover:bg-white hover:bg-opacity-10 rounded-full p-0.5 transition-colors ml-1"
          (click)="onRemoveClick($event)"
          [attr.aria-label]="'Remove ' + ingredient().name"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="w-3 h-3"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      }
    </button>
  `
})
export class IngredientChip {
  /** The ingredient to display */
  readonly ingredient = input.required<IngredientVM>();
  
  /** Whether to show the remove button */
  readonly isRemovable = input<boolean>(false);
  
  /** Emitted when the remove button is clicked */
  ingredientRemoved = output<string>();
  
  /** Emitted when the chip is clicked in suggestion mode */
  ingredientSelected = output<string>();

  /**
   * Handles click on the main chip area
   */
  onChipClick(): void {
    if (!this.isRemovable()) {
      this.ingredientSelected.emit(this.ingredient().name);
    }
  }

  /**
   * Handles click on the remove button
   */
  onRemoveClick(event: Event): void {
    event.stopPropagation();
    this.ingredientRemoved.emit(this.ingredient().name);
  }
}