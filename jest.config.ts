import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  moduleNameMapper: {
    // Assuming your backend and frontend are directly under the libs or apps.
    '^@backend/(.*)$': '<rootDir>/backend/src/$1',
    '^@frontend/(.*)$': '<rootDir>/frontend/src/$1',
    // Add other necessary mappings based on your tsconfig paths
  },
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "<rootDir>/jest.preset.js",
    "<rootDir>/backend-e2e/src/backend/backend.spec.ts",
    "<rootDir>/backend-e2e/src/support/global-teardown.ts",
    "<rootDir>/backend-e2e/src/support/test-setup.ts",
    "<rootDir>/backend/src/main.ts",
  ],
});
