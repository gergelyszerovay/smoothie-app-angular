Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: AutocompleteDropdown (shared-autocomplete-dropdown)

---

### 1. Objective

The AutocompleteDropdown component provides a reusable, presentational element for displaying filtered ingredient suggestions in a dropdown format. It appears when users interact with search inputs and allows them to select ingredients from a filtered list. This component ensures consistent autocomplete behavior across the application and provides a smooth user experience for ingredient selection.

---

### 2. User Stories

- **As a user**, I want to see ingredient suggestions as I type so that I can quickly find and select ingredients.
- **As a user**, I want to click on ingredient suggestions to add them to my search so that I can build my recipe search efficiently.
- **As a user**, I want the dropdown to appear and disappear smoothly so that I have a polished search experience.
- **As a developer**, I want a reusable autocomplete dropdown so that I can maintain consistent search behavior across the application.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Suggestion Display:**

   - The component MUST display an array of ingredient suggestions as specified in the IngredientVM data structure.
   - The component MUST show ingredient name and emoji for each suggestion.

2. **Visibility Control:**

   - The component MUST show/hide based on the `isVisible` input property.
   - The component MUST handle visibility state changes smoothly.

3. **Selection Handling:**
   - The component MUST emit an `ingredientSelected` event with the selected ingredient when clicked.
   - The component MUST provide clear visual feedback for hover and selection states.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Component must render efficiently with minimal re-renders when suggestion list changes.
- **Usability:** Must provide clear visual feedback for interactive states (hover, focus).
- **Accessibility:** Must support keyboard navigation and screen readers with proper ARIA attributes.
- **Responsiveness:** Must adapt to different screen sizes while maintaining touch-friendly interaction areas.
- **Styling:** Must use Tailwind CSS utility classes as primary styling approach.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Component Specifications and Visual Design:** Reference `/workspace/aibd-vibe-specs/1-design/components/shared/autocomplete-dropdown/autocomplete-dropdown.md` for component behavior, inputs, outputs, and states

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/ingredient-vm.md` for type definitions

**Component Hierarchy:** Used by SearchIngredients component, contains ingredient suggestions

#### 4.2. Feature-Specific Implementation

**Custom Components:** AutocompleteDropdown component implementing design specification for ingredient suggestions

**Business Logic:** No business logic required (pure presentational component)

**State Management:** Component state handled internally with signals for visibility and selection

**Data Flow:** Coordinates with parent components for data and events

**Visual States:**

- Hidden state (not rendered or hidden via CSS)
- Visible state with dark background and border
- Hover state with enhanced visual feedback
- Focus state for keyboard navigation

**Layout Behavior:**

- Dropdown positioning relative to parent input with proper z-index to appear above other elements (e.g. recipe cards)
- Smooth show/hide transitions
- Event handling to prevent dropdown from closing when clicking inside it

---

### 5. Acceptance Criteria

- [ ] Component displays ingredient suggestions with name and emoji
- [ ] Component shows/hides based on isVisible input property
- [ ] Component emits ingredientSelected event with ingredient data when suggestion is clicked
- [ ] Component provides proper visual feedback for hover and focus states
- [ ] Component is accessible via keyboard navigation
- [ ] Component renders correctly on mobile devices
- [ ] Component handles empty suggestion arrays gracefully
- [ ] Component positions correctly relative to parent input with proper z-index layering
- [ ] Component appears above recipe cards and other elements
- [ ] Component selection works properly without closing prematurely
- [ ] All interactive elements have proper ARIA attributes
- [ ] Component integrates correctly with SearchIngredients component

---

### 6. Directory Structure

#### 6.1. Shared Component Implementation Structure

```
src/shared/autocomplete-dropdown/
├── autocomplete-dropdown.ts               # Reusable Angular component with inline template and styles

```

**File Explanations:**

- **`autocomplete-dropdown.ts`**: Angular component with inline template and styles implementing the design specification with inputs for suggestions array and visibility state

---

### 7. Out of Scope

- Ingredient filtering logic (handled by parent components)
- Search input functionality (handled by parent components)
- Keyboard navigation within dropdown (handled by parent components)
- Dropdown positioning logic (handled by parent components)
- Ingredient validation logic (handled by services)
