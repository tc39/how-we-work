# Conventions when writing specification text

> **NOTE:** This document is currently a skeleton, and should not be considered a
> complete list.
> The issue [tc39/ecma262#2236](https://github.com/tc39/ecma262/issues/2236) is
> a good place to discuss conventions.

## Spelling, grammar, and typography

## Notation

## Algorithm steps

## Abstract operations

## Implementations of functions and methods

### Order of observable operations

When writing the algorithm steps for the implementation of a JS built-in
function or method, this order should be followed:

1. If applicable, process and validate the receiver.
1. Process and validate each argument, in order.
1. Perform validation of any other preconditions, if any.
1. Perform the actual work of the function.

Validating the arguments includes type checking, but also unobservable things
like supplying default arguments.
So, for a fictitious `addTwoNumbersThatArentTooFarApart(a, b = 42)` function,
the algorithm steps could look like this:

> 1. Let _firstOperand_ be ℝ(? ToNumber(_a_)).
> 1. If _b_ is **undefined**, then
>     1. Let _secondOperand_ be 42.
> 1. Else,
>     1. Let _secondOperand_ be ℝ(? ToNumber(_b_)).
> 1. If _firstOperand_ - _secondOperand_ > 10, then
>     1. Throw a **RangeError** exception.
> 1. Return 𝔽(_firstOperand_ + _secondOperand_).

The first three steps process and validate each argument in order; Step 4
validates the other precondition that the numbers aren't too far apart; and
Step 5 does the actual work.

## Normative or editorial?
