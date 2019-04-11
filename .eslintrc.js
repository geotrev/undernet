const path = require("path")

const ERROR = "error"
const READONLY = "readonly"
const OFF = "off"

module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      configFile: "babel.config.js",
    },
  },
  extends: ["prettier", "prettier/react", "prettier/babel", "plugin:jsx-a11y/recommended"],
  plugins: ["react", "jsx-a11y"],
  globals: {
    Atomics: READONLY,
    SharedArrayBuffer: READONLY,

    // framework
    Undernet: "writable",

    // tests
    should: READONLY,
    expect: READONLY,
    mount: READONLY,
    shallow: READONLY,
    chai: READONLY,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
        paths: [
          path.resolve(__dirname, "site"),
          path.resolve(__dirname, "js/src"),
          path.resolve(__dirname, "scripts"),
        ],
        moduleDirectory: [path.resolve(__dirname, "node_modules")],
      },
      webpack: {
        config: path.resolve(__dirname, "webpack.common.js"),
      },
    },
    "import/ignore": [".(scss|less|css|md)$"],
    react: {
      version: "detect",
    },
  },
  rules: {
    // // react
    // "react/boolean-prop-naming": ERROR, // Enforces consistent naming for boolean props
    // "react/button-has-type": ERROR, // Forbid "button" element without an explicit "type" attribute
    // "react/default-props-match-prop-types": ERROR, // Prevent extraneous defaultProps on components
    // "react/destructuring-assignment": ERROR, // Rule enforces consistent usage of destructuring assignment in component
    // "react/display-name": ERROR, // Prevent missing displayName in a React component definition
    // "react/forbid-component-props": ERROR, // Forbid certain props on Components
    // "react/forbid-dom-props": ERROR, // Forbid certain props on DOM Nodes
    // "react/forbid-elements": ERROR, // Forbid certain elements
    // "react/forbid-prop-types": ERROR, // Forbid certain propTypes
    // "react/forbid-foreign-prop-types": ERROR, // Forbid foreign propTypes
    // "react/no-access-state-in-setstate": ERROR, // Prevent using this.state inside this.setState
    // "react/no-array-index-key": ERROR, // Prevent using Array index in key props
    // "react/no-children-prop": ERROR, // Prevent passing children as props
    // "react/no-danger": ERROR, // Prevent usage of dangerous JSX properties
    // "react/no-danger-with-children": ERROR, // Prevent problem with children and props.dangerouslySetInnerHTML
    // "react/no-deprecated": ERROR, // Prevent usage of deprecated methods, including component lifecyle methods
    // "react/no-did-mount-set-state": ERROR, // Prevent usage of setState in componentDidMount
    // "react/no-did-update-set-state": ERROR, // Prevent usage of setState in componentDidUpdate
    // "react/no-direct-mutation-state": ERROR, // Prevent direct mutation of this.state
    // "react/no-find-dom-node": ERROR, // Prevent usage of findDOMNode
    // "react/no-is-mounted": ERROR, // Prevent usage of isMounted
    // "react/no-multi-comp": ERROR, // Prevent multiple component definition per file
    // "react/no-redundant-should-component-update": ERROR, // Prevent usage of shouldComponentUpdate when extending React.PureComponent
    // "react/no-render-return-value": ERROR, // Prevent usage of the return value of React.render
    // "react/no-set-state": ERROR, // Prevent usage of setState
    // "react/no-typos": ERROR, // Prevent common casing typos
    // "react/no-string-refs": ERROR, // Prevent using string references in ref attribute.
    // "react/no-this-in-sfc": ERROR, // Prevent using this in stateless functional components
    // "react/no-unescaped-entities": ERROR, // Prevent invalid characters from appearing in markup
    // "react/no-unknown-property": ERROR, // Prevent usage of unknown DOM property (fixable)
    // "react/no-unsafe": ERROR, // Prevent usage of unsafe lifecycle methods
    // "react/no-unused-prop-types": ERROR, // Prevent definitions of unused prop types
    // "react/no-unused-state": ERROR, // Prevent definitions of unused state properties
    // "react/no-will-update-set-state": ERROR, // Prevent usage of setState in componentWillUpdate
    // "react/prefer-es6-class": ERROR, // Enforce ES5 or ES6 class for React Components
    // "react/prefer-stateless-function": ERROR, // Enforce stateless React Components to be written as a pure function
    // "react/prop-types": ERROR, // Prevent missing props validation in a React component definition
    // "react/react-in-jsx-scope": ERROR, // Prevent missing React when using JSX
    // "react/require-default-props": ERROR, // Enforce a defaultProps definition for every prop that is not a required prop
    // "react/require-optimization": ERROR, // Enforce React components to have a shouldComponentUpdate method
    // "react/require-render-return": ERROR, // Enforce ES5 or ES6 class for returning value in render function
    // "react/self-closing-comp": ERROR, // Prevent extra closing tags for components without children (fixable)
    // "react/sort-comp": ERROR, // Enforce component methods order (fixable)
    // "react/sort-prop-types": ERROR, // Enforce propTypes declarations alphabetical sorting
    // "react/state-in-constructor": ERROR, // Enforce the state initialization style to be either in a constructor or with a class property
    // "react/style-prop-object": ERROR, // Enforce style prop value being an object
    // "react/void-dom-elements-no-children": ERROR, // Prevent void DOM elements (e.g. <img />, <br />) from receiving children

    // // jsx
    // "react/jsx-boolean-value": ERROR, // Enforce boolean attributes notation in JSX (fixable)
    // "react/jsx-child-element-spacing": ERROR, // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions.
    // "react/jsx-closing-bracket-location": ERROR, // Validate closing bracket location in JSX (fixable)
    // "react/jsx-closing-tag-location": ERROR, // Validate closing tag location in JSX (fixable)
    // "react/jsx-curly-spacing": ERROR, // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions (fixable)
    // "react/jsx-equals-spacing": ERROR, // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    // "react/jsx-filename-extension": ERROR, // Restrict file extensions that may contain JSX
    // "react/jsx-first-prop-new-line": ERROR, // Enforce position of the first prop in JSX (fixable)
    // "react/jsx-handler-names": ERROR, // Enforce event handler naming conventions in JSX
    // "react/jsx-indent": ERROR, // Validate JSX indentation (fixable)
    // "react/jsx-indent-props": ERROR, // Validate props indentation in JSX (fixable)
    // "react/jsx-key": ERROR, // Validate JSX has key prop when in array or iterator
    // "react/jsx-max-depth": ERROR, // Validate JSX maximum depth
    // "react/jsx-max-props-per-line": ERROR, // Limit maximum of props on a single line in JSX (fixable)
    // "react/jsx-no-bind": ERROR, // Prevent usage of .bind() and arrow functions in JSX props
    // "react/jsx-no-comment-textnodes": ERROR, // Prevent comments from being inserted as text nodes
    // "react/jsx-no-duplicate-props": ERROR, // Prevent duplicate props in JSX
    // "react/jsx-no-literals": ERROR, // Prevent usage of unwrapped JSX strings
    // "react/jsx-no-target-blank": ERROR, // Prevent usage of unsafe target='_blank'
    // "react/jsx-no-undef": ERROR, // Disallow undeclared variables in JSX
    // "react/jsx-one-expression-per-line": ERROR, // Limit to one expression per line in JSX
    // "react/jsx-curly-brace-presence": ERROR, // Enforce curly braces or disallow unnecessary curly braces in JSX
    // "react/jsx-fragments": ERROR, // Enforce shorthand or standard form for React fragments
    // "react/jsx-pascal-case": ERROR, // Enforce PascalCase for user-defined JSX components
    // "react/jsx-props-no-multi-spaces": ERROR, // Disallow multiple spaces between inline JSX props (fixable)
    // "react/jsx-props-no-spreading": ERROR, // Disallow JSX props spreading
    // "react/jsx-sort-default-props": ERROR, // Enforce default props alphabetical sorting
    // "react/jsx-sort-props": ERROR, // Enforce props alphabetical sorting (fixable)
    // "react/jsx-space-before-closing": ERROR, // Validate spacing before closing bracket in JSX (fixable)
    // "react/jsx-tag-spacing": ERROR, // Validate whitespace in and around the JSX opening and closing brackets (fixable)
    "react/jsx-uses-react": ERROR, // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": ERROR, // Prevent variables used in JSX to be incorrectly marked as unused
    // "react/jsx-wrap-multilines": ERROR, // Prevent missing parentheses around multilines JSX (fixable)

    // errors
    "for-direction": ERROR,
    "getter-return": ERROR,
    "no-async-promise-executor": ERROR,
    "no-await-in-loop": ERROR,
    "no-compare-neg-zero": ERROR,
    "no-cond-assign": [ERROR, "always"],
    "no-constant-condition": [ERROR, { checkLoops: true }],
    "no-debugger": ERROR,
    "no-dupe-args": ERROR,
    "no-dupe-keys": ERROR,
    "no-duplicate-case": ERROR,
    "no-ex-assign": ERROR,
    "no-extra-boolean-cast": ERROR,
    "no-func-assign": ERROR,
    "no-inner-declarations": ERROR,
    "no-obj-calls": ERROR,
    "no-irregular-whitespace": ERROR,
    "no-misleading-character-class": ERROR,
    "no-sparse-arrays": ERROR,
    "no-prototype-builtins": ERROR,
    "no-unexpected-multiline": ERROR,
    "no-unreachable": ERROR,
    "no-unsafe-finally": ERROR,
    "no-unsafe-negation": ERROR,
    "valid-typeof": ERROR,
    "use-isnan": ERROR,
    "require-atomic-updates": ERROR,

    // best practices
    "accessor-pairs": ERROR,
    "array-callback-return": ERROR,
    "block-scoped-var": ERROR,
    "class-methods-use-this": OFF,
    complexity: OFF,
    "consistent-return": OFF,
    curly: OFF,
    "default-case": ERROR,
    "dot-location": OFF,
    "dot-notation": ERROR,
    eqeqeq: ERROR,
    "guard-for-in": ERROR,
    "max-classes-per-file": ERROR,
    "no-alert": OFF,
    "no-caller": ERROR,
    "no-case-declarations": ERROR,
    "no-div-regex": ERROR,
    "no-else-return": ERROR,
    "no-empty-function": OFF,
    "no-empty-pattern": ERROR,
    "no-eq-null": ERROR,
    "no-eval": ERROR,
    "no-extend-native": ERROR,
    "no-extra-bind": ERROR,
    "no-extra-label": OFF,
    "no-fallthrough": ERROR,
    "no-floating-decimal": ERROR,
    "no-global-assign": ERROR,
    "no-implicit-coercion": ERROR,
    "no-implicit-globals": ERROR,
    "no-implied-eval": ERROR,
    "no-invalid-this": OFF, // throws errors on class properties using fat arrow syntax
    "no-iterator": ERROR,
    "no-labels": ERROR,
    "no-lone-blocks": ERROR,
    "no-loop-func": ERROR,
    "no-magic-numbers": OFF,
    "no-multi-spaces": ERROR,
    "no-multi-str": ERROR,
    "no-new": ERROR,
    "no-new-func": ERROR,
    "no-new-wrappers": ERROR,
    "no-octal": ERROR,
    "no-octal-escape": ERROR,
    "no-param-reassign": ERROR,
    "no-proto": ERROR,
    "no-redeclare": OFF,
    "no-restricted-properties": OFF, // if undernet's api changes, this should become relevant
    "no-return-assign": ERROR,
    "no-return-await": ERROR,
    "no-script-url": ERROR,
    "no-self-assign": ERROR,
    "no-self-compare": ERROR,
    "no-sequences": ERROR,
    "no-throw-literal": ERROR,
    "no-unmodified-loop-condition": ERROR,
    "no-unused-expressions": ERROR,
    "no-unused-labels": OFF,
    "no-useless-call": ERROR,
    "no-useless-catch": ERROR,
    "no-useless-concat": ERROR,
    "no-useless-escape": ERROR,
    "no-useless-return": ERROR,
    "no-void": ERROR,
    "no-warning-comments": ERROR,
    "no-with": ERROR,
    "prefer-named-capture-group": OFF,
    "prefer-promise-reject-errors": ERROR,
    radix: OFF,
    "require-await": ERROR,
    "require-unicode-regexp": OFF,
    "vars-on-top": ERROR,
    "wrap-iife": ERROR,
    yoda: [ERROR, "never", { exceptRange: true }],

    // variables
    "init-delcarations": OFF,
    "no-delete-var": ERROR,
    "no-label-var": OFF,
    "no-restricted-globals": OFF,
    "no-shadow": ERROR,
    "no-shadow-restricted-names": ERROR,
    "no-undef": ERROR,
    "no-undef-init": ERROR,
    "no-undefined": OFF,
    "no-unused-vars": ERROR,
    "no-use-before-define": ERROR,

    // stylistic
    "no-mixed-spaces-and-tabs": ERROR,

    // es6
    "arrow-parens": OFF,
    "arrow-spacing": ERROR,
    "constructor-super": ERROR,
    "no-class-assign": ERROR,
    "no-const-assign": ERROR,
    "no-dupe-class-members": ERROR,
    "no-duplicate-imports": ERROR,
    "no-new-symbol": ERROR,
    "no-this-before-super": ERROR,
    "no-useless-constructor": ERROR,
    "no-useless-rename": ERROR,
    "no-var": ERROR,
    "object-shorthand": [ERROR, "always"],
    "prefer-const": ERROR,
    "prefer-spread": ERROR,
    "prefer-template": ERROR,
    "require-yield": ERROR,

    // used for undernet only
    "no-console": OFF,
  },
}
