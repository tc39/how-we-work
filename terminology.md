The purpose of this doc is to collect some of the most common terms/considerations that come up while designing features for Javascript at TC39.

These aren’t, by any means, meant to be taken as patterns/principles in that, often, they inform rather than prescribe: historically, they are never taken as a hard design constraint or direction but rather considerations that inform tradeoffs between design choices.

### How to add definitions

When you add a definition, make sure that the definition applies to how TC39 uses it. Some other
communities might have similar terms, but they mean a different thing in this case. Otherwise, feel
free to reference well known definitions so that people know what they mean.

Anatomy of a good definition:
- in simple words, what is it? Imagine describing it to someone who has no experience
- a minimal example
- sources and resources where people can learn more
- related definitions (optional)

# Glossary

These are common terms used while discussing language features.

### Bikeshedding

#### Definition:

The process of discussing a trivial matter at the expense of the topic that actually
needs discussion. This can take time away from important topics, and its important to catch
ourselves if we start bikeshedding!

#### Example:
We were supposed to discuss how this new proposal should work, but we spent the entire time discussing what the
name should be. We should avoid such bikeshedding.

#### Sources
[wikipedia](https://en.wiktionary.org/wiki/bikeshedding):

### Brand Check

#### Definition:

Brand check ("brand" as in a mark, or a brand made with a branding iron) is a term used by TC39
to describe a check against a unique datatype whose creation is controlled by a piece of code.

#### Example:

One example of this is built in JavaScript datatypes, which are unique and cannot be made in user
space. `Array.isArray` is an example of a brand check. For reference see [this
discussion](https://esdiscuss.org/topic/tostringtag-spoofing-for-null-and-undefined#content-3).

A common misconception is that `instanceof` is a brand check. This is a nominal type check and does
not reliably determine the type. It used to be that a brand check was only possible for built in
types. For a more detailed explanation, see [this write
up](https://github.com/tc39/how-we-work/pull/30#issuecomment-391588889)

It is now possible to implement brand checks in user space as long as there is a way to identify that the object is unique.

Imagine a library that implements DOM queries and returns a `query` object. The author of this
library may be interested in being able to modify the implementation of the `query` object without
breaking the programs of users of the library. However, returning plain objects such as ` { type:
"queryResult", elements: [ ...... ] }` is not safe, as anyone can return such an object and create a
forgery of a `query` object. In order to avoid this, the library must make a brand check to ensure
that this object indeed belongs to the library. That can be done like so:

```javascript
const queries = new WeakMap();

class Query {
  // ...

  performQuery(queryString) {
    // returns the query object
    return { type: "queryResult", elements: [ ...... ] };
  }

  get query(query) {
    queries.get(query); // verifies that the query exists as a member of the WeakMap
  }

  set query(queryString) {
    // generate a query object
    const query = this.performQuery(queryString);
    // use the object itself as the key
    queries.set(query, ...);
  }
}
```

#### Sources
- [ES Discuss comment](https://esdiscuss.org/topic/tostringtag-spoofing-for-null-and-undefined#content-3)
- [Clarifying comment on GitHub](https://github.com/tc39/how-we-work/pull/30#issuecomment-391588889)

### Tail call, PTC (proper tail call), STC (syntactic tail call)

#### Definition:
A _tail call_ is a call which occurs as the final operation of a function and whose value is returned immediately. It is possible for such a call to reuse or replace the current stack frame, in which case it is known as a _proper_ tail call (PTC). PTC semantics are part of the standard as of ES6, but their implementation in various engines has been fraught with controversy. In particular, reluctance to the automatic nature of PTC led to an alternative _syntactic_ tail call (STC) proposal, in which users would consciously choose this behavior by means of a keyword. PTC is currently only shipped by JSC, while STC remains an open but inactive proposal.

#### Example:
```js
function factorial(n) {
  // Not a tail call -- we still need to multiply by n after the call
  return (n <= 1) ? 1 : n * factorial(n - 1);
}

function factorial(n, acc = 1) {
  // Tail call -- achieved by passing an accumulator argument
  return (n <= 1) ? acc : factorial(n - 1, n * acc);
}

function factorial(n, acc = 1) {
  // Tail call with opt-in stack frame elision (STC example)
  return (n <= 1) ? acc : continue factorial(n - 1, n * acc);
}
```

#### Sources
- [PTC specification](https://tc39.github.io/ecma262/#sec-tail-position-calls)
- [STC proposal](https://github.com/tc39/proposal-ptc-syntax)
- [Wikipedia](https://en.wikipedia.org/wiki/Tail_call)

### Temporal dead zone (TDZ)

#### Definition:

Refers to a period of time during which a variable has been declared, but has
not been assigned, and is therefore unavailable. This results in a ReferenceError. This happens when
a `const` or a `let` is defined in the scope, but not yet. This is different from `var`, which will
return undefined. Here is an example:

#### Example:

```javascript
console.log(bar) // ReferenceError TDZ
console.log(baz) // undefined

let bar;
var baz;
bar = 1;
baz = 2;

console.log(bar) // 1
console.log(baz) // 2
```

#### Sources
[ECMAScript source](https://www.ecma-international.org/ecma-262/8.0/index.html#sec-let-and-const-declarations)

#### Related definitions
[Early errors](#early-errors)

### Early errors

To be defined!

.....

TODO(goto): expand on each one of these terms, make them linkable.

* [hoisting](https://www.w3schools.com/js/js_hoisting.asp)
* [memoization](https://en.wikipedia.org/wiki/Memoization)
* [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
* [hyrum’s law](https://twitter.com/onoffleftright/status/885627206033997825)
* POLA: Principle Of Least Authority
* Sigil
* Contextual keywords
* parsing ambiguity
* readability ambiguity
* lexical scope
* Usability/Ergonomics
* Cornering
* Consistency
* Coherency
* Cross cutting concerns
* 1JS position
* repl
* Bikeshedding
* Cornering
* Frogboiled
* Footguns
* Mangling
* EIBTI: explicit is better than implicit
* IIFE: immediately invoked function expression
* Hoisting
* Enumerability
* Observable
* 3 Passes: (a) parsing, (b) go over it ahead of time for “early errors”, (c) execute (runtime errors)
* Proxies/membranes (mark miller, @tvcutsem),
* Currying operation -- wycats
* syntax budget
* orthogonal
* "Needs Consensus PR"
* web reality, web compatability
* normative, non-normative
* (meeting) minutes
* editor, editor group, project editors
* Test262
* ECMA 262, 402, 404
* language semantics, grammar
* Stages, Stage 0-4
* Reflector
* Proposal
* Disjointed proposals
* Host
* Intrinsics
* Engines: v8, SpiderMonkey, Chakra, JavaScriptCore
* Timebox
* Spec/Spec text
* Out-of-band, in-band
* cargo-cult
* One JS
* lazy parsing
* self-hosted
* overhead

# Considerations

These are common considerations that come up while discussing the technical merits of language features.

## Parsing

* Syntax constraints (waldemar)
* Parsing costs (backtracking, multiple parsing trees before getting tokens, e.g. pipeline
* ASI hazards, semicolons hazards
* Tokenization is greedy -- waldemar
* Punctuation overload -- mark miller

## On growing a language

* Does it belong to the language? The extensible web manifesto.
* Complexity Budget (herman, allen)
* The cost of growing a language, the role of polyfils (adamk)
* Does it stand on its own weight? Does it pay for itself? (mark miller)
* The principle of least surprise
* Path dependence
* Readability and writability: more people read than write
* Forward compatibility
* Tennent’s Correspondence Principle (dherman)
* Backwards compatibility / Web compatibility / Don’t Break The Web (domenic, jordan)

## Security

* object capabilities
* Single origin policy
* communication channel
* tampering

## Ecosystem

* Popular opinion (jordan, taking the feedback from the community constructively)
* Polyfill considerations (libraries, frameworks, etc)
* Transpilers (typescript, flow, coffeescript, babel)
* Frameworks (angular, polymer, react, etc)
* Implementation considerations (Vv8)
* Other Standards (@jordan, overlap of HTML and now WASM, coordinating between standards communities, e.g. should standard libraries go to WHATWG or should them be JS, where do we draw the line?, tie the hands of TC39 when others move first, and vice versa)
* Fragmentation, convergence and the role of Standards
* Die on that hill



