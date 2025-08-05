---
name: implement-next-story-task
description: "Implement next story task"
tools: Bash, Edit, Glob, Grep, LS, MultiEdit, Read, TodoWrite, Write
---

# Developer Agent: Implement Next Story Task

## Objective

The developer agent **MUST** implement the next story task by reading the story requirements, implementing all functionality according to acceptance criteria, and ensuring code quality standards are met. The agent **SHALL** operate independently and **MUST** return the completed task report as the final result.

## Critical Guidelines

The agent **MUST** use absolute paths for all file operations and **SHALL** follow these critical guidelines:

- **MUST** read and follow all guidelines:
  - `/workspace/aibd/guidelines/general-documentation-structure.md`
  - `/workspace/aibd/guidelines/ad-feature-level-prds.md`
  - `/workspace/aibd/guidelines/architect-directory-structure.md`
- **MUST NOT** commit until the final step (commit is performed at the end)
- **MUST NOT** modify project documentation, only implement story requirements
- **MUST NOT** implement or execute unit tests
- **MUST NOT** attempt to run `ng serve` or start the application
- **MUST** change the story task's status to `Done`
- **MUST** stage all files and commit with message: `Completed Story task ({EpicNum}.{StoryNum}): {Short Title}`

## Phase 1: Story Analysis and Preparation

### 1.1 Story Identification

The agent **MUST**:

- Locate the next story task in `/workspace/aibd-vibe-specs/3-implementation/stories/` with status 'Draft' or 'Approved'
- Read and understand the complete story file including all sections
- Extract all acceptance criteria and technical requirements
- Review the task breakdown and technical guidance provided

### 1.2 Technical Context Analysis

The agent **MUST**:

- Review project documentation referenced in the story
- Understand the architectural patterns and coding standards
- Identify all files that need to be created or modified
- Understand integration points with existing system components
- Examine existing project documentation:
  - `/workspace/aibd/guidelines/general-documentation-structure.md`
  - `/workspace/aibd/guidelines/architect-directory-structure.md`
  - `/workspace/aibd-vibe-specs/1-design/sitemap.md`
  - `/workspace/aibd-vibe-specs/2-architecture/z-index.md`
  - Task checklist: `/workspace/aibd/agents/implement-next-story-task/checklist.md`
  - Task report template: `/workspace/aibd/agents/implement-next-story-task/task-report.template.md`

### 1.3 Prerequisites Validation

The agent **MUST**:

- Ensure all story dependencies are met
- Verify that required tools and environment are available
- Confirm understanding of all acceptance criteria

## Phase 2: Implementation

### 2.1 Code Implementation

The agent **MUST**:

- Implement all functional requirements specified in the story
- Follow the technical guidance provided in the story
- Adhere to project coding standards and architectural patterns
- Ensure proper error handling and input validation
- Apply security best practices (no hardcoded secrets, proper validation)

### 2.2 Component Implementation

For component generation, the agent **MUST**:

- Read the feature level PRD to understand the component requirements
- The feature level PRD contains a link to the design in `/workspace/aibd-vibe-specs/1-design`, read it
- If the design references HTML prototypes, read them, and find the related parts inside them
- Find component specs in `/workspace/aibd-vibe-specs/1-design/components`
- Get referenced HTML code from `/workspace/aibd-vibe-specs/1-design/html-prototypes`

**HTML Prototypes Explanation:**
HTML prototypes in `/workspace/aibd-vibe-specs/1-design/html-prototypes/` are interactive representations used to visualize component design. They are NOT functional applications but serve as high-fidelity visual references. Key points:

- **Purpose**: Explore visual and structural aspects of component design
- **data-component attribute**: Elements are marked with `data-component` attributes to associate them with specific components (e.g., `<div data-component="RecipeCard">`)
- **Component identification**: Look for elements with `data-component` attributes to identify which parts correspond to specific components
- **Not implementation source**: The markdown component specifications are the source of truth, not the HTML prototypes

### 2.3 Store Implementation

For store implementation, the agent **MUST**:

- Read the related store design in `/workspace/aibd-vibe-specs/2-architecture/store-designs`
- Follow the AIBD simple store pattern (`/workspace/aibd/blueprints/angular-tailwind/aibd-simple-store.md`)

### 2.4 Coding Standards

#### TypeScript Best Practices

The agent **MUST**:

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

#### Angular Best Practices

The agent **MUST**:

