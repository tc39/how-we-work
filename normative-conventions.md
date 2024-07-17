# Normative conventions

This document describes some of the conventions that we try to follow when designing new features. Sometimes old features don't follow these; that's ok, new features generally should anyway.

None of these rules are inviolable, but you should have a good reason for any particular feature to deviate (for example, because the feature is a close cousin of an existing feature, like `findLastIndex` vs `findIndex`).

This list will never cover all such conventions and is expected to grow over time.

## Avoid coercing arguments to types other than Boolean

If an argument to a built-in function is expected to be of a particular type other than Boolean, the function should throw a `TypeError` if called with a value not of that type, rather than performing coercion. This also applies to values read from options bags.

For example, if a function expects a string and is called with a Number or an object, it should throw a `TypeError` rather than attempting to coerce those values to strings. Similarly, if a function takes an object and is called with a string, it should throw rather than e.g. looking up properties on the string.

NB: This convention is new as of 2024, and most earlier parts of the language do not follow it.

## When required arguments are missing, throw

In most cases, a built-in function being called with fewer arguments than expected is treated the same as being called with `undefined` for the remaining arguments. So per the above rule, when a built-in function is called with fewer arguments than expected it should throw a `TypeError` unless `undefined` is one of the types expected in that position. This also applies to values read from options bags.

This does not apply when there is a default value for the argument in question, since in that case the argument is not required.

NB: This convention is new as of 2024, and most earlier parts of the language do not follow it.

## Number-taking inputs should reject `NaN`

If an argument to a built-in function is expected to be a non-`NaN` Number (including as an option in an options bag), receiving `NaN` should cause a `RangeError` to be thrown.

NB: This convention is new as of 2024, and most earlier parts of the language do not follow it.

## Integral-Number-taking inputs should reject non-integral arguments

If an argument to a built-in function is expected to be an integral Number (including as an option in an options bag), receiving a non-integral Number should cause a `RangeError` to be thrown.

For the purposes of this guideline `-0` is considered to be an integral number (specifically, 0).

Some APIs intentionally round non-integral inputs, for example as an attempt to provide a best-effort behavior, rather than because the API fundamentally only makes sense with integers. This guideline does not apply to those cases.

NB: This convention is new as of 2024, and most earlier parts of the language do not follow it.

## Reject primitives in iterable-taking positions

Any time an iterable or async-iterable value (a value that has a `Symbol.iterator` or `Symbol.asyncIterator` method) is expected, primitives should be treated as if they were not iterable. Usually, this will mean throwing a `TypeError`. Primitive wrapper Objects such as String Objects, however, should be treated like any other Object.

Although primitive Strings are default iterable (`String.prototype` has a `Symbol.iterator` method which enumerates code points), it is now considered a mistake to iterate a String without specifying whether the String is providing an abstraction over code units, code points, grapheme clusters, or something else.

NB: This convention is new as of 2024, and most earlier parts of the language do not follow it.
