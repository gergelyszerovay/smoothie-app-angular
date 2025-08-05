import { Component, input, output, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RecipeVM } from '@shared/vm-types/recipe-vm';
import { TagList } from '@shared/tag-list/tag-list';

/**
 * RecipeModal component displays detailed recipe information in a modal overlay.
 * 
 * This component renders comprehensive recipe details including:
 * - Recipe image with fallback handling
 * - Recipe name, description
 * - Ingredients list with amounts, units, and emojis
 * - Pro tips for recipe preparation
 * - Tags using the shared TagList component
 * 
 * The modal follows accessibility best practices with proper ARIA attributes,
 * keyboard navigation support, and focus management.
 */
@Component({
  selector: 'app-recipe-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, TagList],
  template: `
    @if (recipe()) {
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'modal-title-' + recipe()!.id"
        [attr.aria-describedby]="'modal-description-' + recipe()!.id"
        (click)="onBackdropClick($event)"
      >
        <div 
          class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto transform transition-all duration-300 ease-out mx-auto"
          (click)="$event.stopPropagation()"
        >
          <div class="p-4 sm:p-6">
            <!-- Header Section -->
            <div class="flex justify-between items-center mb-6">
              <h3 
                [id]="'modal-title-' + recipe()!.id"
                class="text-xl sm:text-2xl font-semibold text-white"
              >
                {{ recipe()!.name }}
              </h3>
              <button 
                (click)="onCloseClick()"
                class="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700"
                aria-label="Close recipe modal"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            
            <!-- Recipe Image -->
            <div class="mb-6">
              <img 
                [ngSrc]="'/assets/images/' + recipe()!.id + '.jpg'"
                [alt]="recipe()!.name + ' smoothie recipe'"
                width="608"
                height="320"
                class="w-full h-60 sm:h-80 object-cover rounded-lg"
                priority
                (error)="onImageError($event)"
              />
            </div>

            <!-- Recipe Description -->
            <div class="mb-6">
              <p 
                [id]="'modal-description-' + recipe()!.id"
                class="text-gray-300 text-lg leading-relaxed"
              >
                {{ recipe()!.description }}
              </p>
            </div>
            
            <!-- Content Grid -->
            <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <!-- Ingredients Section -->
              <div>
                <h4 class="text-lg font-semibold text-white mb-3">Ingredients</h4>
                <ul class="space-y-2 text-gray-300" role="list">
                  @for (ingredient of recipe()!.ingredients; track ingredient.ingredient.name) {
                    <li class="flex items-center gap-3" role="listitem">
                      <span class="text-xl" aria-hidden="true">{{ ingredient.ingredient.emoji }}</span>
                      <span class="flex-1">
                        <span class="font-medium">{{ ingredient.amount }}</span>
                        <span class="mx-1">{{ ingredient.unit }}</span>
                        <span>{{ ingredient.ingredient.name }}</span>
                      </span>
                    </li>
                  }
                </ul>
              </div>
              
              <!-- Pro Tips Section -->
              <div>
                <h4 class="text-lg font-semibold text-white mb-3">Pro Tips</h4>
                @if (recipe()!.proTips.length > 0) {
                  <ul class="space-y-2 text-gray-300 list-disc pl-4" role="list">
                    @for (tip of recipe()!.proTips; track $index) {
                      <li role="listitem">{{ tip }}</li>
                    }
                  </ul>
                } @else {
                  <p class="text-gray-500 italic">No pro tips available for this recipe.</p>
                }
              </div>
            </div>
            
            <!-- Tags Section -->
            @if (recipe()!.tags.length > 0) {
              <div class="mt-6 pt-6 border-t border-gray-700">
                <h4 class="text-lg font-semibold text-white mb-3">Tags</h4>
                <app-tag-list [tags]="recipe()!.tags" />
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-enter {
      animation: modalEnter 0.3s ease-out forwards;
      opacity: 0;
      transform: scale(0.95);
    }
    
    @keyframes modalEnter {
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class RecipeModal {
  /** The recipe to display in the modal. If null, the modal is hidden. */
  readonly recipe = input<RecipeVM | null>(null);

  /** Emitted when the user closes the modal */
  readonly modalClosed = output();

  /**
   * Handles clicks on the modal backdrop to close the modal
   */
  protected onBackdropClick(event: MouseEvent): void {
    // Only close if clicking directly on the backdrop, not on child elements
    if (event.target === event.currentTarget) {
      this.modalClosed.emit();
    }
  }

  /**
   * Handles clicks on the close button
   */
  protected onCloseClick(): void {
    this.modalClosed.emit();
  }

  /**
   * Handles image loading errors by setting a fallback image
   */
  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Use a placeholder image or hide the image on error
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjA4IiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDYwOCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDgiIGhlaWdodD0iMzIwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yODggMTIwSDMyMFYxNTJIMjg4VjEyMFoiIGZpbGw9IiM2QjcyODAiLz4KPHA+CjwvcGF0aD4KPHBhdGggZD0iTTI1NiAxNjBIMzUyVjE5MkgyNTZWMTYwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K';
    img.alt = 'Recipe image not available';
  }

  /**
   * Handles keyboard events for accessibility
   */
  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.recipe()) {
      event.preventDefault();
      this.modalClosed.emit();
    }
  }

  /**
   * Prevents body scrolling when modal is open and manages focus
   */
  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.recipe()) return;

    // Trap focus within modal
    if (event.key === 'Tab') {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
}