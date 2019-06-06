module.exports = {
  projects: [
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      // testEnvironment: 'jsdom',
      testEnvironment: 'jest-environment-jsdom-global',
      transform: {
        '\\.(ts|tsx|js)$': 'ts-jest'
      },
      transformIgnorePatterns: [],
      testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      collectCoverage: false,
      globals: {
        'ts-jest': {
          diagnostics: false
        }
      }
    },
    {
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        '\\.(ts|tsx|js)$': 'ts-jest'
      },
      transformIgnorePatterns: [],
      testRegex: "(/__tests__/.*|\\.(test|spec)).node\\.(ts|tsx|js)$",
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      collectCoverage: false,
      globals: {
        'ts-jest': {
          diagnostics: false
        }
      }
    }
  ]
};