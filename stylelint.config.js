const ALWAYS = "always"
const NEVER = "never"

module.exports = {
  plugins: ["stylelint-scss"],
  extends: ["stylelint-config-prettier"],
  rules: {
    // CSS
    // https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md

    "at-rule-blacklist": ["debug"],
    "at-rule-name-space-after": ALWAYS,
    "at-rule-no-vendor-prefix": true,
    "at-rule-semicolon-space-before": NEVER,

    "block-no-empty": true,

    "color-hex-length": "long",
    "color-named": "always-where-possible",
    "color-no-invalid-hex": true,

    "comment-empty-line-before": ALWAYS,
    "comment-no-empty": true,
    "comment-whitespace-inside": ALWAYS,
    "comment-word-blacklist": [],

    "custom-property-empty-line-before": NEVER,
    "custom-property-pattern": "un-.+",

    "declaration-bang-space-after": NEVER,
    "declaration-bang-space-before": ALWAYS,
    "declaration-block-no-duplicate-properties": [
      true,
      { ignore: ["consecutive-duplicates-with-different-values"] },
    ],
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-single-line-max-declarations": 1,
    "declaration-empty-line-before": NEVER,

    "font-family-name-quotes": "always-where-recommended",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "font-weight-notation": "named-where-possible",

    "function-blacklist": [],
    "function-calc-no-invalid": true,
    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-name-case": "lower",
    "function-url-no-scheme-relative": true,
    "function-url-quotes": ALWAYS,

    "keyframe-declaration-no-important": true,

    "length-zero-no-unit": true,

    linebreaks: "unix",

    "max-nesting-depth": [3, { ignore: ["pseudo-classes", "blockless-at-rules"] }],

    "media-feature-colon-space-after": ALWAYS,
    "media-feature-colon-space-before": NEVER,
    "media-feature-name-blacklist": [],
    "media-feature-name-no-unknown": true,
    "media-feature-parentheses-space-inside": NEVER,
    "media-feature-range-operator-space-after": NEVER,
    "media-feature-range-operator-space-before": NEVER,

    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-empty-first-line": true,
    "no-invalid-double-slash-comments": true,
    "no-unknown-animations": true,

    "property-no-unknown": true,

    // This will be flagged by the script `scss:lint:check`
    // Please ignore the error :)
    "rule-empty-line-before": [ALWAYS, { except: ["first-nested"], ignore: ["after-comment"] }],

    "selector-attribute-brackets-space-inside": NEVER,
    "selector-attribute-operator-blacklist": [],
    "selector-attribute-operator-space-after": NEVER,
    "selector-attribute-operator-space-before": NEVER,
    "selector-attribute-quotes": ALWAYS,
    "selector-max-id": 1,
    "selector-max-pseudo-class": 2,
    "selector-max-type": 3,
    "selector-max-universal": 1,
    "selector-no-qualifying-type": [true, { ignore: ["attribute", "class"] }],

    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-class-parentheses-space-inside": NEVER,
    "selector-pseudo-element-blacklist": [],
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": true,
    "selector-type-case": "lower",
    "selector-type-no-unknown": true,

    "string-no-newline": true,

    "time-min-milliseconds": 150,

    "unit-blacklist": [],
    "unit-no-unknown": true,
    "unit-whitelist": ["em", "%", "px", "vw", "vh", "s", "ms", "deg"],

    // SCSS
    // https://github.com/kristerkari/stylelint-scss

    "scss/at-extend-no-missing-placeholder": true,
    "scss/at-else-empty-line-before": NEVER,
    "scss/at-function-parentheses-space-before": NEVER,
    "scss/at-import-no-partial-leading-underscore": true,
    "scss/at-import-partial-extension": NEVER,
    "scss/at-mixin-argumentless-call-parentheses": NEVER,
    "scss/at-mixin-parentheses-space-before": NEVER,
    "scss/at-each-key-value-single-line": true,
    "scss/at-rule-conditional-no-parentheses": true,
    "scss/at-rule-no-unknown": true,

    "scss/declaration-nested-properties": NEVER,

    "scss/dimension-no-non-numeric-values": true,

    "scss/dollar-variable-colon-space-after": ALWAYS,
    "scss/dollar-variable-colon-space-before": NEVER,
    "scss/dollar-variable-no-missing-interpolation": true,

    "scss/double-slash-comment-whitespace-inside": ALWAYS,

    "scss/function-quote-no-quoted-strings-inside": true,
    "scss/function-unquote-no-unquoted-strings-inside": true,

    "scss/map-keys-quotes": ALWAYS,

    "scss/operator-no-newline-after": true,
    "scss/operator-no-newline-before": true,
    "scss/operator-no-unspaced": true,

    "scss/selector-no-redundant-nesting-selector": true,
  },
}
