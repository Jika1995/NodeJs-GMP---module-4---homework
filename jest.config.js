module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['./src'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 98
    }
  }
}