const { resolve } = require('path');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    tsconfigRootDir: resolve(__dirname, '../packages'),
    project: ['./**/tsconfig.json', './**/tsconfig.eslint.json'],
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
