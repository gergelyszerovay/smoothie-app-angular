# AIBD Simple Store Pattern

## Store Pattern Overview

A modern, reactive store pattern using [@ngrx/signals](https://ngrx.io/guide/signals/signal-state):

- **signalState()**: Type-safe state management with automatic change detection
- **patchState()**: Immutable state updates
- **Type aliases**: No interfaces, only type definitions
- **Immutable types**: Using `Readonly` and utility types
- **Computeds**: Derived state with automatic memoization
- **rxMethod()**: Reactive effects with proper cleanup
- **tapResponse()**: Clean HTTP response handling

## Core Store Structure

### Basic Store Template

```typescript
// stores/user.store.ts
import { signalState, patchState } from "@ngrx/signals";
import { computed, inject, Injectable } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { RxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { switchMap, pipe, debounceTime, tap, exhaustMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

// 🔸 TYPE DEFINITIONS: Use type aliases with immutable types
export type User = Readonly<{
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  isActive: boolean;
}>;

export type UserState = Readonly<{
  users: readonly User[];
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}>;

const initialUserState: UserState = {
  users: [],
  selectedUserId: null,
  loading: false,
  error: null,
  lastUpdated: null,
} as const;

/**
 * User Store Design
 *
 * Type alias defining the complete interface for the user store.
 * This type describes all selectors, computed selectors, effects, and actions
 * that the UserStore class must implement.
 */
export type UserStoreDesign = Readonly<{
  // State Selectors - Direct access to state slices
  readonly users: Signal<readonly User[]>;
  readonly selectedUserId: Signal<string | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  // Computed Selectors - Derived state with memoization
  readonly selectedUser: Signal<User | null>;
  readonly userCount: Signal<number>;
  readonly hasUsers: Signal<boolean>;
  readonly hasError: Signal<boolean>;

  // Effects (RxMethod) - Reactive operations
  readonly loadUsers: RxMethod<void>;
  readonly createUser: RxMethod<Omit<User, "id" | "createdAt">>;
  readonly updateUser: RxMethod<{ id: string; updates: Partial<User> }>;
  readonly deleteUser: RxMethod<string>;

  // Actions - Synchronous state updates
  selectUser(userId: string | null): void;
  clearError(): void;
}>;

/**
 * User Store Implementation
 *
 * Concrete implementation of the UserStoreDesign type alias.
 */
@Injectable({ providedIn: "root" })
export class UserStore implements UserStoreDesign {
  private http = inject(HttpClient);
  private logger = inject(Logger);

  // 🔸 SIGNAL STATE: Create reactive state
  private state = signalState(initialUserState);

  // 🔸 STATE SELECTORS: Direct access to state slices
  readonly users = this.state.users;
  readonly loading = this.state.loading;
  readonly error = this.state.error;

  // 🔸 COMPUTED SELECTORS: Derived state with memoization
  readonly selectedUser = computed(() => {
    const userId = this.state.selectedUserId();
    return userId ? (this.users().find((u) => u.id === userId) ?? null) : null;
  });

  readonly userCount = computed(() => this.users().length);
  readonly hasUsers = computed(() => this.users().length > 0);
  readonly hasError = computed(() => Boolean(this.error()));

  // 🔸 RXMETHOD EFFECTS: Complete CRUD operations
  readonly loadUsers = rxMethod<void>(
    pipe(
      tap(() => this.state.loading.set(true)),
      exhaustMap(() =>
        this.http.get<User[]>('/api/users').pipe(
          tapResponse({
            next: (users) => this.state.users.set(users),
            error: (error: HttpErrorResponse) => this.logError(error.message),
            finalize: () => this.state.loading.set(false),
          })
        )
      )
    )
  );

  readonly createUser = rxMethod<Omit<User, "id" | "createdAt">>(
    pipe(
      tap(() => this.state.loading.set(true)),
      exhaustMap((userData) =>
        this.http.post<User>('/api/users', userData).pipe(
          tapResponse({
            next: (newUser) => {
              this.state.users.update(users => [...users, newUser]);
              this.state.selectedUserId.set(newUser.id);
              this.state.lastUpdated.set(new Date());
            },
            error: (error: HttpErrorResponse) => this.logError(error.message),
            finalize: () => this.state.loading.set(false),
          })
        )
      )
    )
  );

  readonly updateUser = rxMethod<{ id: string; updates: Partial<User> }>(
    pipe(
      tap(() => this.state.loading.set(true)),
      exhaustMap(({ id, updates }) =>
        this.http.put<User>(`/api/users/${id}`, updates).pipe(
          tapResponse({
            next: (updatedUser) => {
              this.state.users.update(users =>
                users.map(u => u.id === id ? updatedUser : u)
              );
              this.state.lastUpdated.set(new Date());
            },
            error: (error: HttpErrorResponse) => this.logError(error.message),
            finalize: () => this.state.loading.set(false),
          })
        )
      )
    )
  );

  readonly deleteUser = rxMethod<string>(
    pipe(
      tap(() => this.state.loading.set(true)),
      exhaustMap((userId) =>
        this.http.delete(`/api/users/${userId}`).pipe(
          tapResponse({
            next: () => {
              this.state.users.update(users => users.filter(u => u.id !== userId));
              this.state.selectedUserId.update(selectedId =>
                selectedId === userId ? null : selectedId
              );
              this.state.lastUpdated.set(new Date());
            },
            error: (error: HttpErrorResponse) => this.logError(error.message),
            finalize: () => this.state.loading.set(false),
          })
        )
      )
    )
  );

  // 🔸 SYNCHRONOUS ACTIONS: State updates
  selectUser(userId: string | null): void {
    patchState(this.state, { selectedUserId: userId });
  }

  clearError(): void {
    patchState(this.state, { error: null });
  }

  private logError(message: string): void {
    this.state.error.set(message);
    this.logger.error("Store operation failed", { message });
  }
}
```

## RxJS Operator Guidelines

### Understanding RxJS Operators for Data Fetching

Different RxJS operators handle multiple emissions in different ways. Choose the right operator based on your use case:

#### `switchMap` - "I only care about the latest"

- **Behavior**: Cancels previous emissions when a new one arrives
- **Use case**: Search inputs, navigation, real-time updates
- **Example**: User types "hello" quickly - only "hello" request completes

```typescript
// ✅ GOOD: Search with switchMap
readonly searchUsers = rxMethod<string>(
  pipe(
    debounceTime(300),
    switchMap((query) =>
      this.http.get<User[]>(`/api/users/search?q=${query}`).pipe(
        tapResponse({
          next: (results) => this.state.searchResults.set(results),
          error: (error: HttpErrorResponse) => this.logError(error.message),
        })
      )
    )
  )
);
```

#### `exhaustMap` - "I only care about the first"

- **Behavior**: Ignores new emissions while processing a current one
- **Use case**: Form submissions, button clicks, data loading
- **Example**: User clicks submit button multiple times - only first click processed

```typescript
// ✅ GOOD: Form submission with exhaustMap
readonly submitForm = rxMethod<FormData>(
  pipe(
    tap(() => this.state.loading.set(true)),
    exhaustMap((formData) =>
      this.http.post<SubmissionResult>('/api/submit', formData).pipe(
        tapResponse({
          next: (result) => this.state.submissionResult.set(result),
          error: (error: HttpErrorResponse) => this.logError(error.message),
          finalize: () => this.state.loading.set(false),
        })
      )
    )
  )
);
```

#### `mergeMap` - "I want all of them"

- **Behavior**: Processes all emissions concurrently
- **Use case**: Parallel operations, file uploads, batch processing
- **Example**: Multiple file uploads - all start immediately

```typescript
// ✅ GOOD: Parallel file uploads with mergeMap
readonly uploadFiles = rxMethod<readonly File[]>(
  pipe(
    mergeMap((files) =>
      from(files).pipe(
        mergeMap((file) => {
          const formData = new FormData();
          formData.append('file', file);
          return this.http.post<UploadResult>('/api/upload', formData).pipe(
            tapResponse({
              next: (uploadResult) => this.state.uploadedFiles.update(files => [...files, uploadResult]),
              error: (error: HttpErrorResponse) => this.logError(error.message),
            })
          );
        })
      )
    )
  )
);
```

#### `concatMap` - "I want them in order"

- **Behavior**: Processes emissions sequentially
- **Use case**: Sequential API calls, ordered operations
- **Example**: Each call waits for the previous one to complete

```typescript
// ✅ GOOD: Sequential operations with concatMap
readonly processOrders = rxMethod<readonly Order[]>(
  pipe(
    concatMap((orders) =>
      from(orders).pipe(
        concatMap((order) =>
          this.http.post<ProcessResult>(`/api/orders/${order.id}/process`, {}).pipe(
            tapResponse({
              next: (result) => this.state.processedOrders.update(orders => [...orders, result]),
              error: (error: HttpErrorResponse) => this.logError(error.message),
            })
          )
        )
      )
    )
  )
);
```

### Operator Selection Guide

| Use Case                  | Operator     | When to Use                                |
| ------------------------- | ------------ | ------------------------------------------ |
| **Search/Filter**         | `switchMap`  | User types quickly, only care about latest |
| **Form Submission**       | `exhaustMap` | Prevent duplicate submissions              |
| **Data Loading**          | `exhaustMap` | Prevent multiple simultaneous loads        |
| **File Uploads**          | `mergeMap`   | Upload multiple files in parallel          |
| **Sequential Operations** | `concatMap`  | Process items in order                     |
| **Real-time Updates**     | `switchMap`  | Only care about latest update              |
| **Batch Processing**      | `mergeMap`   | Process all items concurrently             |

### tapResponse Pattern

**✅ DO: Use tapResponse for clean HTTP response handling**

```typescript
// ✅ GOOD: Clean HTTP response handling
readonly loadData = rxMethod<void>(
  pipe(
    tap(() => this.state.loading.set(true)),
    exhaustMap(() =>
      this.http.get<Data[]>('/api/data').pipe(
        tapResponse({
          next: (data) => this.state.data.set(data),
          error: (error: HttpErrorResponse) => this.logError(error.message),
          finalize: () => this.state.loading.set(false),
        })
      )
    )
  )
);
```

**Benefits of tapResponse:**

- **Clean separation**: Success, error, and completion in one place
- **Type safety**: Proper typing for HTTP errors
- **Consistent pattern**: Same structure across all HTTP operations
- **Automatic cleanup**: Finalize always runs regardless of success/error

## Store Guidelines

- Use immutable type aliases\*\*
- AVOID: Interfaces or mutable types\*\*

### 2. SignalState with Immutable Updates

**✅ DO: Use signalState and patchState**

```typescript
@Injectable({ providedIn: "root" })
export class ProductStore {
  private http = inject(HttpClient);
  private state = signalState<ProductState>({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  });

  // Direct state access
  readonly products = this.state.products;
  readonly loading = this.state.loading;

  // Immutable updates
  addProduct(product: Product): void {
    patchState(this.state, {
      products: [...this.products(), product],
    });
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    patchState(this.state, {
      products: this.products().map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  }
}
```

### 3. Computed Selectors

**✅ DO: Create efficient computed selectors**

```typescript
export class OrderStore {
  private http = inject(HttpClient);
  private state = signalState<OrderState>(initialState);

  readonly orders = this.state.orders;
  readonly filters = this.state.filters;

  // Simple computed selectors
  readonly orderCount = computed(() => this.orders().length);
  readonly hasOrders = computed(() => this.orders().length > 0);

  // Complex computed with proper dependencies
  readonly filteredOrders = computed(() => {
    const orders = this.orders();
    const filters = this.filters();

    return orders.filter((order) => {
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      if (filters.dateRange) {
        const orderDate = new Date(order.createdAt);
        if (orderDate < filters.dateRange.start || orderDate > filters.dateRange.end) {
          return false;
        }
      }
      return true;
    });
  });

  // Derived calculations
  readonly totalRevenue = computed(() => this.filteredOrders().reduce((sum, order) => sum + order.total, 0));

  readonly averageOrderValue = computed(() => {
    const orders = this.filteredOrders();
    return orders.length > 0 ? this.totalRevenue() / orders.length : 0;
  });
}
```

### 4. Component Integration

**✅ DO: Inject stores in smart components**

```typescript
@Component({
  selector: "app-user-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (userStore.loading()) {
      <app-loading-spinner />
    } @else if (userStore.hasError()) {
      <app-error-message [error]="userStore.error()" (retry)="handleRetry()" />
    } @else {
      <app-user-grid [users]="userStore.users()" [selectedUser]="userStore.selectedUser()" (userSelected)="userStore.selectUser($event)" />
    }
  `,
})
export class UserListComponent implements OnInit {
  protected userStore = inject(UserStore);

