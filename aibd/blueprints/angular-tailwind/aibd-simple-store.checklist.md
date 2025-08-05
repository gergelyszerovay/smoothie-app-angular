# Store Implementation Checklist

This checklist ensures strict compliance with the `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md` guidelines.

## Mandatory Blueprint Compliance

**ALL STORES MUST** follow these patterns without exception:

### ✅ Required Patterns (Non-Negotiable)

- [ ] **signalState()**: MUST use `signalState()` for reactive state management
- [ ] **patchState()**: MUST use `patchState()` for all state updates (no direct signal setters)
- [ ] **Type Aliases**: MUST use `type` definitions, NEVER `interface`
- [ ] **Immutable Types**: MUST use `Readonly` and `readonly` extensively
- [ ] **rxMethod()**: MUST use `rxMethod()` for all reactive effects
- [ ] **tapResponse()**: MUST use `tapResponse()` for HTTP response handling
- [ ] **Computed Selectors**: MUST use `computed()` for derived state
- [ ] **Store Design Type Alias**: MUST create a `[Feature]StoreDesign` type alias defining the complete store interface
- [ ] **Store Implementation**: MUST implement the store design type alias with `implements [Feature]StoreDesign`

### ❌ Forbidden Patterns

- [ ] **Manual Signals**: NO manual `signal()` creation
- [ ] **Direct Setters**: NO direct signal setters (`.set()`, `.update()`)
- [ ] **Interfaces**: NO `interface` declarations for state
- [ ] **Mutable Types**: NO mutable state types
- [ ] **Traditional RxJS**: NO traditional `.subscribe()` patterns
- [ ] **Manual Error Handling**: NO manual error handling without `tapResponse()`
- [ ] **Store Without Design Type**: NO store implementation without a corresponding design type alias

## Implementation Validation

### Store Structure Validation

**✅ CORRECT: Blueprint-compliant store with design type alias**

```typescript
// Store design type alias
export type ExampleStoreDesign = Readonly<{
  // State selectors
  readonly data: Signal<readonly Data[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  // Computed selectors
  readonly hasData: Signal<boolean>;
  readonly hasError: Signal<boolean>;

  // Effects
  readonly loadData: rxMethod<void>;

  // Actions
  clearError(): void;
  selectItem(id: string): void;
}>;

// Store implementation
@Injectable({ providedIn: 'root' })
export class ExampleStore implements ExampleStoreDesign {
  private state = signalState(initialState);

  // State selectors
  readonly data = this.state.data;
  readonly loading = this.state.loading;
  readonly error = this.state.error;

  // Computed selectors
  readonly hasData = computed(() => this.data().length > 0);
  readonly hasError = computed(() => Boolean(this.error()));

  // Effects
  readonly loadData = rxMethod<void>(
    pipe(
      tap(() => patchState(this.state, { loading: true })),
      exhaustMap(() => this.http.get<Data[]>('/api/data').pipe(
        tapResponse({
          next: (data) => patchState(this.state, { data, loading: false }),
          error: (error) => patchState(this.state, { error: error.message, loading: false }),
        })
      ))
    )
  );

  // Actions
  clearError(): void {
    patchState(this.state, { error: null });
  }

  selectItem(id: string): void {
    patchState(this.state, { selectedId: id });
  }
}
```

**❌ INCORRECT: Non-blueprint patterns**

```typescript
@Injectable({ providedIn: 'root' })
export class ExampleStore {
  // ❌ No design type alias
  // ❌ Manual signal creation
  private dataSignal = signal<Data[]>([]);

  // ❌ Direct setters
  loadData(): void {
    this.dataSignal.set([]);
    this.http.get<Data[]>('/api/data').subscribe({
      next: (data) => this.dataSignal.set(data), // ❌ Direct setter
      error: (error) => this.errorSignal.set(error.message) // ❌ Direct setter
    });
  }
}
```

### Type Definition Validation

