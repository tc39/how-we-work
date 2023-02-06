# Implementing and shipping TC39 proposals

Beyond specification text and conformance tests, new JavaScript features need implementations, that is, code in JS engines, transpilers, tools, polyfills, etc. that makes them available to programmers. Implementers end up getting into every detail of a proposal, giving them a unique perspective, which helps TC39 validate proposals.

## Interaction with the stage process

It's never too early to draft an implementation, but different stages indicate different levels of stability and concreteness. Many implementations use runtime or compile-time flags to switch on or off TC39 proposals. This may be used to manage incomplete implementations or to refrain from shipping earlier stage designs from developers.

At **Stage 4**, a specification is *complete* and set to be included in the ECMAScript draft specification. Except in particular circumstances, the proposal is complete, stable and **ready to ship**. Implementations tend to turn on Stage 4 features by default, without any particular flags. Refraining from implementing and shipping a Stage 4 feature risks getting the implementation out of sync with others.

At **Stage 3**, the committee is strongly considering a feature and has *agreed on concrete details*. Implementation experience may still lead to semantic changes, and some Stage 3 features have been dropped entirely. Projects requiring stability tend to use a certain amount of **case-by-case judgement** before shipping Stage 3 features, if they ship them at all. (See "Stage 3 proposals which require implementer coordination" section below.)

At **Stage 0, 1, and 2**, semantic details are *up in the air*. The committee has not come to consensus on all of the concrete details of the proposal. Implementations at this stage should be considered **experimental and speculative**. Implementations at this stage can be very valuable to enable experimentation by programmers, which can help refine the language design. Implementations tend to expose this stage of feature via special flags which are not enabled by default.

## Transpiler implementations

Early language features can be prototyped in so-called "transpilers": JavaScript-to-JavaScript compilers which include support for newer language features in older JavaScript environments. Transpiler implementations of new language features can help collect feedback and drive incremental adoption.