  ngOnInit(): void {
    this.userStore.loadUsers();
  }

  protected handleRetry(): void {
    this.userStore.clearError();
    this.userStore.loadUsers();
  }
}
```

## Store Organization Guidelines

### 1. Store Naming Conventions

- **Store class**: `UserStore`, `ProductStore`
- **Store file**: `user-store.ts`, `product-store.ts`
- **State type**: `UserState`, `ProductState`
- **Entity type**: `User`, `Product`, `Order`

### 2. Store Design Type Alias Pattern

**✅ DO: Create a type alias defining the complete store interface**

```typescript
/**
 * User Store Design
 *
 * Type alias defining the complete interface for the user store.
 * This type describes all selectors, computed selectors, effects, and actions
 * that the UserStore class must implement.
 */
export type UserStoreDesign = Readonly<{
  // State Selectors - Direct access to state slices
  readonly users: Signal<readonly User[]>;
  readonly selectedUserId: Signal<string | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  // Computed Selectors - Derived state with memoization
  readonly selectedUser: Signal<User | null>;
  readonly userCount: Signal<number>;
  readonly hasUsers: Signal<boolean>;
  readonly hasError: Signal<boolean>;

  // Effects (rxMethod) - Reactive operations
  readonly loadUsers: rxMethod<void>;
  readonly createUser: rxMethod<Omit<User, "id" | "createdAt">>;
  readonly updateUser: rxMethod<{ id: string; updates: Partial<User> }>;
  readonly deleteUser: rxMethod<string>;

  // Actions - Synchronous state updates
  selectUser(userId: string | null): void;
  clearError(): void;
}>;

