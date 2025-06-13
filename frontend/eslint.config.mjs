import react from 'eslint-plugin-react';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import next from 'eslint-config-next';


export default [
  ...next(),
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      '@typescript-eslint': pluginTs,
    },
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
    },
    rules: {
      ...react.configs.flat?.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': ['warn'],
      'react/no-unescaped-entities': ['warn'],
      'no-console': ['warn'],
      'no-debugger': ['error']
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect'
      }
    },    
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': ['warn'],
    },
  },

  {
    name: 'Prettier Rules',
    ...prettier
  }
];