One popular transpiler used for prototyping early JavaScript features is [Babel](https://babeljs.io/). For features which create new syntax, Babel's parser needs to be modified, which you can do in a fork and PR. In some cases, a Babel transform plugin may be sufficient, when existing syntactic constructs can be used (but note that, due to web compatibility issues, it is difficult to change the definition of its semantics in non-error cases for existing features).

## Library implementations

If the proposal is a standard library feature, and it's possible to implement this feature in JavaScript, it's helpful to get this feature out to developers to try it out, so they can give feedback. As it emerges as a standard, supported in some engines and not others, it remains useful to have this implementation as a backup, often called a "polyfill" or a “shim”. To encourage use, it's helpful to expose these implementations as modules in popular package managers such as [npm](https://www.npmjs.com/).

The best practice for implementations for early library proposals (pre-Stage 3, and Stage 3 is borderline, as discussed above) is to expose it as a module, rather than a global or property of an existing object; this is important for the evolution of the standard, so people don't accidentally depend on an early version being the final one. See [Polyfills and the evolution of the Web](https://www.w3.org/2001/tag/doc/polyfills/) for details.

## Testing

TC39 maintains conformance tests to validate JavaScript implementations against the specification in a project called [test262](https://github.com/tc39/test262/). To contribute to test262, see their [CONTRIBUTING.md](https://github.com/tc39/test262/blob/master/CONTRIBUTING.md). If you develop tests against a particular implementation, it's highly encouraged to upstream them in test262.

test262 includes tests for all Stage 4 proposals and some Stage 3 proposals. Earlier Stage 2 proposals may have tests posted in a [pull request](https://github.com/tc39/test262/pulls).

## Giving feedback to proposal champions

TC39 appreciates implementers! In addition to getting features to JS developers, the process of implementation gives detailed sense of the feature within the language as a whole and its various interactions, leading to important insights about the design.

All kinds of feedback are appreciated from implementers, whether it's about the motivation, high-level design, integration with various other systems, implementation complexity, or the semantics of edge cases. The best way to give feedback is through filing bugs in the GitHub repository. Feel free to make PRs against the draft proposal specification for suggested semantic changes, as well.

Champions want to hear from you. If you're working on an implementation and, e.g., are having trouble understanding the proposal or want help with an edge case, get in touch with the champion, either by filing the question as an issue in GitHub, writing them an email, or even asking for a call to go over things.

## Stage 3 proposals which require implementer consensus

Many JavaScript implementations ship proposals which are in Stage 3, given that that stage generally implies a high level of stability and completeness. However, there are several circumstances in which a Stage 3 proposal may be considered to “require implementer coordination”:

1. If consensus for Stage 3 were only given by the committee conditionally on certain issues being resolved (could be any of the following, or more).
1. If there are certain open questions around normative semantics (e.g., “bugs”) which the champion group agrees are not yet resolved. In general, for Stage 3 proposals, consensus has been established on all normative semantics; if someone disagrees with that consensus, it does not automatically make those questions open again. The typical case here would be a bug discovered in the course of implementation, whereas design concerns should generally be resolved to enter Stage 3.
1. If certain necessary integrations into host environments, e.g., HTML, are still under consideration without a clear resolution, a proposal is likely not ready to ship in the context of web browsers and may be unstable generally.
1. If implementers expect an especially high level of difficulty/risk with this proposal that can only be assessed with implementation experience in one or more engines, then they may adopt a working mode with multiple engines implementing in parallel and sharing experience, possibly feeding back into the normative semantics of the proposal, before shipping. Note that, in general, it is expected that some implementations will still be in progress in implementing while others go ahead and ship, however.

Any changes to a Stage 3 proposal require committee consensus to adopt. If changes are anticipated for one reason or another, a proposal can be seen as “requiring implementer consensus”. These conditions have long been discussed in committee and noted in meeting minutes, but recent cases of engines accidentally shipping features “too soon” motivate ensuring that the documentation of these conditions is made as clear as possible, so that the appropriate coordination can take place beforehand.

A Stage 3 proposal being marked as “requires implementer coordination” is distinct from demoting it to Stage 2. Demoting a proposal to Stage 2 requires consensus to achieve, and consensus to re-promote to Stage 3, whereas marking a proposal as “requires implementer coordination” is a ligher-weight operation requiring only documentation, not committee consensus.

> Note: The committee has considered adopting a formal “Stage 3.5” indicating readiness-to-ship, but there is currently no consensus in committee to adopt an additional consensus-seeking step. Some committee members are concerned that another consensus-seeking stage could slow committee velocity. Instead, the designation of “not ready to ship” is purely documentation rather than a process change. Engines may still make their own calls about whether to ship Stage 3 proposals, and there is no shift in TC39’s development model. The committee may still consider a formal “Stage 3.5” in the future.

In the proposals repository, in the table for Stage 3, there is a column for “requires implementer coordination”. By default, proposals which reach Stage 3 are not marked here. If there is a reason to mark a proposal as “not ready to ship”, it should generally be visible in meeting notes or an issue in the repository.

Proposal champions are often the ones best positioned to assess whether a proposal requires further coordination and should be the ones determining whether the table should be marked as “requires implementer coordination” (e.g., by noting this in committee, so it’s recorded in meeting minutes and then the table is updated), but in cases of absence/negligence of champions and serious issues arising, others in committee may mark the table appropriately. This document does not attempt to describe a process for resolving disputes in this area.

There is no procedural content to the “requires implementer coordination” marking, it is only documentation to assist in coordination of the committee and implementers, and not subject to committee consensus. Of course, a proposal which much of the committee feels is not ready to ship may have a hard time getting to Stage 4.

Once a JavaScript feature starts shipping in web browsers or other compatibility-sensitive environments, it becomes very difficult or impossible to make changes later. Remember to treat all decisions about declaring a feature as no longer requiring implementer coordination, as well as actually shipping it in an environment you control, with care.
