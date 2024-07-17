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

### Order of observable operations when processing arguments

When writing the algorithm steps for the implementation of a JS built-in function or method, this order should be followed:

1. If applicable, process and validate the receiver.
1. Process and validate each argument, in order.
1. Perform validation of any other preconditions, if any.
1. Perform the actual work of the function.

Validating the arguments includes type checking, but also unobservable things like supplying default arguments.
So, for a fictitious `addTwoNumbersThatArentTooFarApart(a, b = 42)` function, the algorithm steps could look like this:

> 1. If _a_ is not a Number, throw a **TypeError** exception.
> 1. Let _firstOperand_ be ℝ(_a_).
> 1. If _b_ is **undefined**, then
>     1. Let _secondOperand_ be 42.
> 1. Else,
>     1. If _b_ is not a Number, throw a **TypeError** exception.
>     1. Let _secondOperand_ be ℝ(_b_).
> 1. If abs(_firstOperand_ - _secondOperand_) > 10, throw a **RangeError** exception.
> 1. Return 𝔽(_firstOperand_ + _secondOperand_).

The first four steps process and validate each argument in order; Step 5 validates the other precondition that the numbers aren't too far apart; and Step 6 does the actual work.

NB: This convention is new as of 2022.
However, many parts of the language do already follow it.
