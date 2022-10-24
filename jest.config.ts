/*
 * https://jestjs.io/docs/configuration
 */

export default {
  projects: [
    "<rootDir>/src/@core",
    "<rootDir>/src/nestjs",
    "<rootDir>/src/nestjs/test",
  ],
  coverageDirectory: "<rootDir>/__coverage",
};
