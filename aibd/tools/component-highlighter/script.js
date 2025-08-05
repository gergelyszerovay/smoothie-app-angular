// --- Component Highlighter Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and inject the highlighter's HTML structure
    const highlighterHTML = `
        <div id="component-viewer-toggle" title="Toggle Component Highlights" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; background: #000000; color: white; padding: 10px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: background-color 0.3s ease;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3a2 2 0 0 0-2 2v2"></path><path d="M19 3a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path><rect width="18" height="10" x="3" y="7" rx="2"></rect></svg>
        </div>
        <div id="component-viewer-popup" class="component-viewer-popup">
            <div class="component-viewer-header">
                <h3>Components on this page</h3>
                <button id="component-viewer-close" title="Close">&times;</button>
            </div>
            <div class="component-viewer-controls">
                <div>
                    <button id="select-all-btn" title="Select All / None"><i data-lucide="square-check"></i></button>
                    <button id="expand-all-btn" title="Expand All"><i data-lucide="chevrons-down-up"></i></button>
                    <button id="collapse-all-btn" title="Collapse All"><i data-lucide="chevrons-up-down"></i></button>
                    <button id="refresh-component-tree" title="Refresh Tree"><i data-lucide="rotate-cw"></i></button>
                </div>
            </div>
            <ul id="component-viewer-list" class="component-viewer-list"></ul>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', highlighterHTML);

    // 2. Get references to the newly created elements
    const toggleButton = document.getElementById('component-viewer-toggle');
    const popup = document.getElementById('component-viewer-popup');
    const closeButton = document.getElementById('component-viewer-close');
    const componentList = document.getElementById('component-viewer-list');
    const refreshButton = document.getElementById('refresh-component-tree');
    const collapseAllButton = document.getElementById('collapse-all-btn');
    const expandAllButton = document.getElementById('expand-all-btn');
    const selectAllButton = document.getElementById('select-all-btn');


    if (!toggleButton || !popup || !closeButton || !componentList || !refreshButton || !collapseAllButton || !expandAllButton || !selectAllButton) {
        console.error('Component highlighter UI elements could not be created.');
        return;
    }

    // Stop clicks inside the popup from propagating to the page
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    let isPopupOpen = false;
    let checkboxIdCounter = 0; // Counter for unique checkbox IDs

    // 3. Dynamically build the component instance tree from the DOM's hierarchy
    function buildTreeFromDOM() {
        const elementToNodeMap = new Map();
        const roots = [];

        // First pass: create a node for each component instance
        document.querySelectorAll('[data-component]').forEach(element => {
            elementToNodeMap.set(element, {
                name: element.dataset.component,
                children: []
            });
        });

        // Second pass: establish parent-child relationships for the instance tree
        elementToNodeMap.forEach((node, element) => {
            const parentElement = element.parentElement.closest('[data-component]');
            if (parentElement) {
                const parentNode = elementToNodeMap.get(parentElement);
                if (parentNode) {
                    parentNode.children.push(node);
                }
            } else {
                roots.push(node);
            }
        });
        
        return roots; // Return the full instance tree
    }
    
    // 4. Populate the list from the generated component tree
    function buildComponentList(nodes, parentElement, level) {
        nodes.forEach(node => {
            const name = node.name;
            const listItem = document.createElement('li');
            const checkboxId = `comp-check-${checkboxIdCounter++}`;
            const hasChildren = node.children.length > 0;

            listItem.classList.add(`level-${level}`);
            listItem.classList.add('is-collapsed');

            listItem.innerHTML = `
                <div class="item-content">
                    <span class="toggle">${hasChildren ? '▶' : ''}</span>
                    <input type="checkbox" id="${checkboxId}" data-component-name="${name}" class="component-checkbox">
                    <label for="${checkboxId}">${name}</label>
                </div>
            `;
            
            if (hasChildren) {
                const childrenContainer = document.createElement('ul');
                childrenContainer.className = 'children-container';
                buildComponentList(node.children, childrenContainer, level + 1);
                listItem.appendChild(childrenContainer);
            }

            parentElement.appendChild(listItem);
        });
    }

    function rebuildTree() {
        // Clear the current list
        componentList.innerHTML = '';
        checkboxIdCounter = 0;

        // Rebuild the tree and the list
        const componentTree = buildTreeFromDOM();
        buildComponentList(componentTree, componentList, 0);
        // Render any new Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Initial build
    rebuildTree();

    // Event listener for the refresh button
    refreshButton.addEventListener('click', rebuildTree);

    // Event listeners for expand/collapse all
    collapseAllButton.addEventListener('click', () => {
        componentList.querySelectorAll('li').forEach(li => {
            if (li.querySelector('.children-container')) {
                li.classList.add('is-collapsed');
                li.querySelector('.toggle').textContent = '▶';
            }
        });
    });

    expandAllButton.addEventListener('click', () => {
        componentList.querySelectorAll('li').forEach(li => {
            if (li.querySelector('.children-container')) {
                li.classList.remove('is-collapsed');
                li.querySelector('.toggle').textContent = '▼';
            }
        });
    });

    // Handle "Select All" checkbox
    let areAllSelected = false;
    selectAllButton.addEventListener('click', () => {
        areAllSelected = !areAllSelected;
        const allCheckboxes = componentList.querySelectorAll('.component-checkbox');
        
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = areAllSelected;
            highlightComponent(checkbox.dataset.componentName, areAllSelected);
        });
    });

    // Add event listener for toggling collapse/expand
    componentList.addEventListener('click', (e) => {
        const itemContent = e.target.closest('.item-content');
        if (itemContent && e.target.tagName !== 'INPUT') {
            const listItem = itemContent.parentElement;
            if (listItem.querySelector('.children-container')) {
                listItem.classList.toggle('is-collapsed');
                const toggle = listItem.querySelector('.toggle');
                toggle.textContent = listItem.classList.contains('is-collapsed') ? '▶' : '▼';
            }
        }
    });

    // 6. Toggle popup visibility
    toggleButton.addEventListener('click', () => {
        isPopupOpen = !isPopupOpen;
        popup.style.display = isPopupOpen ? 'block' : 'none';
        toggleButton.style.background = isPopupOpen ? '#888888' : '#000000';
    });

    closeButton.addEventListener('click', () => {
        isPopupOpen = false;
        popup.style.display = 'none';
        toggleButton.style.background = '#000000';
    });

    // 7. Handle highlighting on checkbox change
    componentList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const componentName = e.target.dataset.componentName;
            const shouldHighlight = e.target.checked;
            
            highlightComponent(componentName, shouldHighlight);
        }
    });

    function highlightComponent(name, highlight) {
        const elementsToHighlight = document.querySelectorAll(`[data-component="${name}"]`);
        elementsToHighlight.forEach(el => {
            el.classList.toggle('is-highlighted', highlight);
        });
    }
});
// --- End Component Highlighter Logic --- 