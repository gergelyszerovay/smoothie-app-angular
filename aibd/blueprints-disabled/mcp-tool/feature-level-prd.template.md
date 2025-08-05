# Product Requirements Document (PRD)

## Feature: [Tool Name] ([tool-name-slug])

---

### 1. Objective

_A brief, one-paragraph summary of the tool's purpose. What problem does it solve? What is the desired outcome for the system or user?_

---

### 2. User Stories / System Stories

_List the stories that this tool addresses. These may be user-facing or system-level actions._

- **As a [type of user/developer]**, I want to **[use the tool for a specific action]** so that **[I can achieve some goal]**.
- **As the System**, I want to **[perform an automated action using this tool]** so that **[a benefit is realized]**.

---

### 3. Requirements

#### 3.1. Functional Requirements

_Detail the specific, testable functionalities of the tool. Use RFC 2119 keywords (MUST, SHOULD, MAY)._

1.  **Tool Input:**
    - The tool MUST accept the following parameters: `[param1, param2, ...]`.
    - The tool MUST validate the input against `ToolNameInputSchema`.
2.  **Tool Logic:**
    - The tool MUST process the input to produce `[describe the output]`.
3.  **Tool Output:**
    - The tool MUST return a `[TextContent, JsonContent]` response.
    - The JSON output MUST conform to `ToolNameOutputSchema`.
4.  **Error Handling:**
    - The tool MUST return an `McpToolError` on invalid input or processing failure.

#### 3.2. Non-Functional Requirements (NFRs)

- **Performance:** Describe performance expectations (e.g., execution time, resource usage).
- **Security:** Outline security requirements (e.g., input sanitization, prevention of injection attacks).
- **Reliability:** Define the expected reliability and error rate.
- **Testing:** Outline the required testing strategy (e.g., unit tests for handler logic, integration tests for schema validation).

---

### 4. MCP Tool Capabilities

_Provide detailed information about the tool's capabilities from a developer's perspective._

- **Input Schema:** `[ToolName]InputSchema`
- **Schema Definition:**
  ```typescript
  // The source code for the Zod schema
  export const [ToolName]InputSchema = z.object({
    // ... zod schema definition ...
  });
  ```
- **Output Format Example (JSON):**
  ```json
  {
    "resultField1": "processed value",
    "resultField2": 42
  }
  ```
- **Tool Limitations:**
  - Describe any known constraints or limitations.
- **Permissions:**
  - The tool is enabled for the following modes: `[rest, mcpAct, mcpPlan]`.

---

### 5. Acceptance Criteria

_A checklist of observable outcomes that must be met for the tool to be considered complete._

- [ ] The tool successfully processes valid input for all parameters.
- [ ] The tool returns a correctly formatted `TextContent` object.
- [ ] The tool returns a correctly formatted `JsonContent` object that validates against the output schema.
- [ ] The tool returns a specific `McpToolError` when required input is missing.
- [ ] The tool returns a specific `McpToolError` when processing fails.
- [ ] The tool is correctly registered and available in the specified modes.

---

### 6. Directory Structure

_Propose the file and directory structure for the new tool, following the MCP Tool Blueprint conventions._

```
src/features/[tool-name-slug]/
├── create[ToolName]McpTool.ts      # Public: MCP tool factory.
└── internal/
    ├── [ToolName]InputSchema.ts     # Internal: Input schema and type.
    ├── [ToolName]OutputSchema.ts    # Internal: Output schema and type.
    └── [toolName]McpToolHandler.ts  # Internal: Handler implementation.
```

**File Explanations:**

- **`create[ToolName]McpTool.ts`**: The factory function that constructs and exports the MCP tool definition.
- **`internal/[ToolName]InputSchema.ts`**: Contains the Zod schema and TypeScript type for the tool's input.
- **`internal/[ToolName]OutputSchema.ts`**: Contains the Zod schema and TypeScript type for the tool's JSON output.
- **`internal/[toolName]McpToolHandler.ts`**: The core logic that executes the tool's function.

---

### 7. Out of Scope

_Clearly define what this tool will **not** do. This helps prevent scope creep._

- Functionality X (this will be handled by another tool).
- Advanced feature Y (this is a potential future enhancement).