**✅ CORRECT: Type aliases with immutability**

```typescript
export type Data = Readonly<{
  id: string;
  name: string;
  items: readonly string[];
}>;

export type DataState = Readonly<{
  data: readonly Data[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}>;
```

**❌ INCORRECT: Interfaces and mutable types**

```typescript
export interface Data { // ❌ Interface instead of type
  id: string;
  name: string;
  items: string[]; // ❌ Mutable array
}

export interface DataState { // ❌ Interface instead of type
  data: Data[]; // ❌ Mutable array
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}
```

### Effect Implementation Validation

**✅ CORRECT: rxMethod with tapResponse**

```typescript
readonly loadData = rxMethod<void>(
  pipe(
    tap(() => patchState(this.state, { loading: true, error: null })),
    exhaustMap(() => this.http.get<Data[]>('/api/data').pipe(
      tapResponse({
        next: (data) => patchState(this.state, { data, loading: false }),
        error: (error: HttpErrorResponse) => patchState(this.state, { error: error.message, loading: false }),
        finalize: () => patchState(this.state, { loading: false }),
      })
    ))
  )
);
```

**❌ INCORRECT: Traditional RxJS patterns**

```typescript
loadData(): void { // ❌ Not rxMethod
  this.state.loading.set(true); // ❌ Direct setter
  this.http.get<Data[]>('/api/data').subscribe({ // ❌ Traditional subscribe
    next: (data) => this.state.data.set(data), // ❌ Direct setter
    error: (error) => this.state.error.set(error.message) // ❌ Direct setter
  });
}
```

### Violation: Traditional RxJS

```typescript
// ❌ VIOLATION
this.http.get<Data[]>('/api/data').subscribe({
  next: (data) => this.dataSignal.set(data)
});
```

**Fix:**

```typescript
// ✅ CORRECT
readonly loadData = rxMethod<void>(
  pipe(
    exhaustMap(() => this.http.get<Data[]>('/api/data').pipe(
      tapResponse({
        next: (data) => patchState(this.state, { data }),
      })
    ))
  )
);
```

### Store Design Type Alias Validation

**✅ CORRECT: Complete store design type alias**

```typescript
import { Signal } from '@angular/core';
import { RxMethod } from '@ngrx/signals/rxjs-interop';

export type ExampleStoreDesign = Readonly<{
  // State selectors
  readonly data: Signal<readonly Data[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  // Computed selectors
  readonly hasData: Signal<boolean>;
  readonly hasError: Signal<boolean>;

  // Effects
  readonly loadData: RxMethod<void>;

  // Actions
  clearError(): void;
  selectItem(id: string): void;
}>;
```

**❌ INCORRECT: Missing or incomplete design type alias**

```typescript
// ❌ Missing design type alias entirely
@Injectable({ providedIn: 'root' })
export class ExampleStore {
  // Implementation without design contract
}

// ❌ Incomplete design type alias
export type ExampleStoreDesign = Readonly<{
  readonly data: Signal<readonly Data[]>; // Missing other selectors, effects, actions
}>;
```

## Feature-Specific Validation

### Type Safety

- [ ] All state properties are immutable
- [ ] All DTO types match JSON structure
- [ ] All VM types are UI-ready
- [ ] Proper type conversion between DTO and VM
- [ ] Store design type alias includes all public API members
- [ ] Store implementation correctly implements the design type alias

### Error Handling

- [ ] Consistent error patterns with `tapResponse()`
- [ ] Proper loading state management
- [ ] User-friendly error messages
- [ ] Graceful fallbacks for missing data

### Performance

- [ ] Automatic memoization with `computed()`
- [ ] Efficient change detection
- [ ] Proper cleanup with `rxMethod()`
- [ ] Minimal re-renders

## Resources

- **Blueprint**: `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md`
- **Template**: `/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.template.md`
- **Feature PRDs**: `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/`

This checklist ensures consistent, modern, and maintainable store implementations across all features.
