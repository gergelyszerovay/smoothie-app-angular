# CLI Args Feature PRD Checklist

This checklist ensures that PRDs for `cli-args` features meet all documentation and structural requirements.

## 1. Objective

- [ ] Is the primary objective clearly stated?
- [ ] Does it explain that the feature's purpose is to parse and validate command-line arguments?

## 2. System Stories

- [ ] Is the story for the main application process included?
- [ ] Is the story for the developer experience included?

## 3. Requirements

### 3.1. Functional Requirements

- [ ] Is the public API (`parseCliArgs()`) correctly defined?
- [ ] Is there a markdown table for **Argument Definitions**?
- [ ] Does the table include columns for `Flag`, `Type`, `Description`, and `Default`?
- [ ] Is every single command-line flag listed in the table?
- [ ] Is the requirement for `--help` text generation stated?
- [ ] Is there a **Usage Text** section?
- [ ] Does the **Usage Text** section contain the full, exact help message inside a `text` code block?

### 3.2. Non-Functional Requirements

- [ ] Is the requirement for reliable error handling included?
- [ ] Is the requirement for maintainability (co-locating flag definitions) included?

## 4. Technical Design

- [ ] Are the `CliArgs` data structure and all core components (`parseCliArgs.ts`, `internal/createCliParser.ts`, `internal/getUsageText.ts`) listed and described?

## 5. Acceptance Criteria

- [ ] Are there specific, testable criteria for parsing, default values, and help text?
- [ ] Is the criterion for handling unknown arguments included?

## 6. Directory Structure

- [ ] Is the standard directory structure for a `cli-args` feature shown in a code block?

## 7. Out of Scope

- [ ] Are the standard out-of-scope items (e.g., parsing from other sources) listed?
