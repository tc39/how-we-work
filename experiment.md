# How to experiment with a proposal before Stage 4

For JavaScript programmers who want to be adventurous and give TC39 feedback on proposals, there are various ways they can try things out:

- For code which does not require maintenance across TC39 language design changes, experiment with the feature by turning it on using runtime or build-time flags, for example:
    - In Babel, enable the feature in [.babelrc](https://babeljs.io/docs/usage/babelrc/)
    - Get advanced versions of web browsers such as Edge Insider Edition, Safari Tech Preview, Firefox Nightly, or Chrome Canary for certain new language features. See their release notes to learn what's included.
    - In TypeScript, some features are enabled by a flag, for example [`--experimentalDecorators`](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
    - In V8, turn the feature on by passing in a flag beginning with `--harmony` found in [flag-definitions.h](https://github.com/v8/v8/blob/master/src/flag-definitions.h). Note that some flagged implementations may be unstable or incomplete and should not generally be used in production.
        - In Node.js based on V8, the flag can be passed directly as such
        - Within Chrome, enable "experimental JavaScript features" in about:flags, or use the command-line argument `--js-flags=--harmony-<flagname>`.
- If implementations are missing, [add one](https://github.com/tc39/how-we-work/blob/master/implement.md)!
- When you have feedback on the proposal, file it as an issue in the GitHub repository of the proposal

WARNING: Until a feature proposal is at Stage 4, it is subject to significant change or removal, though Stage 3 proposals are relatively stable.

