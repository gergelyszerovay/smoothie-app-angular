# MCP Tool Blueprint

This blueprint extends the base AIBD standards specifically for implementing MCP tools. It focuses on MCP-specific patterns and requirements while following the core AIBD principles.

## Feature Structure

### Tool-Specific Components

Beyond standard AIBD feature organization, MCP tools require these specific files:

```
src/
└── features/
    └── tool-name/
        ├── createToolNameMcpTool.ts      # Public: MCP tool factory
        └── internal/
            ├── ToolNameInputSchema.ts     # Internal: Input schema and type
            ├── ToolNameOutputSchema.ts    # Internal: Output schema and type
            └── toolNameMcpToolHandler.ts  # Handler implementation
```

Note that for complex tools, additional service files may be included in the internal directory as needed.

## Tool Declaration Standards

### Input Schema Pattern

```typescript
// internal/ToolNameInputSchema.ts
import { z } from "zod";

/**
 * Input parameters for the ToolName MCP tool
 */
export type ToolNameInput = {
  /** Parameter description */
  param1: string;
  /** Parameter description */
  param2?: string;
};

/**
 * Schema for validating ToolName tool input parameters
 */
export const ToolNameInputSchema = z.object({
  param1: z
    .string()
    .min(1)
    .max(100),
  param2: z.string().optional(),
});
```

### Output Schema Pattern

Define output schemas only for tools that return JSON responses (i.e., when "json" is included in the `outputTypes` array). Tools that only return text or other non-JSON content types do not need output schemas.

```typescript
// internal/ToolNameOutputSchema.ts
import { z } from "zod";

/**
 * MCP tool output format for ToolName JSON responses
 */
export type ToolNameOutput = {
  /** Result field description */
  resultField1: string;
  /** Result field description */
  resultField2: number;
};

/**
 * Schema for validating ToolName tool JSON output
 */
export const ToolNameOutputSchema = z.object({
  resultField1: z.string(),
  resultField2: z.number(),
});

/**
 * Built-in types from MCP SDK
 */

// TextContent structure:
// type TextContent = {
//   [x: string]: unknown;
//   type: "text";
//   text: string;
// };
//
// ImageContent structure:
// type ImageContent = {
//   [x: string]: unknown;
//   type: "image";
//   data: string;
//   mimeType: string;
// };
//
// JsonContent structure:
// type JsonContent<T> = {
//   type: "json";
//   data: T;
// };

/**
 * MCP-specific error class for tool errors
 */
export class McpToolError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = "McpToolError";
  }
}

```

## Tool Implementation Patterns

### Tool Factory

```typescript
// createToolNameMcpTool.ts
import type { McpTool } from "@shared/mcp-tool/McpTool";
import { ToolNameInputSchema } from "./internal/ToolNameInputSchema";
import { ToolNameOutputSchema } from "./internal/ToolNameOutputSchema";
import { toolNameMcpToolHandler } from "./internal/toolNameMcpToolHandler";

/**
 * Creates and returns the ToolName MCP tool configuration
 *
 * @returns Array containing the ToolName MCP tool configuration
 */
export function createToolNameMcpTool(): McpTool[] {
  return [
    {
      name: "tool-name",
      description: "Tool description and purpose",
      inputSchema: ToolNameInputSchema,
      inputSchemaName: "ToolNameInputSchema",
      outputTypes: ["text", "json"], // Specify supported output types
      jsonOutputSchema: ToolNameOutputSchema, // Schema for JSON responses, only needed when "json" is in outputTypes
      jsonOutputSchemaName: "ToolNameOutputSchema", // Only needed when "json" is in outputTypes
      handler: toolNameMcpToolHandler,
      enabledInModes: ["rest", "mcpAct"], // Specify which modes this tool is enabled in
    },
  ];
}
```

### Handler Pattern

