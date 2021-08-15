
module.exports = {
  "testRegex": "\\.test\\.js$",
  "testPathIgnorePatterns": [
    "/node_modules/",
  ],
  // 代表需要被 Mock 的资源名称。如果需要 Mock 静态资源（如less、scss等），
  // 则需要配置 Mock 的路径 <rootDir>/__mocks__/yourMock.js
  "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "modulePaths": ['<rootDir>/src'],
  // 用于编译 ES6/ES7 语法，需配合 babel-jest 使用
  "transform": {
    // "\\.(png|eot|svg|ttf|woff|woff2)(\\?.+)?$": "<rootDir>/tests/jest/mock.js",
    "^.+\\.js$": "babel-jest"
  },
  "roots": ["<rootDir>/src/"],
  "collectCoverageFrom": [
    'src/**/*.{js,jsx}',
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/test/jest.config.js",
  // 代表支持加载的文件名，
  // 与 Webpack 中的 resolve.extensions 类似
  "moduleFileExtensions": [
    "js",
    "json",
    "jsx"
  ]
}
