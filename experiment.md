# How to experiment with a proposal before Stage 4

For JavaScript programmers who want to be adventurous and give TC39 feedback on proposals, there are various ways they can try things out:

- For code which does not require maintenance across TC39 language design changes, experiment with the feature by turning it on using runtime or build-time flags, for example:
    - In Babel, enable the feature in your selected Babel preset (see [babel/proposals](https://github.com/babel/proposals/issues) for feature status).
    - Get advanced versions of web browsers such as Edge Insider Edition, Safari Tech Preview, Firefox Nightly, or Chrome Canary for certain new language features. See their release notes to learn what's included.
    - Use TypeScript, which implements several Stage 3 TC39 proposals.
    - In V8, turn the feature on by passing in a flag beginning with `--harmony` found in [flag-definitions.h](https://github.com/v8/v8/blob/master/src/flag-definitions.h). Note that some flagged implementations may be unstable or incomplete and should not generally be used in production.
        - In Node.js based on V8, the flag can be passed directly as such
        - Within Chrome, enable "experimental JavaScript features" in about:flags, or use the command-line argument `--js-flags=--harmony-<flagname>`.
- If implementations are missing, [add one](https://github.com/tc39/how-we-work/blob/master/implement.md)!
- When you have feedback on the proposal, file it as an issue in the GitHub repository of the proposal

WARNING: Proposals at Stage 3 and below are subject to significant change or removal.

