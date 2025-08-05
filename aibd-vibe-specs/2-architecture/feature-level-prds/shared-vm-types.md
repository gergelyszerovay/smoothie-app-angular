Based on: angular-tailwind

# Product Requirements Document (PRD)

## Feature: VM Types (shared-vm-types)

---

### 1. Objective

The VM Types feature provides centralized, immutable data structure definitions for all ViewModels used throughout the smoothie recipe application. It serves as the single source of truth for data type definitions, ensuring consistency, type safety, and maintainability across all features that handle ingredient and tag data. This feature eliminates duplication and provides a stable foundation for data modeling throughout the application.

---

### 2. User Stories

- **As a developer**, I want centralized type definitions so that I can maintain consistent data structures across all features.
- **As a developer**, I want immutable data types so that I can prevent accidental data mutations and ensure predictable state management.
- **As a developer**, I want shared ViewModel types so that I can ensure type safety when passing data between components.
- **As a developer**, I want well-documented data structures so that I can understand the expected data format for each feature.

---

### 3. Requirements

#### 3.1. Functional Requirements

1. **Data Structure Definitions:**

   - The feature MUST provide IngredientVM type definition with name and emoji properties.
   - The feature MUST provide TagVM type definition with name and color properties.
   - The feature SHOULD provide RecipeVM type definition for future recipe data handling.
   - All type definitions MUST be immutable using readonly properties.

2. **Type Safety:**

   - All properties MUST be strongly typed with appropriate TypeScript types.
   - All properties MUST use readonly modifiers to prevent mutations.
   - Type definitions MUST be exported for use by other features.

3. **Documentation Alignment:**
   - Type definitions MUST align with the documentation in `/workspace/aibd-vibe-specs/1-design/data-structures/`.
   - All types MUST follow the ViewModel naming convention with VM suffix.

#### 3.2. Non-Functional Requirements (NFRs)

- **Maintainability:** Type definitions must be centralized and easy to update.
- **Type Safety:** Must provide compile-time type checking and IntelliSense support.
- **Immutability:** Must prevent accidental data mutations through readonly properties.
- **Documentation:** Must include clear TypeScript type definitions and property descriptions.
- **Consistency:** Must ensure uniform data structures across all application features.

---

### 4. UI (User Interface)

#### 4.1. Design Specification References

**Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/ingredient-vm.md`, `/workspace/aibd-vibe-specs/1-design/data-structures/tag-vm.md`, and `/workspace/aibd-vibe-specs/1-design/data-structures/recipe-vm.md` for type definitions.

**Usage:** Used by IngredientChip, Tag, TagList, AutocompleteDropdown, RecipeSearch, and RecipeDisplay features

#### 4.2. Feature-Specific Implementation

**Type Definitions:** Centralized ViewModel type definitions for ingredient and tag data

**Data Models:**

- **IngredientVM**: Contains name (string) and emoji (string) properties for ingredient display
- **TagVM**: Contains name (string) and color (string) properties for tag categorization
- **RecipeVM**: Contains comprehensive recipe data including ingredients, pro tips, and tags

**Usage Patterns:** Imported by features that handle ingredient or tag data display and interaction

**Immutability:** All properties marked as readonly to prevent accidental mutations

---

### 5. Acceptance Criteria

- [ ] IngredientVM type is defined with readonly name and emoji properties
- [ ] TagVM type is defined with readonly name and color properties
- [ ] RecipeVM type is defined with comprehensive recipe data structure
- [ ] All type definitions use proper TypeScript syntax with readonly modifiers
- [ ] Types are exported and available for import by other features
- [ ] Type definitions align with design documentation specifications
- [ ] All properties are strongly typed (string types for all current properties)
- [ ] Type definitions follow ViewModel naming convention with VM suffix
- [ ] Type definitions prevent mutations through immutability

---

### 6. Directory Structure

#### 6.1. Shared Feature Implementation Structure

```
src/shared/vm-types/
├── ingredient-vm.ts               # IngredientVM type definition
├── tag-vm.ts                      # TagVM type definition
└── recipe-vm.ts                   # RecipeVM type definition (future)
```

**File Explanations:**

- **`ingredient-vm.ts`**: TypeScript type definition for IngredientVM with readonly name and emoji properties
- **`tag-vm.ts`**: TypeScript type definition for TagVM with readonly name and color properties
- **`recipe-vm.ts`**: TypeScript type definition for RecipeVM with comprehensive recipe data structure

---

### 7. Out of Scope

- Business logic implementation (handled by feature components)
- Data validation logic (handled by services)
- Data transformation utilities (handled by individual features)
- API response mapping (handled by data services)
- State management logic (handled by stores)
- Component implementation (handled by UI features)
