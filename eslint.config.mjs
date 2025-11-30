import js from '@eslint/js'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import pluginJest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  stylistic.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
      'jest': pluginJest,
    },
    languageOptions: {
      parser: ts.parser,
      globals: {
        ...pluginJest.environments.globals.globals,
        ...globals.node,
      },
    },
    files: ['**/*.ts', '**/*.js'],
    rules: {
      // eslint rules
      // no importing more than once from the same file
      'no-duplicate-imports': 'error',
      // disallow missing backticks in template literals
      'no-template-curly-in-string': 'error',
      // no unused variables
      'no-unused-vars': 'off',
      // no infinite loops
      'no-unmodified-loop-condition': 'error',
      // no one run time loops
      'no-unreachable-loop': 'error',
      // no unused assignments
      'no-useless-assignment': 'error',
      // use === instead of ==
      'eqeqeq': 'error',
      // prefer const over let
      'prefer-const': ['error', { destructuring: 'all' }],

      // @typescript-eslint rules
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],

      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-vars': 'error',

      // stylistic rules
      // enforce semicolon use
      '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
      // use single quotes
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'never' }],
      // use semicolon delimiter
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      // dangling commas
      '@stylistic/comma-dangle': ['error', {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        enums: 'only-multiline',
        functions: 'never',
      }],
      // allow if else { on same line
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },
]
