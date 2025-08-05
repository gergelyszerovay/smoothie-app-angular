Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: MainLayout (main-layout)

---

### 1. Objective

The MainLayout feature serves as the top-level container and state management system for the entire smoothie recipe application. It orchestrates the overall application structure, manages global state including search criteria and recipe data, and provides the foundation for all user interactions. This feature ensures a consistent user experience and handles the core application logic for recipe discovery and display.

---

### 2. User Stories

- **As a user**, I want to see a consistent application layout so that I can navigate and interact with the recipe search interface seamlessly.
- **As a user**, I want the application to load and display recipe data efficiently so that I can start searching for recipes immediately.
- **As a user**, I want the application to handle errors gracefully so that I can continue using the app even when issues occur.
- **As a developer**, I want centralized state management so that I can maintain consistent data flow across all components.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Application Structure:**

   - The feature MUST provide the main application layout with header, content area, and footer.
   - The feature MUST manage the overall component hierarchy and routing.

2. **State Management:**

   - The feature MUST manage global application state including user session, navigation, and theme preferences.
   - The feature MUST handle search criteria, selected ingredients, and recipe data.
   - The feature MUST maintain filtered recipe list based on search criteria.

3. **Data Management:**

   - The feature MUST load and manage the complete recipe dataset.
   - The feature MUST provide data to child components through proper data flow.
   - The feature MUST handle loading, ready, and error states appropriately.

4. **Component Orchestration:**
   - The feature MUST coordinate between SearchIngredients, RecipeGrid, and RecipeModal components.
   - The feature MUST handle conditional rendering of components based on application state.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Application must load quickly and provide responsive interactions.
- **Usability:** Must provide intuitive navigation and consistent user experience.
- **Security:** Must handle data validation and protect against common vulnerabilities.
- **Accessibility:** Must meet WCAG 2.1 AA standards for all interactive elements.
- **Responsiveness:** Must adapt to different devices and screen sizes.
- **Styling:** Must use Tailwind CSS utility classes and maintain design system consistency.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Component Specifications and Visual Design:** Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/main-layout-container.md` for component behavior, inputs, outputs, and states

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/` for RecipeVM, IngredientVM, and TagVM types

**Component Hierarchy:** Reference `/workspace/aibd-vibe-specs/1-design/component-tree.md` for complete component relationships

**Hero Section Design:** Reference `/workspace/aibd-vibe-specs/1-design/components/app/main-layout-container/hero-section/hero-section.md` for hero section component behavior, inputs, outputs, and states

#### 4.2. Feature-Specific Implementation

**Custom Components:** MainLayoutContainer and HeroSection components implementing design specifications

**Business Logic:** All business logic contained within the AIBD Simple Store Pattern including:

- Recipe data fetching from `/assets/recipes.json` using RecipeDTO types and converting to RecipeVM
- Ingredient data fetching from `/assets/ingredients.json` using IngredientDTO types and converting to IngredientVM
- Tag data fetching from `/assets/tags.json` using TagDTO types and converting to TagVM
- Recipe filtering logic based on selected ingredients (shows recipes containing ALL selected ingredients)
- Search state management and coordination
- Error handling and loading states

**State Management:** Global application state using AIBD Simple Store, containing all business logic for:

- Search criteria and selected ingredients
- Recipe data and filtered results
- Loading, ready, and error states
- Recipe filtering and search coordination

