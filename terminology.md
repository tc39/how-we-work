The purpose of this doc is to collect some of the most common terms/considerations that come up while designing features for Javascript at TC39.

These aren’t, by any means, meant to be taken as patterns/principles in that, often, they inform rather than prescribe: historically, they are never taken as a hard design constraint or direction but rather considerations that inform tradeoffs between design choices.

# Glossary

These are common terms used while discussing language features.

TODO(goto): expand on each one of these terms, make them linkable.

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
* Early errors
* Hoisting
* Temporal dead zone
* Enumerability
* Tail call 
* Observable 
* 3 Passes: (a) parsing, (b) go over it ahead of time for “early errors”, (c) execute (runtime errors)
* Proxies/membranes (mark miller, @tvcutsem), 
* Currying operation -- wycats

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



