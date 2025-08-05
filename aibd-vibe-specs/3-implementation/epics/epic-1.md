# Epic #1: Smoothie Recipe MVP

## Epic Information

- **Epic Number**: 1
- **Status**: Approved

## Goal

Deliver a fully functional MVP of the Smoothie Recipe Angular app that enables users to search for smoothie recipes by ingredients and view detailed recipe information. The app provides an intuitive search experience with recipe filtering (showing recipes containing ALL selected ingredients).

## Business Value

This epic will provide the foundational user experience for the Smoothie Recipe app, allowing users to discover and engage with recipes. This will help validate the core value proposition of the app and provide a platform for future feature enhancements.

## Technical Considerations

The implementation will be a single-page Angular application. It will use a component-based architecture with a single smart component managing the application state. All data will be loaded from static JSON files.

## User Stories

### Story #1: Project Foundation Setup

**As a** developer
**I want** to verify the existing Angular project boilerplate is properly configured and buildable
**So that** I have a stable foundation for building the application.

**Acceptance Criteria:**

- The project builds successfully with `ng build` without any errors.
- No circular dependencies exist in the codebase.
- All linting rules pass with `ng lint` without any errors or warnings.
- All JSON data files (`recipes.json`, `ingredients.json`, `tags.json`) are present in the application's assets directory (`src/assets`).
- All recipe images from `/workspace/aibd-vibe-specs/sample-data/images` are present in the `src/assets/images` directory.

---

### Story #2: Implement Shared Components

**As a** developer
**I want** to create a set of reusable shared components and type definitions
**So that** I can build the UI in a consistent and efficient manner with type safety.

**Acceptance Criteria:**

- A shared `vm-types` feature is created with centralized ViewModel type definitions.
- An `IngredientChip` component is created for displaying ingredients.
- A `Tag` component is created for displaying tags.
- A `TagList` component is created for displaying a list of tags.
- An `AutocompleteDropdown` component is created for ingredient search.
- All shared components are presentational and emit events for user interactions.
- All components use the shared ViewModel types for type safety.

**Feature Level PRD:**

- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-vm-types.md`
- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-ingredient-chip.md`
- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-tag.md`
- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-tag-list.md`
- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-autocomplete-dropdown.md`

---

### Story #3: Implement Main Layout and State Management

**As a** user
**I want** to see the main layout of the application with a hero section and search controls
**So that** I can understand the purpose of the app and begin a search.

**Acceptance Criteria:**

- A `MainLayoutContainer` component is created as the single smart component.
- A `main-layout-store.ts` is created to manage all application state following the AIBD Simple Store Pattern.
- The store loads all recipe, ingredient, and tag data from JSON files on startup using DTO types and converts to VM types.
- The store implements recipe filtering logic (shows recipes containing ALL selected ingredients).
- A `HeroSection` component is created to display a welcome message and introduction.
- The store follows the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` pattern.
- The store design complies with `/workspace/aibd-vibe-specs/2-architecture/store-designs/main-layout-store.md`.

**Feature Level PRD:**

- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/main-layout.md`

---

### Story #4: Implement Recipe Search Functionality

**As a** user
**I want** to be able to search for recipes by selecting one or more ingredients
**So that** I can find recipes that I can make with the ingredients I have.

**Acceptance Criteria:**

- A `SearchIngredients` component allows users to select ingredients.
- The `MainLayoutService` filters the list of recipes based on the selected ingredients (showing recipes containing ALL selected ingredients).
- The UI updates in real-time to show the filtered recipes.
- Selected ingredients are displayed as chips that can be removed.
- The autocomplete dropdown appears above recipe cards with proper z-index layering.

**Feature Level PRD:**

- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/recipe-search.md`

---

### Story #5: Implement Recipe Display

**As a** user
**I want** to see the search results displayed in a clear and organized grid
**So that** I can easily browse and select a recipe to view.

**Acceptance Criteria:**

- A `RecipeModal` component displays the full details of a selected recipe.

**Feature Level PRD:**

- `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/recipe-display.md`