**Store Design:** Reference `/workspace/aibd-vibe-specs/2-architecture/store-designs/main-layout-store.md` for state management, updaters, selectors, and effects. The store implementation MUST follow the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` guidelines and comply with `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.checklist.md`.

**Data Flow:** Coordinates between SearchIngredients, RecipeGrid, and RecipeModal, manages data flow between child components, handles all data fetching from `/assets/` folder

**Layout Management:**

- Application shell with consistent header and content areas
- Responsive grid layout for recipe display
- Modal overlay for recipe details
- Conditional rendering based on search state

**State Management:**

- Global state for search criteria and recipe data using AIBD Simple Store Pattern
- All business logic contained within the signal store
- Recipe data fetching from `/assets/recipes.json` using RecipeDTO types and converting to RecipeVM
- Ingredient data fetching from `/assets/ingredients.json` using IngredientDTO types and converting to IngredientVM
- Tag data fetching from `/assets/tags.json` using TagDTO types and converting to TagVM
- Recipe filtering logic based on selected ingredients (shows recipes containing ALL selected ingredients)
- Loading states with appropriate visual feedback
- Error handling with user-friendly messages

---

### 5. Acceptance Criteria

- [ ] Application loads and displays initial state correctly
- [ ] Search functionality updates recipe display in real-time
- [ ] Recipe modal opens and closes properly
- [ ] Application handles loading states with appropriate feedback
- [ ] Application handles error states gracefully
- [ ] All components integrate correctly within the layout
- [ ] Application is responsive across different screen sizes
- [ ] All interactive elements are accessible via keyboard
- [ ] State management works correctly for all user interactions
- [ ] Data flow between components functions properly
- [ ] AIBD Simple Store Pattern follows the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` guidelines
- [ ] Recipe data fetching from `/assets/recipes.json` using RecipeDTO types and converting to RecipeVM works correctly
- [ ] Ingredient data fetching from `/assets/ingredients.json` using IngredientDTO types and converting to IngredientVM works correctly
- [ ] Tag data loading from `/assets/tags.json` using TagDTO types and converting to TagVM works correctly
- [ ] Recipe filtering logic functions properly (shows recipes containing ALL selected ingredients)

---

### 6. Directory Structure

#### 6.1. Feature Implementation Structure

```
src/features/main-layout/
├── main-layout-container.ts          # Angular container component with inline template and styles
└── internal/
    ├── main-layout-store.ts          # State management store
    ├── main-layout-store-design.ts   # State management store design
    ├── recipe-dto.ts                 # Recipe DTO type definitions
    ├── ingredient-dto.ts             # Ingredient DTO type definitions
    ├── tag-dto.ts                    # Tag DTO type definitions
    └── hero-section.ts               # Hero section component with inline template and styles
```

**File Explanations:**

- **`main-layout-container.ts`**: Angular container component with inline template and styles implementing the design specification with AIBD Simple Store Pattern integration
- **`internal/main-layout-store.ts`**: AIBD Simple Store Pattern following the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` guidelines, containing all business logic for data fetching from `/assets/recipes.json`, `/assets/ingredients.json`, and `/assets/tags.json` using DTO types, converting to VMs, recipe filtering, and state management
- **`internal/recipe-dto.ts`**: Recipe DTO type definitions matching the structure of recipes.json
- **`internal/ingredient-dto.ts`**: Ingredient DTO type definitions matching the structure of ingredients.json
- **`internal/tag-dto.ts`**: Tag DTO type definitions matching the structure of tags.json
- **`internal/hero-section.ts`**: Hero section component with inline template and styles for application introduction

---

### 7. Integration Requirements

#### 7.1. Component Integration

- **Complete Application Shell**: All components must be properly integrated into the MainLayoutContainer
- **Data Flow Validation**: Ensure proper data flow between MainLayout store and all child components
- **State Management Integration**: Verify that recipe filtering and modal state management work correctly
- **Component Communication**: Validate that all component inputs/outputs use correct type definitions

#### 7.2. User Experience Validation

- **User Journey Validation**: Validate complete user flow from startup through recipe search and viewing
- **Responsive Design Validation**: Validate application works across desktop, tablet, and mobile screens
- **Accessibility Validation**: Ensure WCAG 2.1 AA compliance with proper ARIA attributes and keyboard navigation
- **Error Handling Validation**: Validate graceful handling of missing data, network errors, and edge cases

#### 7.3. Performance and Quality Assurance

- **Performance Optimization**: Ensure efficient component rendering and data flow
- **Memory Management**: Validate proper cleanup and memory usage
- **Code Quality**: Maintain TypeScript strict mode compliance and clean code standards

### 8. Out of Scope

- User authentication and profile management
- Recipe creation or editing functionality
- Advanced filtering and sorting options
- User preferences and settings management
- Social sharing functionality
- Recipe rating and review system