/**
 * User Store Implementation
 *
 * Concrete implementation of the UserStoreDesign type alias.
 */
@Injectable({ providedIn: "root" })
export class UserStore implements UserStoreDesign {
  private state = signalState(initialUserState);

  // Implementation of all selectors, computed selectors, effects, and actions
}
```

**Benefits of the Store Design Type Alias:**

- **Complete Contract**: Defines the entire store API in one place
- **Type Safety**: Ensures the store implementation matches the design
- **Documentation**: Serves as living documentation of the store's interface
- **Maintainability**: Single source of truth for the store's public API
- **IDE Support**: Provides excellent IntelliSense and type checking

### 3. Store Scope Guidelines

- **Feature Store**: Manages state for a specific feature/domain
- **Global Store**: Manages application-wide state (auth, theme, settings)
- **Page Store**: Manages state for complex pages with multiple components
- **Widget Store**: Manages state for reusable widget components

## Best Practices Summary

1. **Use Type Aliases**: Always prefer `type` over `interface` for state definitions
2. **Embrace Immutability**: Use `Readonly` and `readonly` extensively
3. **Signal State**: Use `signalState()` for reactive state management
4. **Patch Updates**: Always use `patchState()` for immutable updates
5. **Computed Selectors**: Leverage `computed()` for derived state
6. **RxMethod Effects**: Use `rxMethod()` for complex reactive operations
7. **tapResponse Pattern**: Use `tapResponse()` for clean HTTP response handling
8. **Choose Right Operators**: Use appropriate RxJS operators for your use case
9. **Error Handling**: Implement consistent error patterns across stores
10. **Testing**: Write comprehensive tests for store behavior
11. **Organization**: Structure stores by business domain
12. **Performance**: Leverage automatic memoization and change detection

This pattern provides a simple, scalable approach to state management that leverages `@ngrx/signals` modern reactive primitives while maintaining clean architecture patterns and type safety.
