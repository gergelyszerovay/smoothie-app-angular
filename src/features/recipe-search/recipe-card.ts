import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RecipeVM } from '@shared/vm-types/recipe-vm';
import { TagList } from '@shared/tag-list/tag-list';

/**
 * RecipeCard component displays a summary of a single recipe, including its image, name,
 * a brief description, and a list of tags. It is designed to be visually appealing and
 * to provide enough information for a user to decide if they are interested in viewing
 * the full recipe.
 */
@Component({
  selector: 'app-recipe-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, TagList],
  template: `
    <div 
      class="group bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl hover:ring-2 hover:ring-yellow-400 transition-all cursor-pointer slide-up flex flex-col h-full relative"
      [attr.aria-label]="'Recipe: ' + recipe().name"
      role="button"
      tabindex="0"
      (keydown.enter)="onCardClick()"
      (keydown.space)="onCardClick()"
    >
      <!-- Hover Icon -->
      <div class="absolute top-4 right-4 bg-gray-900 bg-opacity-75 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
          <path d="m7 7 10 10"></path>
          <path d="m17 7-10 10"></path>
        </svg>
      </div>
      
      <!-- Recipe Image -->
      <img 
        [ngSrc]="imageUrl()"
        [alt]="recipe().name"
        width="400"
        height="240"
        class="w-full h-64 object-cover"
        priority="false"
      />
      
      <!-- Card Content -->
      <div class="p-6 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-white mb-2">{{ recipe().name }}</h3>
        <p class="text-gray-300 text-sm mb-4 flex-1">{{ recipe().description }}</p>
        
        <!-- Tags -->
        <app-tag-list [tags]="recipe().tags" />
      </div>
    </div>
  `,
  styles: [`
    .slide-up { 
      animation: slideUp 0.8s ease-out forwards; 
      opacity: 0; 
      transform: translateY(20px); 
    }
    @keyframes slideUp { 
      to { opacity: 1; transform: translateY(0); } 
    }
    
    :host {
      display: block;
    }
  `],
  host: {
    '(click)': 'onCardClick()'
  }
})
export class RecipeCard {
  /** The recipe object to display */
  readonly recipe = input.required<RecipeVM>();

  /** Computed image URL based on recipe ID */
  protected readonly imageUrl = computed(() => {
    return `/assets/images/${this.recipe().id}.jpg`;
  });

  /**
   * Handles card click events
   */
  protected onCardClick(): void {
    // Click handling is managed by the parent RecipeGrid component
    // This method is here for keyboard accessibility
  }
}