# Feature-Level PRD Guideline

This document outlines the requirements for creating and maintaining Product Requirements Documents (PRDs) for all features.

## 1. PRD Requirement

Every feature located under `/src/features/` and every shared feature or component in `/src/shared/` **MUST** have a corresponding PRD file. This PRD serves as the authoritative source of truth for its requirements, scope, and design.

## 2. PRD Storage Location

All PRDs **MUST** be stored in the following directory:
`/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/`

This centralized location ensures that all PRDs are easily accessible for review, planning, and reference.

## 3. Naming Convention

The filename for each PRD **MUST** follow the conventions below.

### Standard Features

For features located in `/src/features/`, the filename **MUST** directly correspond to the name of its associated feature directory.

**Format:** `<feature-directory-name>.md`

**Example:**

- For a feature at `/src/features/user-authentication/`, the PRD file is:
  `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/user-authentication.md`

### Shared Features and Components

For features or components located in `/src/shared/`, the filename **MUST** be prefixed with `shared-`.

**Format:** `shared-<directory-name>.md`

**Example:**

- For a shared component at `/src/shared/data-table/`, the PRD file is:
  `/workspace/aibd-vibe-specs/2-architecture/feature-level-prds/shared-data-table.md`

## 4. Blueprint Reference

The very first line of every PRD file **MUST** declare the blueprint it is based on. This provides immediate context on the type of feature being described.

**Format:**
`Based on: <blueprint-name>`

**Available Blueprints:**
The blueprint name is derived from the directories located in `/workspace/aibd/blueprints/`.

All blueprints in `/workspace/aibd/blueprints/` are enabled and available for use. This ensures that all developers have access to the complete set of blueprints for PRD generation.

**Example:**
A PRD for a new utility feature would start with the following line:

```markdown
Based on: utility
```

## 5. PRD Content

The content of the PRD **MUST** follow the structure defined in the corresponding blueprint's template and checklist, located at:
`/workspace/aibd/blueprints/<blueprint-name>/`

Developers **MUST** use the `feature-level-prds.template.md` as the starting point for their PRD and ensure it passes all checks in the `feature-level-prds.checklist.md`.

### 5.1. Optional Guideline Files

Some blueprints may include additional guideline files that provide common implementation patterns and best practices:

- **`feature-level-prds.guidelines.md`**: Contains common implementation guidelines and patterns that apply to all features using this blueprint
- **Other blueprint-specific guidelines**: Additional guidelines specific to the blueprint's technology stack

**Usage:**

- Reference these guideline files in PRDs to avoid duplicating common implementation details
- Use the guidelines as the authoritative source for implementation patterns
- Focus PRD content on feature-specific requirements rather than common patterns

### 5.2. Implementation Documentation References

Feature-level PRDs **MAY** reference implementation documentation for framework-specific details:

- **Store designs**: Reference `/workspace/aibd-vibe-specs/implementation/` for store patterns, state management, and technical contracts
- **Service contracts**: Reference implementation documentation for framework-specific service interfaces

**Usage:**

- Reference implementation documentation for framework-dependent details
- Keep PRDs focused on feature-specific requirements
- Use implementation docs as the authoritative source for technical contracts

### 5.3. Design Specification Integration

PRDs **MUST NOT** duplicate content from existing design specifications. Instead, they **MUST** reference the authoritative design specifications located in `/workspace/aibd-vibe-specs/1-design/`.

**Required References:**

- **Component Specifications:** Reference `/workspace/aibd-vibe-specs/1-design/components/` for component behavior, inputs, outputs, and states
- **Visual Design:** Reference `/workspace/aibd-vibe-specs/1-design/html-prototypes/` for visual appearance and layout
- **Data Structures:** Reference `/workspace/aibd-vibe-specs/1-design/data-structures/` for type definitions and data models

**PRD Focus Areas:**

- Implementation details (Angular, Tailwind, services)
- Business logic requirements not covered in design specs
- Integration patterns between components
- Testing requirements and acceptance criteria
- Directory structure and file organization
- References to implementation documentation for framework-specific details
