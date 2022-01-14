const nextJest = require('next/jest');

const factory = nextJest({
  dir: './',
});

const custom = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = factory(custom);
