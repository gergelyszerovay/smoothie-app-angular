# HTML Prototype Component Overview

This document provides a high-level overview of the component structures used in the static HTML prototypes.


## 1.  cards1.html

### Component Tree

```
- MainLayout
  - UiHeroSection
  - UiSearchIngredients
    - UiIngredientChip (x3)
  - UiRecipeGrid
    - UiRecipeCard (x6)
      - UiTagList
        - UiTag (x3)
  - UiRecipeModal
    - UiTagList
```


## 2.  empty1.html

### Component Tree

```
- UiEmptyState
  - UiIngredientChip (x3)
```
