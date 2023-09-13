# Normative conventions

This document describes some of the conventions that we try to follow when designing new features. Sometimes old features don't follow these; that's ok, new features generally should anyway.

None of these rules are inviolable, but you should have a good reason for any particular feature to deviate.

This list is very far from being complete.

## Number-taking inputs should reject `NaN`

In any place which expects a number, receiving `NaN` - or anything which coerces to `NaN`, if coercion is performed - should throw a `RangeError`.

Note that some abstract operations, like [ToIntegerOrInfinity](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tointegerorinfinity), [ToIndex](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toindex), etc, will coerce `NaN` to 0. So you'll need to coerce inputs before calling those operations, check for `NaN`, and then pass the coerced result to the operation.

NB: This convention is new as of 2023, and most earlier parts of the language do not follow it.

## If an argument is expected, not getting it or getting `undefined` should throw a `TypeError`

When there is a required argument, finding that it is explicitly `undefined` or is missing should throw a `TypeError` instead of attempting to coerce `undefined` to the expected type. This extends to values looked up in options bags, etc. This does not apply when there is a default value for the argument, since in that case it is not required.

This convention applies only to `undefined` specifically, and says nothing about the appropriate handling of values like `null` and `document.all`.

NB: This convention is new as of 2023, and most earlier parts of the language do not follow it.
