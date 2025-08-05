# Product Requirements Document (PRD)

## Feature: [Feature Name] ([feature-name-slug])

---

### 1. Objective

_A brief, one-paragraph summary of the feature's purpose. Explain that this feature is responsible for parsing and validating all command-line arguments for the application._

---

### 2. System Stories

_List the system-level stories that this feature addresses. Focus on how the main application process and developers will interact with this feature._

- **As the main application process**, I want to **parse all command-line arguments at startup** so that **I can correctly configure and initialize all required features based on user input**.
- **As a developer**, I want **a centralized and type-safe way to define and access CLI options** so that **I can easily understand and extend the application's configuration**.

---

### 3. Requirements

#### 3.1. Functional Requirements

1.  **Public API:**
    - The feature MUST expose a single synchronous function: `parseCliArgs()`.
    - It MUST return a `CliArgs` object containing the parsed flags.
2.  **Argument Definitions:**
    - The PRD MUST contain a table detailing all supported command-line flags.

| Flag              | Type      | Description                  | Default     |
| :---------------- | :-------- | :--------------------------- | :---------- |
| `--example-flag`  | `boolean` | An example boolean flag.     | `false`     |
| `--example-param` | `string`  | An example string parameter. | `undefined` |

3.  **Help Text:**

    - The system MUST automatically display a helpful usage guide and exit if the `--help` flag is provided.

4.  **Usage Text**
    - The PRD MUST include the full and exact usage text displayed to the user inside a `text` code block.
    ```text
    [Usage text goes here]
    ```

#### 3.2. Non-Functional Requirements (NFRs)

- **Reliability:** The parser MUST provide clear error messages for invalid or unknown arguments.
- **Maintainability:** The definitions for all CLI flags MUST be co-located and easy to manage.

---

### 4. Technical Design

- **Data Structures:**
  - `CliArgs`: A public TypeScript type that defines the shape of the final, parsed arguments object.
- **Core Components:**
  - `parseCliArgs.ts`: The public entry point to the feature.
  - `internal/createCliParser.ts`: The internal factory that configures the CLI parser instance (e.g., using `meow`).
  - `internal/getUsageText.ts`: The internal utility that generates the `--help` message content.

---

### 5. Acceptance Criteria

- [ ] The `parseCliArgs` function returns a `CliArgs` object with correctly parsed values.
- [ ] Default values are correctly applied when flags are omitted.
- [ ] The `--help` flag prints the full usage guide and exits.
- [ ] Providing an unknown argument causes the underlying library to show an error and exit.

---

### 6. Directory Structure

```
src/features/[feature-name-slug]/
├── CliArgs.ts                # Public: The TypeScript type definition for the parsed arguments object.
├── parseCliArgs.ts           # Public: The main function to execute the CLI parser.
└── internal/
    ├── createCliParser.ts    # Internal: The factory that configures and creates the parser instance.
    └── getUsageText.ts       # Internal: A utility to generate the --help message content.
```

---

### 7. Out of Scope

- Parsing configuration from any source other than command-line arguments (e.g., environment variables, config files).
- Complex, interactive CLI prompts.
