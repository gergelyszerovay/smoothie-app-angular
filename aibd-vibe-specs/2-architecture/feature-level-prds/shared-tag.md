Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: Tag (shared-tag)

---

### 1. Objective

The Tag component provides a reusable, presentational element for displaying individual tags throughout the application. It displays tag information with consistent styling and color themes, ensuring uniform tag representation across recipe cards, modals, and other UI elements. This component serves as the foundational building block for tag-based categorization and filtering.

---

### 2. User Stories

- **As a user**, I want to see recipe tags clearly displayed with consistent styling so that I can easily identify recipe categories.
- **As a user**, I want to distinguish between different tag types through color coding so that I can quickly understand recipe attributes.
- **As a developer**, I want a reusable tag component so that I can maintain consistent tag display across the application.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Tag Display:**

   - The component MUST display the tag name as specified in the TagVM data structure.
   - The component MUST apply the color theme specified in the TagVM data structure.

2. **Visual Consistency:**

   - The component MUST maintain consistent styling with the design system.
   - The component MUST support different color themes for visual distinction.

3. **Accessibility:**
   - The component MUST provide proper semantic markup for screen readers.
   - The component MUST support keyboard navigation when interactive.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Component must render efficiently with minimal re-renders.
- **Usability:** Must provide clear visual distinction between different tag types.
- **Accessibility:** Must support screen readers with proper ARIA attributes.
- **Responsiveness:** Must adapt to different screen sizes while maintaining readability.
- **Styling:** Must use Tailwind CSS utility classes as primary styling approach.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Component Specifications and Visual Design:** Reference `/workspace/aibd-vibe-specs/1-design/components/shared/tag-list/tag/tag.md` for component behavior, inputs, outputs, and states

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/tag-vm.md` for type definitions

**Component Hierarchy:** Used by TagList, RecipeCard, and RecipeModal components

#### 4.2. Feature-Specific Implementation

**Custom Components:** Tag component implementing design specification for individual tag display

**Business Logic:** No business logic required (pure presentational component)

**State Management:** Component state handled internally with signals for visual states

**Data Flow:** Coordinates with parent components for data and events, receives tag data from MainLayout component

**Visual States:**

- Default state with tag name and color theme
- Hover state with enhanced visual feedback (when interactive)
- Focus state for keyboard navigation (when interactive)

**Color Themes:**

- Support for different color schemes (emerald, blue, purple, etc.)
- Each tag color is loaded from `tags.json` data structure as Tailwind color names
- Colors are applied using Tailwind CSS `-500` variant (e.g., `text-emerald-500`)
- Consistent color application across all tag instances

---

### 5. Acceptance Criteria

- [ ] Component displays tag name correctly
- [ ] Component applies the specified color theme
- [ ] Component maintains consistent styling with design system
- [ ] Component provides proper visual feedback for hover and focus states
- [ ] Component is accessible via screen readers
- [ ] Component renders correctly on mobile devices
- [ ] Component supports different color themes loaded from tags.json
- [ ] Component applies Tailwind -500 color variants correctly using direct color mapping
- [ ] All visual elements have proper ARIA attributes
- [ ] Component integrates correctly with TagList container

---

### 6. Directory Structure

#### 6.1. Shared Component Implementation Structure

```
src/shared/tag/
├── tag.ts               # Reusable Angular component with inline template and styles

```

**File Explanations:**

- **`tag.ts`**: Angular component with inline template and styles implementing the design specification with inputs for tag data and color mapping

---

### 7. Out of Scope

- Tag editing functionality
- Tag selection/deselection logic
- Tag search functionality
- Tag management (create, update, delete)