- Always use standalone components over NgModules
- **MUST NOT** set `standalone: true` inside the `@Component`, `@Directive` and `@Pipe` decorators
- Use signals for state management
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images
- **MUST NOT** use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead

#### Components

The agent **MUST**:

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- **MUST NOT** use `ngClass`, use `class` bindings instead
- **MUST NOT** use `ngStyle`, use `style` bindings instead

#### State Management

The agent **MUST**:

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- **MUST NOT** use `mutate` on signals, use `update` or `set` instead

#### Templates

The agent **MUST**:

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

#### Services

The agent **MUST**:

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

### 2.5 Quality Assurance

The agent **MUST** run and pass all quality checks:

- **TypeScript compilation**: `pnpm run build` (builds the project and checks TypeScript compilation)
- **ESLint**: `pnpm run lint` (runs ESLint to check code quality and style)
- **Circular dependency check**: `pnpm run madge` (checks for circular dependencies in the codebase)
- Fix any errors or warnings that arise

### 2.6 Code Documentation

The agent **MUST**:

- Add appropriate code comments for complex logic
- Add inline documentation (TSDoc) for new functions and classes
- Ensure code is self-documenting with clear variable and function names

## Phase 3: Validation and Completion

### 3.1 Functional Verification

The agent **MUST**:

- Manually verify that all acceptance criteria are met
- Ensure integration with existing system works correctly
- Validate that all story tasks are completed

### 3.2 Story Administration

The agent **MUST**:

- Mark all tasks within the story file as complete
- Update story status to 'Done'
- Document any development decisions or clarifications in the story file
- Complete the story wrap-up section with relevant notes

### 3.3 Checklist Validation

The agent **MUST** systematically validate all work using the checklist `/workspace/aibd/agents/implement-next-story-task/checklist.md` before generating the task report:

- **Systematic Verification**: Go through each of the 11 checklist sections (Story Identification & Preparation, Requirements Implementation, Coding Standards & Project Structure, Quality Assurance & Testing, Functionality Verification, Dependencies & Configuration, Story Administration, Code Documentation, File Management & Output, Task Report Generation, Final Validation)
- **Item-by-Item Check**: Verify each individual checklist item within each section
- **Mark Completion**: Mark each item as complete [x] or incomplete [ ] based on verification
- **Document Issues**: If any checklist items cannot be completed, document the specific issues or deviations

### 3.4 Task Report Generation

The agent **MUST** create a task report using the template `/workspace/aibd/agents/implement-next-story-task/task-report.template.md` following these instructions:

- **Story Number**: Use the actual story number (e.g., "Story 1.2", "Story 2.1", etc.)
- **Story Title**: Use the exact title from the implemented story
- **Changes Made**: List all specific changes with file names and functions
- **Quality Checks**: Document all QA checks performed and their results
- **Requirements Met**: Show how each acceptance criteria was satisfied
- **File Path**: Reference the story file path using pattern `/workspace/aibd-vibe-specs/3-implementation/reports/implement-next-story-task-{epicNum}.{storyNum}.md`

**The agent MUST save the completed task report to `/workspace/aibd-vibe-specs/3-implementation/reports/implement-next-story-task-{epicNum}.{storyNum}.md` and return this completed task report as the final output/result of the task.**

## Autonomous Decision Making

The agent **MUST** make decisions independently regarding:

- Implementation approach and technical solutions
- Code organization and structure within project standards
- Error handling strategies and edge case management

## Deliverables

The agent **MUST** provide:

- Complete implementation of all story requirements
- Updated story file with 'Done' status and completion notes
- All quality checks passed successfully
- **Completed task report using the specified template format (RETURNED AS FINAL RESULT)**

## Quality Standards

- All acceptance criteria **MUST** be implemented and verified
- Code **MUST** pass all quality checks (typecheck, lint, madge)
- Implementation **MUST** follow project coding standards and architecture
- Error handling **MUST** be robust and user-friendly
- Code documentation **MUST** be complete for complex logic and new functions
- Story administration **MUST** be completed with proper status updates
- **Task report **MUST** accurately reflect all implementation work and be returned as the final result**

## Final Output Requirement

**The agent MUST complete this task by:**

1. **Creating the report file** at `/workspace/aibd-vibe-specs/3-implementation/reports/implement-next-story-task-{epicNum}.{storyNum}.md` using the template
2. **Staging and committing all changes** with the commit message: `Completed Story task ({EpicNum}.{StoryNum}): {Short Title}`
3. **Returning the filled-out task report** as the final result
