// @ts-check

const eslint = require('@eslint/js');
const eslintPluginPathBoundaryImports = require('@gergelyszerovay/eslint-plugin-path-boundary-imports');
const sheriff = require('@softarc/eslint-plugin-sheriff');
const angular = require('angular-eslint');
const importPlugin = require('eslint-plugin-import');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    files: ['src/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
      sheriff.configs.all
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      path: eslintPluginPathBoundaryImports,
      import: importPlugin,
    },
    rules: {
      // this rule has issue with 'rxMethod<void>':
      // https://github.com/typescript-eslint/typescript-eslint/issues/7227
      "@typescript-eslint/no-invalid-void-type": "off",
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      'path/enforce-import-pattern': [
        'error',
        {
          levels: 2,
        },
      ],
      "import/no-default-export": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/prefer-signals": "error",
    },
    settings: {
      'path': {
        'config': 'tsconfig.app.json',
      },
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
    },
  }
);
