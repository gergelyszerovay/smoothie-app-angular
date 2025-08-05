# AIBD Architecture

1. Directory structure restrictions:

   - /src/ can only contain "features", "shared" and "assets" directories
   - No additional top-level directories allowed in /src/
   - Feature and shared directories can only contain:
     - Public files in root
     - Single "internal" directory for private code
   - No subdirectories at feature/shared root level (except internal)
   - "internal" directory can contain subdirectories as needed

2. No barrel files:

   - Do not use index.ts files that re-export from other files
   - Import directly from source files

3. No default exports:

   - Use named exports only
   - Do not use default exports in any file

4. Feature-based organization:

   - Features are in /src/features/ with kebab-case naming
   - Each file should contain a single declaration
     - Exception: A function and its parameter type must be in same file
   - File names are the declaration names in kebab-case
   - Public declarations in feature root directory
   - Private code in "internal" directory

5. Cross-feature dependencies:

   - Import from other features' root directory using path aliases only
   - No importing from subdirectories of other features
   - "internal" subdirectory must use relative paths for imports
   - "internal" directories are private and never imported from outside the feature
   - Features must form directed acyclic graph (DAG)
     - Higher-level features can depend on lower-level features
     - Lower-level features cannot depend on higher-level features
     - No circular dependencies between features

6. Shared code organization:

   - Three patterns for shared code:
     1. Shared utilities/types: In subdirectories by domain with descriptive names (validation/, formatting/, api-client/, etc.)
     2. Shared UI components: Top level of shared directory
     3. Shared features: Top level of shared directory for business logic

7. Shared code criteria:

   - Use shared/ when code:
     - Is used by multiple features
     - Has no feature-specific dependencies
     - Is generic and technical
     - Represents cross-cutting concerns
   - Keep in features when code:
     - Is used by only one feature
     - Contains feature-specific business logic
     - Changes with feature requirements
     - Has feature-specific dependencies

8. Shared import rules:

   - Use path aliases for shared imports
   - Never import from internal directory of shared component/feature
   - Each shared UI component and feature needs its own PRD
