
# Championing a proposal at TC39

*This article is written for TC39 delegates (see [joining TC39](https://github.com/tc39/how-we-work/blob/master/join-tc39.md)). If you're not a delegate, you can help proposal champions out with some of these tasks as well, but some of the work involves being physically present at TC39 meetings, delivering presentations, and building consensus in committee.*

So, you want to propose a new feature for JavaScript? That proposal needs a TC39 delegate as a champion to move it through the [stage process](https://tc39.es/process-document/). This document describes how to do that.

Championing a proposal is an exercise of parallel work in developing a proposal outside of committee, together with presentations to the committee to collect more ideas, feedback, and eventually to advance proposals through stages. The work outside of committee rarely needs to block on progress in the committee, but committee stage advancement can be a good acknowledgement of milestones and buy-in. Promotion to Stage 4 is required for a feature to be added to the JavaScript specification.

## Work outside of committee

Most of the work supporting a proposal can be done outside of TC39, without blocking on the committee's approval. Moving this work ahead can build more evidence for advancing stages in TC39. Some components of this work are:

- **[Explainer](https://github.com/tc39/how-we-work/blob/master/explainer.md)**: A well-written README in your proposal repository which explains the purpose and shape of the proposal at a high level.
- **[Documentation](https://github.com/tc39/how-we-work/issues/49)**: Explanations written for JavaScript developers to use the proposal.
- **[Implementations](https://github.com/tc39/how-we-work/blob/master/implement.md)**: Allow programmers to experiment with the proposal, whether it's in transpilers/polyfills or behind a flag/in a branch of a native implementation.
- **[Tests](https://github.com/tc39/how-we-work/issues/6)**: Tests that check the correctness of implementations--these can initially be checked in alongside implementations, but useful to eventually migrate to test262.
- **Collecting feedback**: Learn what people think about the proposal by talking with them about it, seeing what they think of experimenting programming with it, etc. It can be helpful to get feedback from JS developers, implementers, academics, educators, community leaders, and more, from inside and outside of the committee.

### Managing a GitHub repository

Each staged proposal should have a GitHub repository, included in the tc39 organization once the proposal is presented to the committee. A good place to start is by copying (not forking) the [template-for-proposals](https://github.com/tc39/template-for-proposals#create-your-proposal-repo) repository. Your proposal's repository should include resources like the explainer, draft specification text, and sometimes draft implementations or example programs. The repository's issue tracker can be used to discuss design issues with the committee and the community. These proposal repositories are managed in accordance with [TC39's Code of Conduct](https://tc39.es/code-of-conduct/).

#### Stage process tracking issue

To work through the stage process, a tracking issue in the GitHub repository can be useful. Below is a template you can use for such a tracking issue:

## Stage 4

- [ ] committee approval
- [ ] implement in two browsers
- [ ] significant in-the-field experience
- [ ] merge test262 tests
- [ ] write test262 tests
- [ ] prepare ecma262 PR
- [ ] editor-approved ecma262 PR

## Stage 3

- [ ] committee approval
- [ ] spec editor signoff
- [ ] spec reviewer signoff
- [ ] received developer/implementor feedback

## Stage 2

- [ ] committee approval
- [ ] spec text written
- [ ] spec reviewers selected

## Stage 1

- [ ] introduced to TC39
- [ ] champion(s) identified
- [ ] initial explainer

## Moving through the stages in committee

Building on the [authoritative documentation for the stage process](https://tc39.es/process-document/), this section builds on that with some additional practical advice for activities which may be helpful at various stages.

Stage advancement happens in TC39 meetings, when a proposal is presented to the committee, based on consensus of the committee that the proposal should advance to the stage. See [presentation advice](https://github.com/tc39/how-we-work/blob/master/presenting.md) for more details.

### Stage 1

Entrance criteria from the process document:

> - Identified “champion” who will advance the addition
> - Prose outlining the problem or need and the general shape of a solution
> - Illustrative examples of usage
> - High-level API
> - Discussion of key algorithms, abstractions and semantics
> - Identification of potential “cross-cutting” concerns and implementation challenges/complexity

Acceptance signifies:
> The committee expects to devote time to examining the problem space, solutions and cross-cutting concerns

Leading up to Stage 1,

- **Identify a champion (or champion group) in committee**. Unfortunately, TC39 doesn't have a comprehensive way for non-committee members to find committee mentors/champions for their proposals, but existing forums include [TC39 discourse forum](https://es.discourse.group) and [es-discuss mailing list](https://esdiscuss.org); another is the Matrix room #tc39-general ([instructions](matrix-guide.md)). Many TC39 delegates can be found on Twitter as well.
- **Write an explainer**. See [explainer.md](https://github.com/tc39/how-we-work/blob/master/explainer.md) for advice on how to write the introductory document to fulfill the rest of the Stage 1 requirements.
- **Prepare a presentation** to get the committee thinking about what they want to do in this design area, and if you have specific ideas, make the case for moving in that direction. See [presenting.md](https://github.com/tc39/how-we-work/blob/master/presenting.md) for advice about presentations.

Stage 1 represents more that the committee is thinking into this design space, rather than any sort of consensus on moving JavaScript in a particular direction.

Following Stage 1 (or even before), it could be useful to do some of the following:

- **Consult with JavaScript developers** on what kinds of problems they are facing in this area, and what sorts of solutions at the language level might help them.
- If there are some points of standing disagreement, **bring them up for discussion in GitHub issues**, and consider pursuing detailed analysis of multiple solutions.
- **Write documentation, draft implementations, tests**, etc. about early proposed solutions.
- **Be responsive on GitHub**, answering questions raised and considering the points raised by commenters.
- **Move the proposal repository into the tc39 org** following [these instructions](https://github.com/tc39/proposals#onboarding-existing-proposals).

### Stage 2

Entrance criteria from the process document:

> - Initial spec text

Acceptance signifies:
> The committee expects the feature to be developed and eventually included in the standard

Leading up to Stage 2,

- **Develop a full first draft of the solution**. These don't need to be the final answers for all questions on syntax or semantics, but there should be a coherent initial proposal which you feel some confidence in. The explainer should be updated to document the Stage 2 solution.
- **Write initial spec text**. This text doesn't need to be 100% complete, but should roughly cover the surface of the solution. <!--TODO: Link to spec writing advice document-->
- **Prepare a presentation** outlining the proposal and why the committee should agree to include it in the standard.

By the time a proposal gets to Stage 2, we have agreement that we want to go ahead with something like this proposal, eventually becoming standard JavaScript.

Following Stage 2 (or even before), it could be useful to do some of the following:

- **Keep talking with JavaScript developers** and working towards solutions.
- If looking into multiple paths, work towards **drawing them to a close** some time before Stage 3 (this could be before Stage 2).
- During Stage 2, it's even more important to **have a good implementation for testing**. This is not a stage process requirement, but it's extremely useful to get feedback from real usage before advancing to Stage 3 and declaring a certain amount of finished-ness for the proposal. The same goes for strong documentation.
- Ideally, the big questions are worked out earlier, maybe before Stage 2, and during Stage 2, **finer and finer points of detail** are being discussed and worked through, both in issues and discussions in TC39 meetings.
- In the TC39 meeting where a proposal is advanced to Stage 2, it's traditional to **choose Stage 3 reviewers**.

### Stage 3

Entrance criteria from the process document:

> - Complete spec text
> - Designated reviewers have signed off on the current spec text
> - All ECMAScript editors have signed off on the current spec text

Acceptance signifies:
> The solution is complete and no further work is possible without implementation experience, significant usage and external feedback.

Leading up to Stage 3,

- **Where possible, resolve all syntax and semantics questions about the specification**. In Stage 3, the design should be as complete as possible. This means that the outreach to JavaScript developers, and experimentation with transpilers/polyfills, is deemed to be sufficient to draw such a conclusion on the design. There still may be open questions that can only be answered by implementations, e.g., in proposals that can't be polyfilled/transpiled, or in questions about implementation efficiency.
- **Complete the specification text**. The specification text should describe the whole proposal, with all the details, based on all the design discussions that have occurred.
- **Get Stage 3 reviews** from designated reviewers and editors. It's useful to email the reviewers and editors a few weeks in advance of the TC39 meeting to ask how the reviews are going, if you haven't heard back yet.
- **Prepare a presentation** explaining the details of the proposal and their rationale, asking for advancement to Stage 3.

Following Stage 3 (or even before),

- **Write test262 tests**. These tests can be merged on Stage 3 proposals. Make sure to include feature flags that indicate which proposal they are. The process of writing these tests can often expose errors in the specification text, and it's incredibly useful to ensure that implementations are aligned.
- **Work on various implementations**. Critically, it's important at this point to tease out all implementation constraints. For example, some designs may meet Stage 3 requirements, but have the side-effect of making existing JavaScript programs slower--that's likely to be highly undesirable. Even if you don't complete an implementation everywhere, discussing details with implementers in various JavaScript engines to understand their constraints about what's feasible and optimizable can be very useful in understanding if further changes may be needed.
- **Communicate the decisions made to the broader community**. Ideally, at this point, broad community feedback will have already been collected and taken into account, and further design debate is no longer necessary.

### Stage 4

Entrance criteria from the process document:

> - Test262 acceptance tests have been written for mainline usage scenarios, and merged
> - Two compatible implementations which pass the acceptance tests
> - Significant in-the-field experience with shipping implementations, such as that provided by two independent VMs
> - A pull request has been sent to tc39/ecma262 with the integrated spec text
> - All ECMAScript editors have signed off on the pull request

Acceptance signifies:
> The addition will be included in the soonest practical standard revision

Leading up to Stage 4, create the following

- **At least two specification-compliant implementations.** One good place to work on these implementations is the JavaScript engines that back web browsers and/or Node.js--[V8](https://v8.dev/), [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore) and [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey). This is a great way to get implementations out to many JS developers, and it forces the full set of constraints about performance. If all implementations are in e.g., transpilers, the committee might not be convinced that there is significant implementation experience, e.g., as transpilers don't implement features like `eval` which often present particular difficulties.
- **Full test262 tests.** These tests should aim to cover the entire specification, if possible.
- **A PR against the main specification**. Earlier specification text might take certain shortcuts, but this isn't acceptable for the final PR; this may involve writing out details for certain repetitive specification algorithms, for example. Editors notes present in earlier drafts should be converted to ordinary notes or deleted.
- **Prepare a presentation** summarizing the positive implementation and test experience, asking the committee for promotion to Stage 4.

Once a proposal reaches Stage 4,

- **Archive the proposal repository**. A proposal at Stage 4 will not have further changes; any future changes would be separate proposals against the main specification.
- **Ensure that good documentation is available**. Ideally, you developed documentation earlier in the proposal process; now, it's essential that documentation at all levels be good quality for a broad community of JavaScript developers to use.
- **Ensure polyfills/shims conditionally make use of native implementations when possible** Once a proposal is at Stage 4, it makes sense to defer to the built-in implementation when it is both available and correct. This allows developers to benefit from better performance of native implementations whenever possible, without sacrificing correctness. It's helpful for polyfills/shims to rigorously check a native implementation when present for known bugs and deviations, and not to merely check the presence of a native implementation. However, there are compatibility risks to widely deploying in a form that relies on modifying the global environment, especially before the proposal is standard - it can be helpful to consume a polyfill that does not self-install on the environment.
