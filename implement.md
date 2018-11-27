# Implementing and shipping TC39 proposals

Beyond specification text and conformance tests, new JavaScript features need implementations, that is, code in JS engines, transpilers, tools, polyfills, etc. that makes them available to programmers. Implementers end up getting into every detail of a proposal, giving them a unique perspective, which helps TC39 validate proposals.

## Interaction with the stage process

It's never too early to draft an implementation, but different stages indicate different levels of stability and concreteness. Many implementations use runtime or compile-time flags to switch on or off TC39 proposals. This may be used to manage incomplete implementations or to refrain from shipping earlier stage designs from developers.

At Stage 4, a specification is complete and set to be included in the ECMAScript draft specification. Except in particular circumstances, the proposal is complete, stable and ready to ship. Implementations tend to turn on Stage 4 features by default, without any particular flags. Refraining from implementing and shipping a Stage 4 feature risks getting the implementation out of sync with others.

At Stage 3, the committee is strongly considering a feature and has agreed on concrete details. Implementation experience may still lead to semantic changes, and some Stage 3 features have been dropped entirely. Different projects have different policies with respect to shipping Stage 3 features by default; some implementations ship particularly advanced Stage 3 features by default, while others ship them only behind a flag.

At Stage 0, 1 and 2, semantic details are up in the air. The committee has not come to consensus on all of the concrete details of the proposal. Implementations at this stage should be considered experimental and speculative. Implementations at this stage can be very valuable to enable experimentation by programmers, which can help refine the language design. Implementations tend to expose this stage of feature via special flags which are not enabled by default.

## Testing

TC39 maintains conformance tests to validate JavaScript implementations against the specification in a project called [test262](https://github.com/tc39/test262/). To contribute to test262, see their [CONTRIBUTING.md](https://github.com/tc39/test262/blob/master/CONTRIBUTING.md). If you develop tests against a particular implementation, it's highly encouraged to upstream them in test262.

test262 includes tests for all Stage 4 proposals and some Stage 3 proposals. Earlier Stage 2 proposals may have tests posted in a [pull request](https://github.com/tc39/test262/pulls).

## Giving feedback to proposal champions

TC39 appreciates implementers! In addition to getting features to JS developers, the process of implementation gives detailed sense of the feature within the language as a whole and its various interactions, leading to important insights about the design.

All kinds of feedback are appreciated from implementers, whether it's about the motivation, high-level design, integration with various other systems, implementation complexity, or the semantics of edge cases. The best way to give feedback is through filing bugs in the GitHub repository. Feel free to make PRs against the draft proposal specfication for suggested semantic changes, as well.

Champions want to hear from you. If you're working on an implementation and, e.g., are having trouble understanding the proposal or want help with an edge case, get in touch with the champion, either by filing the question as an issue in GitHub, writing them an email, or even asking for a call to go over things.
