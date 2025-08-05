# Feature-Level PRD Implementation Guidelines

This document contains the common implementation guidelines and patterns that apply to all feature-level PRDs for Angular and Tailwind CSS projects.

## Implementation Guidelines

### Angular Implementation

All features **MUST** implement the design components using Angular and Tailwind CSS:

- **Component Structure:** Create Angular components that match the design specifications
- **Single-File Components:** Prefer single-file components with inline template and styles
- **Component File Structure:** Use separate HTML/CSS files only for components with >50 lines template or >100 lines styles
- **Smart Component Naming:** Use "-container" suffix for smart components (components with state management or services)
- **Store Integration:** Smart components may use stores following the guidelines in `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md`
- **Tailwind Styling:** Use Tailwind utility classes as the primary styling approach
- **Custom CSS:** Use component CSS files only for design elements not achievable with Tailwind utilities
- **Responsive Design:** Implement responsive behavior using Tailwind's responsive utilities
- **Accessibility:** Ensure proper ARIA attributes and keyboard navigation as specified in design

### State Management

- **Signal-Based State:** Use signal-based state management for reactive updates
- **OnPush Change Detection:** Use OnPush change detection strategy for performance
- **AIBD Simple Store:** For complex state management, use AIBD Simple Store Pattern containing business logic
- **Component State:** Handle local component state internally with signals

### Service Layer

- **Business Logic:** Services handle data management and business logic
- **Data Fetching:** Services coordinate data fetching from various sources (e.g., `/assets/` folder, APIs)
- **Data Management:** Services manage data processing, filtering, and validation

### Integration Patterns

- **Component Coordination:** Components coordinate with parent components for data and events
- **Design Specification Compliance:** All components must implement design specifications
- **No Input/Output Duplication:** Do not specify component inputs and outputs (covered in design specs)

### File Structure

#### Feature Components (Non-Shared)

```
src/features/[feature-name-slug]/
├── [component-name].ts            # Angular component with inline template and styles.
├── [component-name].spec.ts       # Component unit tests.
├── [service-name].ts              # Service for data management.
├── [service-name].spec.ts         # Service unit tests.
├── [store-name].ts                # Signal-based state management.
├── [store-name].spec.ts           # Store unit tests.
├── [type-name].ts                 # Feature-specific types.
├── [state-type-name].ts           # State type definitions.
└── internal/                      # Private code not imported from outside the feature.
    ├── [private-declaration].ts   # Private declarations with meaningful names.
    └── [another-private].ts       # Additional private declarations as needed.
```

#### Shared Components

```
src/shared/[shared-feature-name]/
├── [declaration-name].ts                   # Reusable Angular component with inline template and styles.
├── [declaration-name].spec.ts              # Component unit tests.
├── [service-name].ts                       # Shared service if needed.
└── [service-name].spec.ts                  # Service unit tests.
```

### File Naming Conventions

**Note:** File names are the declaration names in kebab-case. Each file should contain a single declaration. For example, a `RecipeSearch` component would be in `recipe-search.ts`. Public declarations are in the feature root directory, private code goes in the `internal/` directory.

- **Component Files:** `[component-name].ts` and `[component-name].spec.ts`
- **Service Files:** `[service-name].ts` and `[service-name].spec.ts`
- **Store Files:** `[store-name].ts` and `[store-name].spec.ts`
- **Type Files:** `[type-name].ts` for feature-specific types
- **State Files:** `[state-type-name].ts` for state type definitions

### Performance Considerations

- **Signal-Based Updates:** Use signals for reactive state management
- **OnPush Strategy:** Implement OnPush change detection for performance
- **Minimal Re-renders:** Design components to minimize unnecessary re-renders
- **Efficient Data Flow:** Optimize data flow between components

### Accessibility Requirements

- **ARIA Attributes:** Include proper ARIA attributes as specified in design
- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
- **Screen Reader Support:** Provide proper semantic markup for screen readers
- **Focus Management:** Implement proper focus management for modal and dropdown interactions

### Responsive Design

- **Tailwind Utilities:** Use Tailwind's responsive utilities for different screen sizes
- **Mobile-First:** Design for mobile devices first, then enhance for larger screens
- **Touch-Friendly:** Ensure touch-friendly interaction areas on mobile devices
- **Flexible Layouts:** Implement flexible layouts that adapt to different screen sizes
