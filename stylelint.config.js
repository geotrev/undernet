const ALWAYS = "always"
const NEVER = "never"

// Some rules are either unnecessary or conflict with prettier's formatting rules
// Instead of fighting prettier, those rules are disabled.
// Prettier generally formats reasonably well, so this is actually a good thing.
const DISABLED = null
// To check if prettier has collisions with stylelint, run:
// npm run `scss:lint:check`

module.exports = {
  plugins: ["stylelint-scss"],
  extends: ["stylelint-config-prettier"],
  rules: {
    // CSS
    // https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md

    "at-rule-blacklist": ["debug"],
    "at-rule-empty-line-before": DISABLED,
    "at-rule-name-case": DISABLED,
    "at-rule-name-newline-after": DISABLED,
    "at-rule-name-space-after": ALWAYS,
    "at-rule-no-unknown": DISABLED,
    "at-rule-no-vendor-prefix": true,
    "at-rule-property-requirelist": {},
    "at-rule-semicolon-newline-after": DISABLED,
    "at-rule-semicolon-space-before": NEVER,

    "block-closing-brace-empty-line-before": DISABLED,
    "block-closing-brace-newline-after": DISABLED,
    "block-closing-brace-newline-before": DISABLED,
    "block-closing-brace-space-after": DISABLED,
    "block-closing-brace-space-before": DISABLED,
    "block-no-empty": true,
    "block-opening-brace-newline-after": DISABLED,
    "block-opening-brace-newline-before": DISABLED,
    "block-opening-brace-space-after": DISABLED,
    "block-opening-brace-space-before": DISABLED,

    "color-hex-case": DISABLED,
    "color-hex-length": "long",
    "color-named": "always-where-possible",
    "color-no-hex": DISABLED,
    "color-no-invalid-hex": true,

    "comment-empty-line-before": ALWAYS,
    "comment-no-empty": true,
    "comment-whitespace-inside": ALWAYS,
    "comment-word-blacklist": [],

    "custom-media-pattern": DISABLED,
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
    "declaration-block-semicolon-newline-after": DISABLED,
    "declaration-block-semicolon-newline-before": DISABLED,
    "declaration-block-semicolon-space-after": DISABLED,
    "declaration-block-semicolon-space-before": DISABLED,
    "declaration-block-single-line-max-declarations": 1,
    "declaration-block-trailing-semicolon": DISABLED,
    "declaration-colon-newline-after": DISABLED,
    "declaration-colon-space-after": DISABLED,
    "declaration-colon-space-before": DISABLED,
    "declaration-empty-line-before": NEVER,
    "declaration-no-important": DISABLED,
    "declaration-property-unit-blacklist": {},
    "declaration-property-unit-whitelist": {},
    "declaration-property-value-blacklist": {},
    "declaration-property-value-whitelist": {},

    "font-family-name-quotes": "always-where-recommended",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "font-weight-notation": "named-where-possible",

    "function-blacklist": [],
    "function-calc-no-invalid": true,
    "function-calc-no-unspaced-operator": true,
    "function-comma-newline-after": DISABLED,
    "function-comma-newline-before": DISABLED,
    "function-comma-space-after": DISABLED,
    "function-comma-space-before": DISABLED,
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-max-empty-lines": DISABLED,
    "function-name-case": "lower",
    "function-parentheses-newline-inside": DISABLED,
    "function-parentheses-space-inside": DISABLED,
    "function-url-no-scheme-relative": true,
    "function-url-quotes": ALWAYS,
    "function-url-scheme-blacklist": [],
    "function-url-scheme-whitelist": [],
    "function-whitelist": DISABLED,
    "function-whitespace-after": DISABLED,

    indentation: DISABLED,

    "keyframe-declaration-no-important": true,
    "keyframes-name-pattern": DISABLED,

    "length-zero-no-unit": true,

    linebreaks: "unix",

    "max-empty-lines": DISABLED,
    "max-line-length": DISABLED,
    "max-nesting-depth": [3, { ignore: ["pseudo-classes", "blockless-at-rules"] }],

    "media-feature-colon-space-after": ALWAYS,
    "media-feature-colon-space-before": NEVER,
    "media-feature-name-blacklist": [],
    "media-feature-name-case": DISABLED,
    "media-feature-name-no-unknown": true,
    "media-feature-name-no-vendor-prefix": DISABLED,
    "media-feature-name-value-whitelist": DISABLED,
    "media-feature-name-whitelist": DISABLED,
    "media-feature-parentheses-space-inside": NEVER,
    "media-feature-range-operator-space-after": NEVER,
    "media-feature-range-operator-space-before": NEVER,

    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-empty-first-line": true,
    "no-eol-whitespace": DISABLED,
    "no-extra-semicolons": DISABLED,
    "no-invalid-double-slash-comments": true,
    "no-missing-end-of-source-newline": DISABLED,
    "no-unknown-animations": true,

    "number-leading-zero": DISABLED,
    "number-max-precision": DISABLED,
    "number-no-trailing-zeros": DISABLED,

    "property-blacklist": [],
    "property-case": DISABLED,
    "property-no-unknown": true,
    "property-no-vendor-prefix": DISABLED,
    "property-whitelist": DISABLED,

    // This will be flagged by the script `scss:lint:check`
    // Please ignore the error :)
    "rule-empty-line-before": [ALWAYS, { except: ["first-nested"], ignore: ["after-comment"] }],

    "selector-attribute-brackets-space-inside": NEVER,
    "selector-attribute-operator-blacklist": [],
    "selector-attribute-operator-space-after": NEVER,
    "selector-attribute-operator-space-before": NEVER,
    "selector-attribute-operator-whitelist": DISABLED,
    "selector-attribute-quotes": ALWAYS,
    "selector-class-pattern": DISABLED,
    "selector-combinator-blacklist": [],
    "selector-combinator-space-after": DISABLED,
    "selector-combinator-space-before": DISABLED,
    "selector-combinator-whitelist": DISABLED,
    "selector-descendant-combinator-no-non-space": DISABLED,
    "selector-id-pattern": DISABLED,
    "selector-list-comma-newline-after": DISABLED,
    "selector-list-comma-newline-before": DISABLED,
    "selector-list-comma-space-after": DISABLED,
    "selector-list-comma-space-before": DISABLED,
    "selector-max-attribute": DISABLED,
    "selector-max-class": DISABLED,
    "selector-max-combinators": DISABLED,
    "selector-max-compound-selectors": DISABLED,
    "selector-max-empty-lines": DISABLED,
    "selector-max-id": 1,
    "selector-max-pseudo-class": 2,
    "selector-max-specificity": DISABLED,
    "selector-max-type": 3,
    "selector-max-universal": 1,
    "selector-nested-pattern": DISABLED,
    "selector-no-qualifying-type": [true, { ignore: ["attribute", "class"] }],
    "selector-no-vendor-prefix": DISABLED,
    "selector-pseudo-class-blacklist": [],
    "selector-pseudo-class-case": DISABLED,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-class-parentheses-space-inside": NEVER,
    "selector-pseudo-class-whitelist": DISABLED,
    "selector-pseudo-element-blacklist": [],
    "selector-pseudo-element-case": DISABLED,
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": true,
    "selector-pseudo-element-whitelist": DISABLED,
    "selector-type-case": "lower",
    "selector-type-no-unknown": true,

    "shorthand-property-no-redundant-values": DISABLED,

    "string-no-newline": true,
    "string-quotes": DISABLED,

    "time-min-milliseconds": 150,

    "unicode-bom": NEVER,

    "unit-blacklist": [],
    "unit-case": DISABLED,
    "unit-no-unknown": true,
    "unit-whitelist": ["em", "%", "px", "vw", "vh", "s", "deg"],

    "value-keyword-case": DISABLED,
    "value-list-comma-newline-after": DISABLED,
    "value-list-comma-newline-before": DISABLED,
    "value-list-comma-space-after": DISABLED,
    "value-list-comma-space-before": DISABLED,
    "value-list-max-empty-lines": DISABLED,
    "value-no-vendor-prefix": DISABLED,

    // SCSS
    // https://github.com/kristerkari/stylelint-scss

    "scss/at-extend-no-missing-placeholder": null,
    "scss/at-else-closing-brace-newline-after": DISABLED,
    "scss/at-else-closing-brace-space-after": null,
    "scss/at-else-empty-line-before": NEVER,
    "scss/at-else-if-parentheses-space-before": null,
    "scss/at-function-named-arguments": NEVER,
    "scss/at-function-parentheses-space-before": null,
    "scss/at-function-pattern": null,
    "scss/at-if-closing-brace-newline-after": null,
    "scss/at-if-closing-brace-space-after": null,
    "scss/at-if-no-null": null,
    "scss/at-import-no-partial-leading-underscore": null,
    "scss/at-import-partial-extension": null,
    "scss/at-import-partial-extension-blacklist": null,
    "scss/at-import-partial-extension-whitelist": null,
    "scss/at-mixin-argumentless-call-parentheses": null,
    "scss/at-mixin-named-arguments": null,
    "scss/at-mixin-parentheses-space-before": null,
    "scss/at-mixin-pattern": null,
    "scss/at-each-key-value-single-line": null,
    "scss/at-rule-conditional-no-parentheses": null,
    "scss/at-rule-no-unknown": true,

    "scss/comment-no-loud": null,

    "scss/declaration-nested-properties": null,
    "scss/declaration-nested-properties-no-divided-groups": null,

    "scss/dimension-no-non-numeric-values": null,

    "scss/dollar-variable-colon-newline-after": null,
    "scss/dollar-variable-colon-space-after": null,
    "scss/dollar-variable-colon-space-before": null,
    "scss/dollar-variable-default": null,
    "scss/dollar-variable-empty-line-before": null,
    "scss/dollar-variable-no-missing-interpolation": null,
    "scss/dollar-variable-pattern": null,

    "scss/double-slash-comment-empty-line-before": null,
    "scss/double-slash-comment-inline": null,
    "scss/double-slash-comment-whitespace-inside": null,

    "scss/function-quote-no-quoted-strings-inside": null,
    "scss/function-unquote-no-unquoted-strings-inside": null,
    "scss/function-color-relative": null,

    "scss/map-keys-quotes": ALWAYS,

    "scss/media-feature-value-dollar-variable": null,

    "scss/no-dollar-variables": null,
    "scss/no-duplicate-dollar-variables": null,

    "scss/operator-no-newline-after": null,
    "scss/operator-no-newline-before": null,
    "scss/operator-no-unspaced": null,

    "scss/percent-placeholder-pattern": null,

    "scss/partial-no-import": null,

    "scss/selector-nest-combinators": null,
    "scss/selector-no-redundant-nesting-selector": null,
    "scss/selector-no-union-class-name": null,
  },
}
