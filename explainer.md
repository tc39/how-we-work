# How to write a good explainer

Each TC39 proposal should have a README.md file which explains the purpose of the proposal and its shape at a high level. [This guide](https://github.com/w3ctag/w3ctag.github.io/blob/master/explainers.md) by the W3C TAG has a good introduction for web specifications

This page you're on has some additional advice for how to write an explainer for TC39 proposals, with an outline for content that you might want to include in your proposal's explainer. For some well-written explainers in recent proposals, see [Promise.allSettled](https://github.com/tc39/proposal-promise-allSettled), the [Temporal proposal](https://github.com/tc39/proposal-temporal), or [RegExp Unicode property escapes](https://github.com/tc39/proposal-regexp-unicode-property-escapes).

The rest of this page can be used as a template, to put in your README.md. Not all sections need to be included: This is just a series of optional suggestions. In *italics* is the instructions, and in plain text is the example text. Most of what's here besides the headings should be replaced by your own content.

----

# Frobnicator

## Status

Champion(s): *champion name(s)*
Author(s): *non-champion author(s), if applicable*
Stage: -1

## Motivation

*Why is this important to have in the JavaScript language?*

Frobnication comes up in all areas of computer science, in both front-end and back-end programming. See [CATB](http://catb.org/jargon/html/F/frobnicate.html) for details.

## Use cases

*Some realistic scenarios using the feature, with both code and description of the problem; more than one can be helpful.*

**Server-side static frobnication**: Say you want to frobnicate a thing. Then, you would normally have to do all this stuff. If it's in the standard library, it'd be easier.

```js
frobnicate({});
```

**Dynamic frobnicate cases**: The object is provided in a different way, and a different sort of use case comes up, which can be met by the same feature.

## Description

*Developer-friendly documentation for how to use the feature*

`frobnicate(object)` returns the frobnication of object.

## Comparison

*A comparison across various related programming languages and/or libraries. If this is the first sort of language or library to do this thing, explain why that is the case. If this is a standard library feature, a comparison across the JavaScript ecosystem would be good; if it's a syntax feature, that might not be practical, and comparisons may be limited to other programming languages.*

These npm modules do something like the proposal:
- [frobnicate-2018](https://www.npmjs.com/package/frobnicate-2018)
- [B](link)
- [C](link)

frobnicate-2018 is weird because xyz, whereas B is weird because jkl, so we take a version of the approach in C, modified by qrs.

The standard libraries of these programming languages includes related functionality:
- APL (links to the relevant documentation for each of these)
- PostScript
- Self
- XSLT
- Emacs Lisp

Our approach is pretty similar to the Emacs Lisp approach, and it's clear from a manual analysis of billions of Stack Overflow posts that this is the most straightforward to ordinary developers.

## Implementations

### Polyfill/transpiler implementations

*A JavaScript implementation of the proposal, ideally packaged in a way that enables easy, realistic experimentation. See [implement.md](https://github.com/tc39/how-we-work/blob/master/implement.md) for details on creating useful prototype implementations.*

You can try out an implementation of this proposal in the npm package [frobnicate](https://www.npmjs.com/package/frobnicate). Note, this package has semver major version 0 and is subject to change.

### Native implementations

*For Stage 3+ proposals, and occasionally earlier, it is helpful to link to the implementation status of full, end-to-end JavaScript engines. Filing these issues before Stage 3 is somewhat unnecessary, though, as it's not very actionable.*

- [V8]() (*Links to tracking issues in each JS engine*)
- [JSC]()
- [SpiderMonkey]()
- ...

## Q&A

*Frequently asked questions, or questions you think might be asked. Issues on the issue tracker or questions from past reviews can be a good source for these.*

**Q**: Why is the proposal this way?

**A**: Because reasons!

**Q**: Why does this need to be built-in, instead of being implemented in JavaScript?

**A**: We could encourage people to continue doing this in user-space. However, that would significantly increase load time of web pages. Additionally, web browsers already have a built-in frobnicator which is higher quality.

**Q**: Is it really necessary to create such a high-level built-in construct, rather than using lower-level primitives?

**A**: Instead of providing a direct `frobnicate` method, we could expose more basic primitives to compose an md5 hash with rot13. However, rot13 was demonstrated to be insecure in 2012 (citation), so exposing it as a primitive could serve as a footgun.
