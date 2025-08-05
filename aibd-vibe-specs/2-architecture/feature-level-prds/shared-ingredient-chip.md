Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: IngredientChip (shared-ingredient-chip)

---

### 1. Objective

The IngredientChip component provides a reusable, interactive element for displaying individual ingredients throughout the application. It serves two primary contexts: displaying selected ingredients in the search interface with removal capability, and presenting clickable ingredient suggestions in empty states. This component ensures consistent ingredient representation and interaction patterns across the entire application.

---

### 2. User Stories

- **As a user**, I want to see my selected ingredients clearly displayed as chips so that I can easily identify what I'm searching for.
- **As a user**, I want to remove individual ingredients from my search by clicking an X button so that I can refine my recipe search.
- **As a user**, I want to click on suggested ingredient chips so that I can quickly add popular ingredients to my search.
- **As a developer**, I want a reusable ingredient chip component so that I can maintain consistent ingredient display across the application.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Ingredient Display:**

   - The component MUST display the ingredient name and emoji as specified in the IngredientVM data structure.
   - The component MUST support both removable and suggestion interaction modes.

2. **Removable Mode:**

   - The component MUST display a prominent "X" icon when `isRemovable` is true.
   - The component MUST emit an `ingredientRemoved` event with the ingredient name when the X button is clicked.

3. **Suggestion Mode:**

   - The component MUST be fully clickable when used as a suggestion.
   - The component MUST emit an `ingredientSelected` event with the ingredient name when clicked in suggestion mode.

4. **Visual States:**
   - The component MUST maintain consistent styling with the design system.
   - The component MUST provide appropriate hover effects for interaction feedback.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Component must render efficiently with minimal re-renders.
- **Usability:** Must provide clear visual feedback for interactive states (hover, focus).
- **Accessibility:** Must support keyboard navigation and screen readers with proper ARIA attributes.
- **Responsiveness:** Must adapt to different screen sizes while maintaining touch-friendly interaction areas.
- **Styling:** Must use Tailwind CSS utility classes as primary styling approach.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Component Specifications and Visual Design:** Reference `/workspace/aibd-vibe-specs/1-design/components/shared/ingredient-chip/ingredient-chip.md` for component behavior, inputs, outputs, and states

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/ingredient-vm.md` for type definitions

**Component Hierarchy:** Used by SearchIngredients and EmptyState components

#### 4.2. Feature-Specific Implementation

**Custom Components:** IngredientChip component implementing design specification for ingredient display and interaction

**Business Logic:** No business logic required (pure presentational component)

**State Management:** Component state handled internally with signals for interaction modes and visual states

**Data Flow:** Coordinates with parent components for data and events

**Interaction Modes:**

- Removable mode with X button for selected ingredients
- Suggestion mode with full clickable area for ingredient suggestions

**Visual States:**

- Default state with ingredient name and emoji
- Hover state with enhanced visual feedback
- Focus state for keyboard navigation
- Active state when clicked

---

### 5. Acceptance Criteria

- [ ] Component displays ingredient name and emoji correctly
- [ ] Component shows X button when isRemovable is true
- [ ] Component emits ingredientRemoved event with ingredient name when X is clicked
- [ ] Component is fully clickable when used as suggestion
- [ ] Component emits ingredientSelected event with ingredient name when clicked in suggestion mode
- [ ] Component provides appropriate hover effects for interaction feedback
- [ ] Component provides proper visual feedback for hover and focus states
- [ ] Component is accessible via keyboard navigation
- [ ] Component renders correctly on mobile devices
- [ ] All interactive elements have proper ARIA attributes

---

### 6. Directory Structure

#### 6.1. Shared Component Implementation Structure

```
src/shared/ingredient-chip/
├── ingredient-chip.ts               # Reusable Angular component with inline template and styles

```

**File Explanations:**

- **`ingredient-chip.ts`**: Angular component with inline template and styles implementing the design specification with inputs for ingredient data and removable state

---

### 7. Out of Scope

- Complex ingredient editing functionality
- Drag and drop reordering of ingredients
- Ingredient quantity display (handled by other components)
- Ingredient search functionality (handled by parent components)
- Ingredient validation logic (handled by services)
