export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@fc/micro\\-videos/(.*)$': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/$1',
    //'#seedwork/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/domain/index.js',
    '#seedwork/(.*)$': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/@seedwork/$1',
    //'#category/domain': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/domain/index.js',
    '#category/(.*)$': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/category/$1',
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    '../../@core/src/@seedwork/domain/tests/jest.ts', // due to supposed issue with 'fail' at this jest version
  ],
};
