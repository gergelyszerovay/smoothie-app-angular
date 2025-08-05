import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * HeroSection Component
 * 
 * A presentational component that displays the main heading and introductory text 
 * for the application. It is designed to be visually prominent and clearly 
 * communicate the purpose of the site to the user.
 */
@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-center mb-12 slide-up" style="animation-delay: 0.1s;">
      <h2 class="text-4xl font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight mb-4 text-balance">
        Find Your Perfect Smoothie
      </h2>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto text-balance">
        Discover delicious smoothie recipes based on the ingredients you have at home.
      </p>
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
export class HeroSection {
  // Presentational component with no logic
  protected readonly componentName = 'HeroSection';
}