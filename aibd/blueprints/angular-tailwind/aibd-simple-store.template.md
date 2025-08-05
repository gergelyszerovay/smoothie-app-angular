# Store Design Template

> **IMPORTANT:** This template is for store design documentation. It MUST NOT contain the implementation details of selectors, updaters, or effects—**only their signatures**. Implementation code belongs in the actual TypeScript store file, not in the design doc.

This template defines the store design for features implementing the AIBD Simple Store pattern.

## Store Overview

The [FEATURE_NAME] store manages [DESCRIBE_STATE_MANAGEMENT] including:

- [LIST_MAIN_STATE_AREAS]
- [LIST_BUSINESS_LOGIC_AREAS]
- [LIST_UI_STATE_AREAS]

## Type Definitions

### DTO Types (Raw Data)

```typescript
// [ENTITY] DTO - matches [JSON_FILE].json structure
export type [ENTITY]DTO = Readonly<{
  [PROPERTY]: [TYPE];
  [PROPERTY]: [TYPE];
  // ... additional properties
}>;
```

### VM Types (UI-Ready Data)

```typescript
// [ENTITY] VM - [DESCRIBE_CONVERSION_OR_ALIAS]
export type [ENTITY]VM = Readonly<{
  [PROPERTY]: [TYPE];
  [PROPERTY]: [TYPE];
  // ... additional properties
}>;
```

### Store State

```typescript
export type [FEATURE]State = Readonly<{
  // Data collections (VM types for UI)
  [COLLECTION]: readonly [ENTITY]VM[];

  // [STATE_CATEGORY]
  [STATE_PROPERTY]: [TYPE];

  // Application lifecycle
  loading: boolean;
  error: string | null;
  isReady: boolean;
}>;

const initial[FEATURE]State: [FEATURE]State = {
  [COLLECTION]: [],
  [STATE_PROPERTY]: [INITIAL_VALUE],
  loading: false,
  error: null,
  isReady: false,
} as const;
```

## Store API Signatures

> **NOTE:** Only include the signatures of selectors, computed selectors, effects, and updaters below. Do NOT include implementation details or code bodies.

### Store Design Type Alias

```typescript
import { Signal } from '@angular/core';
import { RxMethod } from '@ngrx/signals/rxjs-interop';

/**
 * [FEATURE] Store Design
 *
 * Type alias defining the complete interface for the [FEATURE] store.
 * This type describes all selectors, computed selectors, effects, and actions
 * that the [FEATURE]Store class must implement.
 */
export type [FEATURE]StoreDesign = Readonly<{
  // State Selectors - Direct access to state slices
  readonly [COLLECTION]: Signal<readonly [ENTITY]VM[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly isReady: Signal<boolean>;

  // Computed Selectors - Derived state with memoization
  readonly has[COLLECTION]: Signal<boolean>;
  readonly hasError: Signal<boolean>;

  // Effects (RxMethod) - Reactive operations
  readonly initialize: RxMethod<void>; // Loads all application data

  // Actions - Synchronous state updates
  clearError(): void;
  update[PROPERTY]([PARAMETER]: [TYPE]): void;
}>;

/**
 * [FEATURE] Store Implementation
 *
 * Concrete implementation of the [FEATURE]StoreDesign type alias.
 */
@Injectable({ providedIn: 'root' })
export class [FEATURE]Store implements [FEATURE]StoreDesign {
  private state = signalState(initial[FEATURE]State);

  // Implementation of all selectors, computed selectors, effects, and actions
}
```

## Data Conversion Strategy

### DTO to VM Conversion

1. **[ENTITY]DTO → [ENTITY]VM**: [DESCRIBE_CONVERSION_STRATEGY]
2. **[ADDITIONAL_CONVERSIONS]**: [DESCRIBE_CONVERSION_STRATEGY]

### Conversion Benefits

- **Type Safety**: Strong typing throughout the conversion process
- **Data Enrichment**: [DESCRIBE_ENRICHMENT]
- **UI Ready**: [DESCRIBE_UI_OPTIMIZATION]
- **Performance**: Computed selectors provide efficient derived state

## Implementation Validation

**For comprehensive validation checklists and enforcement rules, see:** `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.checklist.md`

### [FEATURE] Specific Validation

- [ ] [ENTITY] data fetching from `/api/[ENDPOINT]` works correctly
- [ ] DTO to VM conversion [DESCRIBE_VALIDATION]
- [ ] Error handling provides user-friendly messages
- [ ] Loading states provide appropriate visual feedback
- [ ] [ADDITIONAL_FEATURE_SPECIFIC_VALIDATION]

## Usage in Components (Example)

```typescript
@Component({
  selector: 'app-[FEATURE]',
  template: `
    @if (store.loading()) {
      <app-loading-spinner />
    } @else if (store.hasError()) {
      <app-error-message [error]="store.error()" (retry)="handleRetry()" />
    } @else {
      <app-[FEATURE]-content [data]="store.[COLLECTION]()" />
    }
  `,
})
export class [FEATURE]Component implements OnInit {
  protected store = inject([FEATURE]Store);

  ngOnInit(): void {
    this.store.initialize();
  }

  protected handleRetry(): void {
    this.store.clearError();
    this.store.initialize();
  }
}
```

## Template Usage Instructions

1. Replace all `[PLACEHOLDER]` values with actual feature-specific content
2. Follow the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` guidelines
3. Validate implementation against `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.checklist.md`
4. **Do NOT include implementation details of selectors, updaters, or effects—only their signatures**
5. Customize type definitions, state structure, and business logic for your feature
6. Implement proper error handling and loading states
7. Implement proper error handling and loading states
