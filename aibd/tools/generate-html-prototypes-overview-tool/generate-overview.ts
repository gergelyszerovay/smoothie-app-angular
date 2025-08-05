// Add Node.js type reference for TypeScript
/// <reference types="node" />
import { promises as fs } from 'fs';
import { JSDOM } from 'jsdom';
import * as path from 'path';

/**
 * Directory containing HTML prototypes (absolute path)
 */
const PROTOTYPES_DIR = '/workspace/aibd-vibe-specs/1-design/html-prototypes';
const OUTPUT_FILE = '/workspace/aibd-vibe-specs/1-design/html-prototype-overview.md';

/**
 * Recursively get all .html files in the prototypes directory.
 * @param dir Directory to search
 * @returns Array of absolute file paths to .html files
 */
async function getHtmlFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(path.join(dir, entry.name))));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

/**
 * Represents a node in the component tree.
 */
interface ComponentNode {
  /** Component name (from data-component attribute) */
  name: string;
  /** Child components */
  children: ComponentNode[];
}

/**
 * Parse the DOM and build a component tree based on data-component attributes.
 * @param element DOM element to parse
 * @returns ComponentNode or null if not a component
 */
function buildComponentTree(element: Element): ComponentNode | null {
  const componentName = element.getAttribute('data-component');
  if (!componentName) return null;

  // Find all direct child elements that have data-component attributes
  const childComponents: ComponentNode[] = [];

  // Get all children of this element
  for (const child of Array.from(element.children)) {
    // If this child has a data-component attribute, it's a direct child component
    if (child.hasAttribute('data-component')) {
      const childTree = buildComponentTree(child);
      if (childTree) childComponents.push(childTree);
    } else {
      // If this child doesn't have data-component, search its descendants for components
      // that are direct children of this element (not nested deeper)
      const nestedComponents = child.querySelectorAll('[data-component]');
      for (const nested of Array.from(nestedComponents)) {
        // Check if this nested component is a direct child of the current element
        let parent = nested.parentElement;
        let isDirectChild = false;
        while (parent && parent !== element) {
          if (parent.hasAttribute('data-component')) {
            // This nested component belongs to a different component, skip it
            break;
          }
          if (parent === child) {
            isDirectChild = true;
            break;
          }
          parent = parent.parentElement;
        }

        if (isDirectChild) {
          const childTree = buildComponentTree(nested);
          if (childTree) childComponents.push(childTree);
        }
      }
    }
  }

  return { name: componentName, children: childComponents };
}

/**
 * Group and count repeated components under the same parent.
 * @param children Array of child ComponentNodes
 * @returns Array of grouped nodes with their count
 */
function groupChildren(children: ComponentNode[]): Array<{ node: ComponentNode; count: number }> {
  const grouped: Record<string, { node: ComponentNode; count: number }> = {};
  for (const child of children) {
    const key = JSON.stringify({
      name: child.name,
      children: child.children.map((c) => c.name),
    });
    if (grouped[key]) {
      grouped[key].count++;
    } else {
      grouped[key] = { node: child, count: 1 };
    }
  }
  return Object.values(grouped);
}

/**
 * Render the component tree as a markdown code block.
 * @param node Root component node
 * @param indent Indentation level
 * @returns Markdown string representing the tree
 */
function renderTree(node: ComponentNode, indent = 0): string {
  const pad = '  '.repeat(indent);
  let result = `${pad}- ${node.name}`;
  const grouped = groupChildren(node.children);
  for (const { node: child, count } of grouped) {
    let label = renderTree(child, indent + 1);
    if (count > 1) {
      // Insert (xN) notation after the component name
      label = label.replace(/^(\s*-\s\w+)/, `$1 (x${count})`);
    }
    result += `\n${label}`;
  }
  return result;
}

/**
 * Main function to generate the overview markdown file.
 * Scans HTML files, builds component trees, and writes the output file.
 */
async function generateOverview() {
  const htmlFiles = (await getHtmlFiles(PROTOTYPES_DIR)).sort();
  let markdown =
    '# HTML Prototype Component Overview\n\nThis document provides a high-level overview of the component structures used in the static HTML prototypes.\n';

  for (const [i, file] of htmlFiles.entries()) {
    const fileName = path.basename(file);
    const html = await fs.readFile(file, 'utf-8');
    const dom = new JSDOM(html);
    // Find all root-level data-component elements (not nested in another data-component)
    const allComponents = Array.from(dom.window.document.querySelectorAll('[data-component]'));
    const rootComponents = allComponents.filter((el): el is Element => {
      let parent = el.parentElement;
      while (parent) {
        if (parent.hasAttribute('data-component')) return false;
        parent = parent.parentElement;
      }
      return true;
    });
    // Build trees for each root component
    const trees = rootComponents
      .map(buildComponentTree)
      .filter((n): n is ComponentNode => Boolean(n));
    // Section header
    markdown += `\n\n## ${i + 1}. \ ${fileName}\n\n`;
    markdown += '### Component Tree\n\n';
    markdown += '```\n';
    for (const tree of trees) {
      markdown += renderTree(tree) + '\n';
    }
    markdown += '```\n';
  }

  await fs.writeFile(OUTPUT_FILE, markdown.trim() + '\n', 'utf-8');
  console.log(`Overview generated at: ${OUTPUT_FILE}`);
}

// Run the script if executed directly
if (typeof require !== 'undefined' && typeof module !== 'undefined' && require.main === module) {
  generateOverview().catch((err) => {
    console.error('Error generating overview:', err);
    process.exit(1);
  });
}
