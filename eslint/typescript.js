const { resolve } = require('path');

module.exports = {
  extends: ['airbnb-typescript/base', 'prettier'],

  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    tsconfigRootDir: resolve(__dirname, '../packages'),
    project: ['./**/tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },

    projectFolderIgnoreList: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/public/**',
    ],
  },
};
