const fs = require('fs'),
  argv = require('yargs').argv,
  project = JSON.parse(fs.readFileSync('./project.json', 'utf8'));
  env = argv.env || 'development';

module.exports = {
  "collectCoverageFrom": project.tests.source.files,
  "coverageReporters": ["html"],
  "coverageThreshold": {
    "global": {
      "statements": 100,
      "branches": 100,
      "functions": 100,
      "lines": 100
    }
  },
  "moduleNameMapper": {
    '@vue$': 'vue/dist/vue.common.js',
    '@environment$': `<rootDir>/${project.environments.source.root}/${env}.js`,
    '@scripts\/(.*)$': `<rootDir>/${project.scripts.source.root}$1`,
    '@styles\/(.*)$': `<rootDir>/${project.styles.source.root}$1`
  },
  "setupTestFrameworkScriptFile": "<rootDir>/src/scripts/base/mocks/global.js",
  "transform": {
    "^.+\\.(css|styl)$": "<rootDir>/src/scripts/base/mocks/raw-files.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.html$": "html-loader-jest"
  }
}
