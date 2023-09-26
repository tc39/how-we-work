# Glossary

_The purpose of this doc is to collect the most common terms/considerations that come up while designing features for JavaScript at TC39. It's a work in progress and needs your help to grow! See [below](#contributing-to-this-document) for instructions as well as terms/considerations in need of definition._

These are common terms used while discussing language features.

## Bikeshedding

### Definition

The process of discussing a trivial matter at the expense of the topic that actually
needs discussion. This can take time away from important topics, and its important to catch
ourselves if we start bikeshedding!

### Example

We were supposed to discuss how this new proposal should work, but we spent the entire time discussing what the
name should be. We should avoid such bikeshedding.

### References

[wikipedia](https://en.wiktionary.org/wiki/bikeshedding)

## Brand check

### Definition

Brand check ("brand" as in a mark, or a brand made with a branding iron) is a term used by TC39
to describe a check against a unique datatype whose creation is controlled by a piece of code.

### Example

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
breaking the programs of users of the library. However, returning plain objects such as `{ type:
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

### References

- [ES Discuss comment](https://esdiscuss.org/topic/tostringtag-spoofing-for-null-and-undefined#content-3)
- [Clarifying comment on GitHub](https://github.com/tc39/how-we-work/pull/30#issuecomment-391588889)

## Tail call, PTC (proper tail call), STC (syntactic tail call)

### Definition

A _tail call_ is a call which occurs as the final operation of a function and whose value is returned immediately. It is possible for such a call to reuse or replace the current stack frame, in which case it is known as a _proper_ tail call (PTC). PTC semantics are part of the standard as of ES6, but their implementation in various engines has been fraught with controversy.
In particular, reluctance to the automatic nature of PTC led to an alternative _syntactic_ tail call (STC) proposal, in which users would consciously choose this behavior by means of a keyword. PTC is currently only shipped by JSC, while STC remains an open but inactive proposal.

### Example

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

### References

- [PTC specification](https://tc39.es/ecma262/#sec-tail-position-calls)
- [STC proposal](https://github.com/tc39/proposal-ptc-syntax)
- [Wikipedia](https://en.wikipedia.org/wiki/Tail_call)

## Temporal dead zone (TDZ)

### Definition

Refers to a period of time during which a variable has been declared, but has
not been assigned, and is therefore unavailable. This results in a ReferenceError. This happens when
a `const` or a `let` is defined in the scope, but not yet. This is different from `var`, which will
return undefined. Here is an example:

### Example

```javascript
console.log(bar) // ReferenceError TDZ
console.log(baz) // undefined

let bar = 1;
var baz = 2;

console.log(bar) // 1
console.log(baz) // 2
```

### References

- [Let and Const Declarations](https://tc39.es/ecma262/#sec-let-and-const-declarations) -- the ECMAScript specification
- [Temporal Dead Zone](https://wesbos.com/temporal-dead-zone/) -- blog post by Wes Bos which describes the term

## Cover grammar

### Definition

A "cover grammar" is a technique used in the JavaScript grammar to remain context free and unambiguous when parsing from left to right with only one token of lookahead, while later tokens might lead to syntactic restrictions for earlier ones. Informally, one grammar is said to "cover" another if the second grammar is a subset of the first, with a corresponding subset of corresponding parse trees.

### Example

The [CoverParenthesizedExpressionAndArrowParameterList](https://tc39.es/ecma262/#prod-CoverParenthesizedExpressionAndArrowParameterList) production in the ECMAScript specification allows expressions and destructuring parameters of arrow functions to be interpreted together. If a `=>` is reached, the expression is reinterpreted as arrow function parameters, with additional restrictions applied.

### References

The definition of [covering](https://tc39.es/ecma262/#sec-syntactic-grammar) in the ECMAScript specification, used to check whether it's valid to reinterpret one grammatical production as another.

## Web compatibility/"Don't break the web"

### Definition

A change to JavaScript is considered "**web compatible**" if it preserves the current behavior of existing websites. If it changes the behavior of existing websites, it's considered to "**break the web**".

The definition here is a bit fuzzy and empirical--it's always possible to construct a website which will break under any particular change or addition to JavaScript, and the key is how common the broken websites are. If too many websites break, then web browsers will refuse to ship the change.

**"Don't break the web"** is a shared goal of TC39 and all web standards bodies: We aim to preserve web compatibility as we evolve the language. Even if a change would be convenient for developers, it's not worth it if we hurt lots of users in the process!

### Example

There was an effort to add a method `Array.prototype.contains`. However, this broke many websites ([reference](https://esdiscuss.org/topic/having-a-non-enumerable-array-prototype-contains-may-not-be-web-compatible)). As a result, the method was named as [`Array.prototype.includes`](https://github.com/tc39/Array.prototype.includes/) instead.

----

ES2015 changed RegExp semantics to make `RegExp.prototype` not a RegExp instance, and to make `RegExp.prototype.sticky` a getter which threw when accessed on a non-RegExp. It turned out that this change was not web-compatible--data from Chrome showed that .05% of web page loads hit this case.
As a result, TC39 agreed to make an allowance in `RegExp.prototype.sticky` and similar getters to permit `RegExp.prototype` as a receiver. See [this slide deck](https://docs.google.com/presentation/d/1BZiysQL4YMXgexwTmcZTFOD0nxGSAGz7PbzAotoDiGw/edit#slide=id.p) for details.

### References

- [#SmooshGate FAQ](https://developers.google.com/web/updates/2018/03/smooshgate) by Mathias Bynens

## Meta-object protocol

### Definition

"Meta-object protocol" (often abbreviated as "MOP") is a fancy term to describe the basic operations in an object system. For example, in JavaScript, getting a property is one operation in the meta-object protocol. The term originated in the Lisp community, and is used in TC39 because we can take a lot of inspiration from the developments in the Common Lisp Object System.

### Example

Each operation in JavaScript's meta-object protocol is a method in [Reflect](https://tc39.es/ecma262/#sec-reflect-object), and each of these is also a [Proxy](https://tc39.es/ecma262/#sec-proxy-objects) trap.

In the issue [Implement meta-object trap(s) to make an object's [[Prototype]] immutable](<https://github.com/tc39/ecma262/issues/538>), there is discussion about adding another fundamental object operation to freeze the prototype of an object (without performing a full `preventExtensions`).
The title of the issue includes "meta-object" as a reference to the meta-object protocol, as the addition of this feature would require new Proxy and Reflect APIs.

### References

- [The Art of the Metaobject Protocol](https://mitpress.mit.edu/books/art-metaobject-protocol) -- the book which introduced the term
- [Object Internal Methods and Internal Slots](https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots) -- JavaScript's meta-object protocol

## Early errors

### Definition

An "early error" is an error which is thrown in the parsing phase of JavaScript code, before executing. This error is usually a `SyntaxError`, but other error types may be early errors as well. These early errors are produced even if the relevant code is not executed. Early errors are contrasted with runtime errors, which happen in the course of executing JavaScript code.

When a JavaScript Script, Module or `eval`'d string contains an early error, none of it is run.

### Example

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

### References

- [early error](https://tc39.es/ecma262/#early-error) defined in the ECMAScript specification editor's draft.

## Options bag

### Definition

A parameter value that is a JavaScript object with properties looked up eagerly. It is used to configure behavior of a function. Methods on the options bag object should be invoked with `undefined` as the default value for `this`

The definition here is a bit fuzzy as some parameters are objects but not options bags.

### Example

```js
// options is an options bag
const options =  { style: 'currency', currency: 'EUR' };
new Intl.NumberFormat('de-DE', options);
```

## Memoization

### Definition

"Memoization" is an optimization technique to reduce the run time of a program by using a cache to store results and avoid recomputation. In essence, it is a trade-off of space in exchange for time.

### Example

Non-memoized Fibonacci

```js
function fib(num) {
  if (num <= 1) return 1;

  return fib(num - 1) + fib(num - 2);
}
```

Memoized Fibonacci

```js
function memoizedFib(num, memo = {}) {
  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = memoizedFib(num - 1, memo) + memoizedFib(num - 2, memo);
}
```

### References

- [memoization](https://en.wikipedia.org/wiki/Memoization)

## REPL

### Definition

A read-eval-print loop, i.e. "REPL", is a interactive programming environment that allows a user to input a single expression whose result will be evaulated and returned. After each read-eval-print the environment returns to the initial read state, creating a loop, which is only terminated once the environment is closed.

### Example

In Firefox's Web Console the [command line interpreter](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/The_command_line_interpreter) is a JavaScript REPL.

### References

- [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)

## Agent

### Definition

An agent is a comprised of three things: a container for a set of job queues, related execution state, and an execution thread. The execution state is exclusive to the agent while the execution thread can be shared with other agents.

### References

[ECMA262 Spec](https://tc39.es/ecma262/#sec-agents)

## Realm

### Definition

A realm consists of a set of [intrinsic](#intrinsic) objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources (i.e. a global object and an associated set of [primordial](#primordial) objects). Today, in the browser, realms can be created via same origin iframes.

### References

[ECMA262 Spec](https://tc39.es/ecma262/#sec-code-realms)

## Intrinsic

### Definition

A built-in value that is required by the ECMA262 specification.
Where observable (e.g., as [primordial](#primordial)), intrinsic objects are realm-specific while intrinsic symbols are shared by all realms.
The specification itself references "well-known" intrinsics with special notation (%&lt;name>% for objects; @@&lt;name> for symbols).

### Example

%ForInIteratorPrototype% is the prototype of internal iterators that can be used to implement **`for (`** _Identifier_ **`in`** _Expression_ **`)`** statements

### References

[ECMA262 (objects)](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects),
[ECMA262 (symbols)](https://tc39.es/ecma262/#sec-well-known-symbols)

## Primordial

### Definition

An [intrinsic](#intrinsic) value that is accessible to ECMAScript code and required to exist before any ECMAScript code runs.

### Example

%Array%, the initial value of a realm's Array constructor, is accessible as `Array`.

## Effectively undeniable

### Definition

A [primordial](#primordial) value that is accessible to ECMAScript code without reference to named bindings other than those for prototype and property descriptor reflection (i.e., solely by syntax, `__proto__`, and primordial `getPrototypeOf`/`getOwnPropertyDescriptor`/`getOwnPropertyDescriptors` functions).

### Example

%Array.prototype%, the initial value of a realm's Array prototype, is accessible as `[].__proto__`.
%ThrowTypeError%, a realm's special TypeError-throwing function, is accessible as `(function(){ 'use strict'; return Object.getOwnPropertyDescriptor(arguments, 'callee').get; })()`.

## Normative

### Definition

Statements that constrain the observable behavior of implementations (i.e., the behavior that conforming implementations are allowed to exhibit).

## SES

### Definition

Secure ECMAScript. A subset of ECMAScript.

### References

[Useful diagram](https://github.com/Agoric/Jessie/blob/master/README.md)

## Plenary

### Definition

Meeting of all available TC39 delegates. Occurs around 6 times a year.

## Refactoring hazard

### Definition

A seemingly simple change (i.e. thought to be semantically equivalent) that seems like a drop in replacement for an existing piece of code but has specific edge cases that make it not work as expected. As you refactor code from "old pattern" to "new pattern", it would be easy to cause unintentional effects (bugs, etc).

## Reify

### Definition

To make something a first-class concept in a language specification, such that it can be passed around, inspected, or manipulated by user code.

### Example

- The C programming language reifies the concept of memory addresses with pointers.
- ECMAScript reifies its own interpreter with `eval`.

### References

- [Reification](https://en.wikipedia.org/wiki/Reification_(computer_science))

## SDO (2 definitions)

### Definition (1)

SDOs are syntax-directed operations in the ECMA-262 specification. These are the operations that are defined piecewise over the parse tree rather than by having a single algorithm. In other terms it is a particular style of algorithm in the specification.

### Example (1)

Evaluation is an SDO because Evaluation is defined piecewise over several productions.

### References (1)

[Specification](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-algorithm-conventions-syntax-directed-operations)

### Definition (2)

SDO is short for a Standards Developing Organization.

### Example (2)

- ECMA
- Unicode Consortium

### References (2)

[Wikipedia](https://en.wikipedia.org/wiki/Standards_organization)

## Syntax budget

### Definition

The idea that there's an upper bound on how much syntactic complexity a language can reasonably contain, expressed as a metaphorical budget.

A proposal without syntactic implications, such as the addition of a new method to a built-in, may be relatively uncontroversial, but a proposal that introduces new syntax is expected to justify its cost against this budget.
This means demonstrating both (1) that it addresses a significant developer need in a way that would not be reasonably achieved without new syntax and (2) that the specific syntax being proposed does not obstruct another proposal expected to advance in the foreseeable future.

Additionally, in a shorter-term sense, it could overwhelm developers to have too many syntax-heavy features ship in too narrow of a timeframe.

## In-Band

### Definition

Used mainly in opposition to [Out of band](#out-of-band), denoting that all configuration of a feature or a behavior is done within the context of ECMASCript source.

### Example

- The stage 3 Import assertions proposal assert pragma
- The "use strict" directive, an in-band way to enable strict mode for some portion of code.

### References

[Import assertions proposal FAQ](https://github.com/tc39/proposal-import-assertions/blob/ae28137f45f6acd7fc61be4f7193759570a776ff/README.md#why-not-out-of-band) in opposition to out-of-band

## Out-of-band

### Definition

Used to denote a behavior that applies to the execution of a ECMAScript module or script that is configured outside of ECMAScript source text.

### Example

An example of out-of-band configuration is Import Maps.  With this feature, the module specifier used in an import statement or the dynamic import function is interpreted by the host differently based on the import map configuration that is defined within a non-ECMAScript source.  This may be a HTML `<script>` tag with the `importmap` type in the browser, or in a configuration file like `package.json` in a Node.js project.

Another example is whether an ECMAScript source file will be executed as a script or a module based on the `type` attribute of the `<script>` tag that caused the User Agent to fetch and load it within a browser context.  The same is done in Node.js through the use of the .mjs extension or by specifying that the package is of type `"module"` in the `pacakge.json` file.

### References

[Import map proposal](https://github.com/WICG/import-maps#supplying-out-of-band-metadata-for-each-module)

## Override mistake

### Definition

> [!NOTE]
> [There is no universal consensus that this is a mistake](https://github.com/tc39/ecma262/pull/1307#issuecomment-421094561).

Override mistake is the behavior that ECMAScript throws a TypeError (in the strict mode) for code `O[K] = ...` when `K` is a non-writable property in the prototype of `O`.

This behavior brings compatibility issues in the ecosystem when any properties are non-writable, including when [the language adds new built-in non-writable properties to existing prototypes](https://github.com/tc39/proposal-iterator-helpers/issues/115) and when [the runtime or code on the page freezes built-ins](https://github.com/tc39/proposal-iterator-helpers/issues/286).

### Example

```js
'use strict';
// environment
Object.freeze(Error.prototype);

// an es5 library
function MyError() {
    Error.call(this);
    this.name = 'MyError';
}
Object.setPrototypeOf(MyError.prototype, Error.prototype);
// TypeError: name is readonly
new MyError;
```

### References

Prior efforts trying to change this: [Normative: Make non-writable prototype properties not prevent assigning to instance](https://github.com/tc39/ecma262/pull/1320)

Some real-world examples:

- [tc39/proposal-iterator-helpers: Web compat: The %Symbol.toStringTag% property on %Iterator.prototype% needs to be writable](https://github.com/tc39/proposal-iterator-helpers/issues/115)
- [tc39/proposal-iterator-helpers: Web incompatibility discovered in theathletic.com](https://github.com/tc39/proposal-iterator-helpers/issues/286)
- [Tracking issue for getting 3rd party packages more SES friendly](https://github.com/endojs/endo/issues/576) (some of the reports are related)

## Hierarchy of Constituencies

### Definition

The idea that when differing perspectives come into conflict, our decisions ought to prioritize them in the following (descending) order:

1. End users
2. JavaScript authors
3. JavaScript engine implementers
4. ECMAScript specification authors
5. Theoretical purity

While this is not an explicitly adopted goal of TC39, it is a common standards concept which delegates often refer to.

### References

[HTML Design Principles](https://www.w3.org/TR/html-design-principles/#priority-of-constituencies)

## Contributing to This Document

Here are some tips and ideas for adding a [new definition](#definition-template) to this document.

### How to add definitions

When you add a definition, make sure that the definition applies to how TC39 uses it. Some other
communities might have similar terms, but they mean a different thing in this case. Otherwise, feel
free to reference well known definitions so that people know what they mean.

Anatomy of a good definition:

- in simple words, what is it? Imagine describing it to someone who has no experience
- a minimal example
- sources and resources where people can learn more
- related definitions (optional)

#### Definition template

```md
## Term

### Definition

definition of term

### Example

example of term

### References

references
```

## TODO: Terms

These are terms which have been previously identified as worthy of defining.

- [hoisting](https://www.w3schools.com/js/js_hoisting.asp)
- [IIFE](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
- [hyrum’s law](https://twitter.com/onoffleftright/status/885627206033997825)
- POLA: Principle Of Least Authority
- Sigil
- Contextual keywords
- parsing ambiguity
- readability ambiguity
- lexical scope
- Usability/Ergonomics
- Cornering
- Consistency
- Coherency
- Cross cutting concerns
- 1JS position
- Cornering
- Frogboiled
- Footguns
- Mangling
- EIBTI: explicit is better than implicit
- IIFE: immediately invoked function expression
- Hoisting
- Enumerability
- Observable
- 3 Passes: (a) parsing, (b) go over it ahead of time for “early errors”, (c) execute (runtime errors)
- Proxies/membranes (mark miller, @tvcutsem),
- Currying operation -- wycats
- orthogonal
- "Needs Consensus PR"
- web reality
- (meeting) minutes
- editor, editor group, project editors
- Test262
- ECMA 262, 402, 404
- language semantics, grammar
- Stages, Stage 0-4
- Reflector
- Proposal
- Disjointed proposals
- Host
- Engines: v8, SpiderMonkey, Chakra, JavaScriptCore
- Timebox
- Spec/Spec text
- cargo-cult
- One JS
- lazy parsing
- self-hosted
- overhead

## TODO: Considerations

These are common considerations that come up while discussing the technical merits of language features.

### Parsing

- Syntax constraints (waldemar)
- Parsing costs (backtracking, multiple parsing trees before getting tokens, e.g. pipeline
- ASI hazards, semicolons hazards
- Tokenization is greedy -- waldemar
- Punctuation overload -- mark miller

### On growing a language

- Does it belong to the language? The extensible web manifesto.
- Complexity Budget (herman, allen)
- The cost of growing a language, the role of polyfils (adamk)
- Does it stand on its own weight? Does it pay for itself? (mark miller)
- The principle of least surprise
- Path dependence
- Readability and writability: more people read than write
- Forward compatibility
- Tennent’s Correspondence Principle (dherman)
- Backwards compatibility (domenic, jordan)

### Security

- object capabilities
- Single origin policy
- communication channel
- tampering

### Ecosystem

- Popular opinion (jordan, taking the feedback from the community constructively)
- Polyfill considerations (libraries, frameworks, etc)
- Transpilers (typescript, flow, coffeescript, babel)
- Frameworks (angular, polymer, react, etc)
- Implementation considerations (Vv8)
- Other Standards (@jordan, overlap of HTML and now WASM, coordinating between standards communities, e.g. should standard libraries go to WHATWG or should them be JS, where do we draw the line?, tie the hands of TC39 when others move first, and vice versa)
- Fragmentation, convergence and the role of Standards
- Die on that hill
