Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: RecipeSearch (recipe-search)

---

### 1. Objective

The RecipeSearch feature provides the core ingredient-based search functionality and recipe display for the smoothie recipe application. It enables users to select multiple ingredients through an intuitive interface with autocomplete suggestions, displays selected ingredients as removable chips, triggers real-time recipe filtering, and presents the search results in a responsive grid layout. This feature serves as the primary mechanism for users to discover and view recipes based on available ingredients.

---

### 2. User Stories

- **As a user**, I want to search for recipes by entering ingredients so that I can find smoothies I can make with what I have.
- **As a user**, I want to see autocomplete suggestions as I type so that I can quickly find and select ingredients.
- **As a user**, I want to see my selected ingredients displayed as chips so that I can easily see what I'm searching for.
- **As a user**, I want to remove individual ingredients from my search so that I can refine my recipe results.
- **As a user**, I want to clear all selected ingredients at once so that I can start a new search quickly.
- **As a user**, I want to see a grid of recipe cards showing my search results so that I can browse available smoothie recipes.
- **As a user**, I want to click on a recipe card to see detailed information so that I can learn how to make the smoothie.
- **As a user**, I want to see an empty state when no recipes match my search so that I understand why no results are shown.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Ingredient Selection:**

   - The feature MUST allow users to select multiple ingredients for recipe search.
   - The feature MUST provide autocomplete suggestions based on user input.
   - The feature MUST display selected ingredients as removable chips.

2. **Search Interface:**

   - The feature MUST provide a text input field for ingredient entry.
   - The feature MUST show autocomplete dropdown with filtered suggestions.
   - The feature MUST support keyboard navigation for ingredient selection.

3. **Ingredient Management:**

   - The feature MUST allow removal of individual ingredients via chip X buttons.
   - The feature MUST provide a "clear all" option to remove all selected ingredients.
   - The feature MUST prevent duplicate ingredient selection.

4. **Real-time Filtering:**

   - The feature MUST trigger recipe filtering when ingredient selection changes.
   - The feature MUST emit change events with updated ingredient list.
   - The feature MUST show recipes that contain ALL selected ingredients (not just any of them).

5. **Recipe Grid Display:**

   - The feature MUST display recipes in a responsive grid layout.
   - The feature MUST render individual RecipeCard components for each recipe.
   - The feature MUST handle empty recipe arrays gracefully.

6. **Recipe Card Functionality:**

   - The feature MUST display recipe name, description, and tags on each card.
   - The feature MUST emit selection events when cards are clicked.
   - The feature MUST support responsive layout across different screen sizes.

7. **Empty State Handling:**
   - The feature MUST display an empty state when no recipes match search criteria.
   - The feature MUST show suggested ingredients to help users refine their search.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Search interface must respond quickly to user input with minimal latency.
- **Usability:** Must provide intuitive ingredient selection and removal workflow.
- **Accessibility:** Must support keyboard navigation and screen readers with proper ARIA attributes.
- **Responsiveness:** Must adapt to different screen sizes while maintaining touch-friendly interaction areas.
- **Styling:** Must use Tailwind CSS utility classes and maintain design system consistency.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Component Specifications and Visual Design:**

- Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/search-ingredients/search-ingredients.md` for search ingredients component behavior, inputs, outputs, and states
- Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/recipe-grid/recipe-grid.md` for recipe grid component behavior, inputs, outputs, and states
- Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/recipe-grid/recipe-card/recipe-card.md` for recipe card component behavior, inputs, outputs, and states
- Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/empty-state/empty-state.md` for empty state component behavior, inputs, outputs, and states

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/ingredient-vm.md` for type definitions

**Component Hierarchy:** Uses IngredientChip and AutocompleteDropdown shared components, contains RecipeGrid, RecipeCard, and EmptyState components

#### 4.2. Feature-Specific Implementation

**Custom Components:** SearchIngredients, RecipeGrid, RecipeCard, and EmptyState components implementing design specifications

**Business Logic:** Ingredient filtering and search logic, autocomplete suggestion management, search state validation, recipe filtering and display logic

**State Management:** Local component state for input focus and dropdown visibility, integration with parent MainLayout state for selected ingredients and recipe data

**Data Flow:** Coordinates with parent component for ingredient and recipe data, coordinates with AutocompleteDropdown for suggestions, manages recipe grid display and empty state handling

**Image Assets:** Recipe images are stored in `/assets/images/` and are calculated by RecipeCard components using the pattern `/assets/images/{recipe-id}.jpg`. The EmptyState component uses `/assets/images/empty_state.png` for the empty state illustration.

**Search States:**

- Empty state with placeholder text prompting ingredient entry
- Active state with selected ingredients displayed as chips
- Focused state with autocomplete dropdown visible (with proper z-index layering)
- Loading state when filtering recipes

**Display States:**

- Grid state with multiple recipe cards
- Empty state with suggested ingredients
- Loading state when fetching recipe data

**Interaction Patterns:**

- Text input with autocomplete suggestions
- Ingredient chip display with removal functionality
- Clear all button for bulk removal
- Keyboard navigation support

---

### 5. Acceptance Criteria

- [ ] Users can enter ingredients and see autocomplete suggestions
- [ ] Users can select ingredients from autocomplete dropdown
- [ ] Selected ingredients display as removable chips
- [ ] Users can remove individual ingredients by clicking X button
- [ ] Users can clear all ingredients with clear all button
- [ ] Search triggers real-time recipe filtering (shows recipes containing ALL selected ingredients)
- [ ] Autocomplete dropdown appears above recipe cards with proper z-index
- [ ] Autocomplete dropdown ingredientSelected event works properly without closing prematurely
- [ ] Component handles empty and focused states correctly
- [ ] Component provides proper visual feedback for all interactions
- [ ] Component is accessible via keyboard navigation
- [ ] Component renders correctly on mobile devices
- [ ] All interactive elements have proper ARIA attributes
- [ ] Component integrates correctly with parent MainLayout component
- [ ] Recipe grid displays recipes in responsive layout
- [ ] Recipe cards show recipe information correctly
- [ ] Empty state displays when no recipes match search
- [ ] Empty state shows suggested ingredients
- [ ] Empty state ingredientSuggested event works properly
- [ ] Recipe cards calculate image URLs correctly using pattern `/assets/images/{recipe-id}.jpg`
- [ ] Empty state image displays correctly from `/assets/images/empty_state.png`

---

### 6. Directory Structure

#### 6.1. Feature Implementation Structure

```
src/features/recipe-search/
├── search-ingredients.ts               # Angular component with inline template and styles
├── recipe-grid.ts                      # Recipe grid component with inline template and styles
├── recipe-card.ts                      # Recipe card component with inline template and styles
└── empty-state.ts                      # Empty state component with inline template and styles
```

**File Explanations:**

- **`search-ingredients.ts`**: Angular component with inline template and styles implementing the design specification with inputs for available and selected ingredients, proper dropdown positioning and event handling
- **`recipe-grid.ts`**: Angular component with inline template and styles implementing the grid layout with recipe cards
- **`recipe-card.ts`**: Angular component with inline template and styles for individual recipe card display with image calculation
- **`empty-state.ts`**: Angular component with inline template and styles for empty state display with image

---

### 7. Out of Scope

- Recipe modal functionality (handled by RecipeDisplay feature)
- Recipe data management (handled by MainLayout feature)
- Advanced filtering options (handled by other features)
- Search history functionality
- Favorite ingredient management
- Ingredient validation logic (handled by services)
- Recipe recommendation algorithms
