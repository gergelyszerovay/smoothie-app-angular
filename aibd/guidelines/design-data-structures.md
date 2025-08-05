# Data Structure Guidelines

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

## 1. Introduction

This document provides guidelines for defining and documenting data structures used throughout the application. We distinguish between two main types of data structures: Data Transfer Objects (DTOs) and ViewModels (VMs). Consistent data modeling is crucial for predictable state management and clear communication between components.

## 2. Data Structure Types

### 2.1 Data Transfer Objects (DTOs)

DTOs represent the raw data structures that match external data sources (JSON files, APIs, etc.). They are the exact representation of data as it exists in the source.

**Characteristics:**

- Match external data structure exactly
- Used for data loading and serialization
- Stored in the same directory as the store that uses them
- Suffixed with `DTO`

**Example:**

```typescript
export type UserDTO = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};
```

### 2.2 ViewModels (VMs)

VMs represent data structures optimized for UI consumption. They may be enriched with additional data or transformed for better UI presentation.

**Characteristics:**

- Optimized for UI display and interaction
- May combine data from multiple sources
- Stored in dedicated feature directories
- Suffixed with `VM`

**Example:**

```typescript
export type UserVM = UserDTO; // Simple type alias
export type UserProfileVM = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar: string; // Enriched with avatar data
  readonly permissions: readonly PermissionVM[]; // Combined from multiple sources
};
```

## 3. Immutability

Data structures **SHOULD** be immutable.

1.  **Rationale:** Using immutable data structures prevents accidental side effects and makes state changes explicit and predictable. This is a core principle for ensuring the application is maintainable and scalable.
2.  **Implementation:** In TypeScript, this **SHOULD** be enforced by using the `readonly` keyword for all properties and for arrays (e.g., `readonly string[]`).

**Example:**

```typescript
export type TagVM = {
  readonly name: string;
  readonly color: string;
};
```

## 4. Naming Conventions

### 4.1 DTO Naming

DTOs **MUST** be suffixed with `DTO` (Data Transfer Object).

**Examples:**

- `UserDTO` for raw user data from API
- `ProductDTO` for raw product data from JSON
- `OrderDTO` for raw order data from database

### 4.2 VM Naming

VMs **MUST** be suffixed with `VM` (ViewModel).

**Examples:**

- `UserVM` for user data displayed in the UI
- `ProductVM` for product data displayed in the UI
- `OrderVM` for order data displayed in the UI

## 5. Documentation

1.  Every data structure used by the application **MUST** be documented in a dedicated markdown file within the `/workspace/aibd-vibe-specs/1-design/data-structures/` directory.
2.  Each documentation file **SHOULD** include:
    - A brief description of the data structure's role.
    - A table defining each property, its type, and a description.
    - A TypeScript type definition showing the immutable structure.
3.  Documentation **SHOULD** clearly indicate whether the structure is a DTO or VM and its relationship to external data sources.

## 6. Storage Locations

### 6.1 DTO Storage

DTOs **MUST** be stored in the same directory as the store that uses them. The store and its types are usually in the `internal` subdirectory. This ensures that the data structures are close to where they are consumed and makes the relationship between data and business logic clear.

**Example:**

```
src/features/user-management/
├── user-management-container.ts
└── internal/
    ├── user-management-store.ts
    ├── user-dto.ts
    ├── permission-dto.ts
    └── role-dto.ts
```

### 6.2 VM Storage

VMs **MUST** be stored in dedicated feature directories. This separates UI-specific data structures from business logic and makes them reusable across components.

**Example:**

```
src/shared/vm-types/
├── user-vm.ts
├── product-vm.ts
└── order-vm.ts
```

## 7. Normalization

Data **SHOULD** be normalized where appropriate.

1.  **Rationale:** Normalization avoids data duplication and ensures that there is a single source of truth for each piece of information. For example, instead of embedding full `UserVM` objects inside a `TeamVM` object, the `TeamVM` can store an array of user IDs, and a separate, top-level state slice can manage the master list of all users.
2.  **Flexibility:** This is a "SHOULD", not a "MUST". For simple applications or where data is not relational, denormalization is acceptable. The decision **SHOULD** be made based on the complexity of the data and the needs of the application.
