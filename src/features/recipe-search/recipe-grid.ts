import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeVM } from '@shared/vm-types/recipe-vm';
import { RecipeCard } from './recipe-card';

/**
 * RecipeGrid component is responsible for displaying a collection of RecipeCard components
 * in a responsive grid layout. It takes a list of recipes and renders them, handling the
 * arrangement and spacing of the cards.
 */
@Component({
  selector: 'app-recipe-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RecipeCard],
  template: `
    <div 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      [attr.aria-label]="'Recipe grid with ' + recipes().length + ' recipes'"
    >
      @for (recipe of recipes(); track recipe.id; let index = $index) {
        <app-recipe-card
          [recipe]="recipe"
          [style.animation-delay]="(index * 0.1 + 0.3) + 's'"
          (click)="onRecipeSelected(recipe)"
        />
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class RecipeGrid {
  /** An array of recipe objects to display */
  readonly recipes = input.required<readonly RecipeVM[]>();
  
  /** Emitted when a recipe card is clicked. Passes the recipe ID */
  recipeSelected = output<string>();

  /**
   * Handles recipe card click events
   */
  protected onRecipeSelected(recipe: RecipeVM): void {
    this.recipeSelected.emit(recipe.id);
  }
}