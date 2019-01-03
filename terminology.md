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

#### Definition

The process of discussing a trivial matter at the expense of the topic that actually
needs discussion. This can take time away from important topics, and its important to catch
ourselves if we start bikeshedding!

#### Example
We were supposed to discuss how this new proposal should work, but we spent the entire time discussing what the
name should be. We should avoid such bikeshedding.

#### References
[wikipedia](https://en.wiktionary.org/wiki/bikeshedding)

### Brand Check

#### Definition
Brand check ("brand" as in a mark, or a brand made with a branding iron) is a term used by TC39
to describe a check against a unique datatype whose creation is controlled by a piece of code.

#### Example
One example of this is built in JavaScript datatypes, which are unique and cannot be made in user
space. `Array.isArray` is an example of a brand check. For reference see [this
discussion](https://esdiscuss.org/topic/tostringtag-spoofing-for-null-and-undefined#content-3).

A common misconception is that `instanceof` is a brand check. This is a nominal type check and does
not reliably determine the type. It used to be that a brand check was only possible for built in
types. For a more detailed explanation, see [this write
up](https://github.com/tc39/how-we-work/pull/30#issuecomment-391588889).

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

#### References
- [ES Discuss comment](https://esdiscuss.org/topic/tostringtag-spoofing-for-null-and-undefined#content-3)
- [Clarifying comment on GitHub](https://github.com/tc39/how-we-work/pull/30#issuecomment-391588889)

### Tail call, PTC (proper tail call), STC (syntactic tail call)

#### Definition
A _tail call_ is a call which occurs as the final operation of a function and whose value is returned immediately. It is possible for such a call to reuse or replace the current stack frame, in which case it is known as a _proper_ tail call (PTC). PTC semantics are part of the standard as of ES6, but their implementation in various engines has been fraught with controversy. In particular, reluctance to the automatic nature of PTC led to an alternative _syntactic_ tail call (STC) proposal, in which users would consciously choose this behavior by means of a keyword. PTC is currently only shipped by JSC, while STC remains an open but inactive proposal.

#### Example
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

#### References
- [PTC specification](https://tc39.github.io/ecma262/#sec-tail-position-calls)
- [STC proposal](https://github.com/tc39/proposal-ptc-syntax)
- [Wikipedia](https://en.wikipedia.org/wiki/Tail_call)

### Temporal dead zone (TDZ)

#### Definition
Refers to a period of time during which a variable has been declared, but has
not been assigned, and is therefore unavailable. This results in a ReferenceError. This happens when
a `const` or a `let` is defined in the scope, but not yet. This is different from `var`, which will
return undefined. Here is an example:

#### Example
```javascript
console.log(bar) // ReferenceError TDZ
console.log(baz) // undefined

let bar = 1;
var baz = 2;

console.log(bar) // 1
console.log(baz) // 2
```

#### References
- [Let and Const Declarations](https://tc39.github.io/ecma262/#sec-let-and-const-declarations) -- the ECMAScript specification
- [Temporal Dead Zone](https://wesbos.com/temporal-dead-zone/) -- blog post by Wes Bos which describes the term

### Cover grammar

#### Definition
A "cover grammar" is a sort of technique used in the JavaScript grammar to remain context free and unambiguous when parsing from left to right with only one token of lookahead, while later tokens might lead to syntactic restrictions for earlier ones. Informally, one grammar is said to "cover" another if the second grammar is a subset of the first, with a corresponding subset of corresponding parse trees.

#### Example
The [CoverParenthesizedExpressionAndArrowParameterList](https://tc39.github.io/ecma262/#prod-CoverParenthesizedExpressionAndArrowParameterList) production in the ECMAScript specification allows expressions and destructuring parameters of arrow functions to be interpreted together. If a `=>` is reached, the expression is reinterpreted as arrow function parameters, with additional restrictions applied.

#### References
The definition of [covering](https://tc39.github.io/ecma262/#sec-syntactic-grammar) in the ECMAScript specification, used to check whether it's valid to reinterpret one grammatical production as another.

### Web compatibility/"Don't break the web"

#### Definition
A change to JavaScript is considered "**web compatible**" if it preserves the current behavior of existing websites. If it changes the behavior of existing websites, it's considered to "**break the web**".

The definition here is a bit fuzzy and empirical--it's always possible to construct a website which will break under any particular change or addition to JavaScript, and the key is how common the broken websites are. If too many websites break, then web browsers will refuse to ship the change.

**"Don't break the web"** is a shared goal of TC39 and all web standards bodies: We aim to preserve web compatibility as we evolve the language. If we didn't, we'd be breaking the web!

#### Example
There was an effort to add a method `Array.prototype.contains`. However, this broke many websites ([reference](https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible)). As a result, the method was named as [`Array.prototype.includes`](https://github.com/tc39/Array.prototype.includes/) instead.

----

ES2015 changed RegExp semantics to make `RegExp.prototype` not a RegExp instance, and to make `RegExp.prototype.sticky` a getter which threw when accessed on a non-RegExp. It turned out that this change was not web-compatible--data from Chrome showed that .05% of web page loads hit this case. As a result, TC39 agreed to make an allowance in `RegExp.prototype.sticky` and similar getters to permit `RegExp.prototype` as a receiver. See [this slide deck](https://docs.google.com/presentation/d/1BZiysQL4YMXgexwTmcZTFOD0nxGSAGz7PbzAotoDiGw/edit#slide=id.p) for details.

#### Sources
- [#SmooshGate FAQ](https://developers.google.com/web/updates/2018/03/smooshgate) by Mathias Bynens

### Meta-object protocol

#### Definition
"Meta-object protocol" is a fancy term to describe the basic operations in an object system. For example, in JavaScript, getting a property is one operation in the meta-object protocol. The term originated in the Lisp community, and is used in TC39 because we can take a lot of inspiration from the developments in the Common Lisp Object System.

#### Example
Each operation in JavaScript's meta-object protocol is a method in [Reflect](https://tc39.github.io/ecma262/#sec-reflect-object), and each of these is also a [Proxy](https://tc39.github.io/ecma262/#sec-proxy-objects) trap.

In the issue [Implement meta-object trap(s) to make an object's [[Prototype]] immutable](https://github.com/tc39/ecma262/issues/538), there is discussion about adding another fundamental object operation to freeze the prototype of an object (without performing a full `preventExtensions`). The title of the issue includes "meta-object" as a reference to the meta-object protocol, as the addition of this feature would require new Proxy and Reflect APIs.

#### References
- [The Art of the Metaobject Protocol](https://mitpress.mit.edu/books/art-metaobject-protocol) -- the book which introduced the term
- [Object Internal Methods and Internal Slots](https://tc39.github.io/ecma262/#sec-object-internal-methods-and-internal-slots) -- JavaScript's meta-object protocol

### Early errors

#### Definition
An "early error" is an error which is thrown in the parsing phase of JavaScript code, before executing. This error is usually a `SyntaxError`, but other error types may be early errors as well. These early errors are produced even if the relevant code is not executed. Early errors are contrasted with runtime errors, which happen in the course of executing JavaScript code.

When a JavaScript Script, Module or `eval`'d string contains an early error, none of it is run.

#### Example
Multiple declarations of the same lexical variable produces an early error. For example, the following produces an early `SyntaxError`.

```js
const x = 1;
const x = 2;
```

By contrast, referencing a variable which is not defined is a runtime error, specifically a `ReferenceError`.

```js
let abc = 1;
console.log(abd);  // runtime error
```

#### References
- [early error](https://tc39.github.io/ecma262/#early-error) defined in the ECMAScript specification editor's draft.

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
* web reality
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
* Backwards compatibility (domenic, jordan)

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



