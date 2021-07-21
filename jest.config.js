/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  transform: {
    "^.+\\.(js?)$": "babel-jest"
  },
  transformIgnorePatterns: ['node_modules/?!(unist-util-visit|unist-util-visit-parents)']
};
