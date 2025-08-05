# Component Highlighter

This is a simple, drop-in utility to visually highlight and inspect HTML elements that have been marked as "components" via `data-component` attributes.

It provides a floating toggle button that, when clicked, opens a popup panel listing all unique components found on the page. You can then use checkboxes to toggle a visual outline for each instance of a specific component.

This tool is designed to help designers and developers visualize the component architecture of a static HTML prototype.

## How to Use

1.  **Include the CSS and JavaScript:**
    In your main HTML file, include the `styles.css` and `script.js` files. Make sure the paths are correct.

    ```html
    <head>
      <!-- ... other head elements ... -->
      <link rel="stylesheet" href="aibd/tools/component-highlighter/styles.css" />
    </head>
    <body>
      <!-- ... your page content ... -->
      <script src="aibd/tools/component-highlighter/script.js"></script>
    </body>
    ```

2.  **Mark up your components:**
    Add a `data-component="ComponentName"` attribute to any HTML element you want to identify as a component.

    ```html
    <div data-component="UiRecipeCard">
      <h2>Recipe Name</h2>
      <div data-component="UiTagList">
        <span data-component="UiTag">Vegan</span>
        <span data-component="UiTag">Breakfast</span>
      </div>
    </div>
    ```

3.  **Open the HTML file in a browser:**
    The script will automatically inject the toggle button and popup into the page. Click the button in the bottom-right corner to start inspecting your components.

## How It Works

The `script.js` file waits for the DOM to be fully loaded, then it:

1.  Injects the necessary HTML for the toggle button and the popup panel into the `<body>`.
2.  Scans the entire document for all elements with a `data-component` attribute.
3.  Identifies all unique component names from those attributes.
4.  Dynamically populates the popup panel with a checkbox and label for each unique component.
5.  Attaches event listeners to the toggle button, the close button, and the checkboxes to handle showing/hiding the panel and toggling the highlight styles.

The `styles.css` file contains all the necessary styles for the popup, the UI elements within it, and the highlight outline/label that gets applied to components.
