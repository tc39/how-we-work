# Normative conventions

This document describes some of the conventions that we try to follow when designing new features. Sometimes old features don't follow these; that's ok, new features generally should anyway.

None of these rules are inviolable, but you should have a good reason for any particular feature to deviate (for example, because the feature is a close cousin of an existing feature, like `findLastIndex` vs `findIndex`).

This list is very far from being complete.

## Number-taking inputs should reject `NaN`

In any built-in function which expects a number (including as an option in an options bag), receiving `NaN` or anything which results in `NaN` after coercion is performed (such as by passing through `ToNumeric`, `ToPrimitive`, `ToNumber`, etc.) should cause a `RangeError` to be thrown.

Note that some abstract operations, like [ToIntegerOrInfinity](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tointegerorinfinity), [ToIndex](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toindex), etc, will coerce inputs to Number and then further coerce the result, sometimes including mapping `NaN` to non-`NaN` values. So you'll need to coerce inputs to a Number using `ToNumber` before calling those operations, check for `NaN`, and then pass the resulting Number to the operation.

An exception to this rule is functions which take optional numeric arguments: in that case, receiving `undefined` should be treated as the argument not being passed.

NB: This convention is new as of 2023, and most earlier parts of the language do not follow it.

## Integer-taking inputs should reject non-integral numbers

In any built-in function which expects an integral number (including as an option in an options bag), receiving a non-integral number or anything which results in a non-integral number after coercion is performed (such as by passing through `ToNumeric`, `ToPrimitive`, `ToNumber`, etc.) should cause a `RangeError` to be thrown.

Note that some abstract operations, like [ToIntegerOrInfinity](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tointegerorinfinity), [ToIndex](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toindex), etc, will coerce inputs to Number and then further round the result. So you'll need to coerce inputs to a Number using `ToNumber` before calling those operations and then check for non-integral values, rather than using those operations.

For the purposes of this guideline `-0` is considered to be an integral number (specifically, 0).

Some APIs intentionally round non-integral inputs, for example as an attempt to provide a best-effort behavior, rather than because the API fundamentally only makes sense with integers. This guideline does not apply to those cases.

NB: This convention is new as of 2023, and most earlier parts of the language do not follow it.

## If an argument is expected, not getting it or getting `undefined` should throw a `TypeError`

When there is a required argument, finding that it is explicitly `undefined` or is missing should throw a `TypeError` instead of attempting to coerce `undefined` to the expected type. This extends to values looked up in options bags, etc. This does not apply when there is a default value for the argument, since in that case it is not required.

This convention applies only to `undefined` specifically, and says nothing about the appropriate handling of values like `null` and `document.all`.

NB: This convention is new as of 2023, and most earlier parts of the language do not follow it.
