const eslintrc = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
    "jasmine": true
  },
  "rules": {
    "func-names": 0,
    "arrow-body-style": 0,
    "prefer-destructuring": 0,
    "max-len": 0,
    "consistent-return": 0,
    "comma-dangle": ["error", "always-multiline"],
    "function-paren-newline": 0,
    "class-methods-use-this": 0,
    "react/sort-comp": 0,
    "react/prop-types": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/require-extension": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".md"]
      }
    ],
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "react/no-danger": 0,
    "react/jsx-no-bind": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-array-index-key": 0,
    "react/no-find-dom-node": 0,
    "react/no-unused-state": 0,
    "react/no-unused-prop-types": 0,
    "react/default-props-match-prop-types": 0,
    "react/jsx-curly-spacing": 0,
    "react/no-render-return-value": 0,
    "object-curly-newline": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "no-redeclare": 0,
    "no-restricted-globals": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0
  }
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(eslintrc.rules, {
    'no-console': 0,
    'no-unused-vars': 0,
  });
}

module.exports = eslintrc