```typescript
// internal/toolNameMcpToolHandler.ts
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { JsonContent } from "@shared/mcp-tool/JsonContent";
import { McpToolError } from "@shared/mcp-tool/McpToolError";
import type { ToolNameInput } from "./ToolNameInputSchema";
import type { ToolNameOutput } from "./ToolNameOutputSchema";

type ToolNameMcpToolHandlerParams = {
  params: ToolNameInput;
  // Add any additional context parameters as needed
};

/**
 * Handler for the toolName MCP tool
 * Returns both text and JSON content with the requested information
 */
export async function toolNameMcpToolHandler({
  params,
}: ToolNameMcpToolHandlerParams): Promise<
  Array<TextContent | JsonContent<ToolNameOutput>> | McpToolError
> {
  try {
    const { param1, param2 } = params;
    
    // Process the request
    // In a real implementation, you might call a service or perform operations
    const resultField1 = `Processed ${param1}`;
    const resultField2 = param2 ? param2.length : 0;
    
    // Return both text and JSON responses
    return [
      // Text response
      {
        type: "text",
        text: `Tool processed: ${param1} with result ${resultField2}`,
      },
      // JSON response
      {
        type: "json",
        data: {
          resultField1,
          resultField2,
        },
      },
    ];
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in toolName tool:", error);
    if (error instanceof Error) {
      return new McpToolError(error.message);
    }
    return new McpToolError("An unexpected error occurred in the toolName tool");
  }
}
```

## Mode System Support

MCP tools should consider the operational mode of the server. By default, 'mcpAct' is the standard operational mode, and it's not necessary to implement additional modes in simple MCP servers.

For more complex servers that require separate planning and execution phases, refer to the [MCP Server with Plan and Act Modes Blueprint](./mcp-server-with-plan-and-act-mode-blueprint.md). This blueprint provides guidance on implementing mode-based permission systems.

When specifying `enabledInModes`, consider:

```typescript
// For tools that only modify the system:
enabledInModes: ["rest", "mcpAct"] // Not available in planning mode

// For read-only tools:
enabledInModes: ["rest", "mcpAct", "mcpPlan"] // Available in all modes
```

## MCP-Specific Requirements

### Feature Documentation Additions

Beyond standard AIBD specs.md requirements, include:

- MCP Tool Capabilities
  - Input/output format examples
  - Tool limitations and constraints
  - Rate limiting details
  - Permission requirements
  - Error handling specifics
  - Client compatibility notes

### Security Considerations

MCP-specific security requirements:

1. Input Validation

   - Strict schema validation
   - MCP-compliant error formats
   - Size and complexity limits

2. Output Processing
   - Safe error messages
   - No internal data exposure
   - Resource usage limits

### Error Handling Standards

MCP tools should use McpToolError for error handling:

```typescript
// Error handling example in MCP tool handler
import { McpToolError } from "@shared/mcp-tool/McpToolError";
import type { JsonContent } from "@shared/mcp-tool/JsonContent";
import type { TextContent } from "@modelcontextprotocol/sdk/types.js";
import type { ToolNameInput } from "./ToolNameInputSchema";
import type { ToolNameOutput } from "./ToolNameOutputSchema";

export async function toolNameMcpToolHandler({
  params,
}: ToolNameMcpToolHandlerParams): Promise<
  Array<TextContent | JsonContent<ToolNameOutput>> | McpToolError
> {
  try {
    // Input validation is handled by Zod schema
    // Return McpToolError for business logic or permission failures
    if (!isOperationAllowed(params)) {
      return new McpToolError("Operation not allowed with the provided parameters", "param1");
    }

    // Perform the actual operation
    const result = processToolOperation(params);

    // Return successful response with both text and JSON content
    return [
      {
        type: "text",
        text: `Operation completed successfully: ${result.resultField1}`
      },
      {
        type: "json",
        data: {
          resultField1: result.resultField1,
          resultField2: result.resultField2
        }
      }
    ];
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in toolName tool:", error);
    if (error instanceof Error) {
      return new McpToolError(error.message);
    }
    return new McpToolError("An unexpected error occurred");
  }
}
```

Key points:

1. **Error Handling**

   - If returning an error, return a single McpToolError instance (not in an array)
   - If returning content, return an array of content items

2. **Security Considerations**
   - Avoid exposing internal system details in error messages
   - Validate all inputs before processing
   - Keep error messages user-friendly

3. **McpToolError Usage**
   - Use `McpToolError` for all error cases with optional field parameter for validation errors
   - McpToolError provides a field parameter to specify which input field caused the error
   - Properly imported from `@shared/mcp-tool/McpToolError`

### Testing Guidance

**Note on Testing**: Comprehensive testing guidelines for MCP tools will be covered in a future version of this documentation.

Current development should focus on:
- Validating input and output schemas
- Ensuring robust error handling
- Verifying core business logic functionality
- Testing error scenarios and recovery
- Validating error message safety

Developers are encouraged to implement thorough manual testing and create robust validation checks within the tool implementation.