# The iterator protocol and related protocols

This document describes some of the details of sync and async iterators and generators in ECMAScript. It's assumed that the reader already has a basic grasp of the concepts and syntax. The level of detail herein is not relevant to most users of the language.


## Iterators

Iterators represent a single-use sequence of values.

An iterator is assumed to be an object with a (own or inherited) `.next()` method which returns `{ done, value }` objects, which represent each step in the iteration. The consumer does not call `.next()` again after receiving a value with a truthy `.done`, or after a violation of the iterator protocol.

It may also have a `.return()` method which returns an object, which the consumer of the iterator should call (if present) if the consumer stops consuming the iterator early, unless the reason it's stopping is because the iterator has violated the iterator protocol. The consumer is expected to check that `.return()` returns an object (for some reason), but otherwise does not use the resulting value.

The `.next` property is looked up immediately and cached for any future calls. It is invoked with the iterator as the receiver, and passed no arguments. `.return` is looked up only if necessary, and is invoked with the iterator as the receiver and passed no arguments.

The following are considered violations of the iterator protocol and cause an exception if encountered:

- The value purporting to be an iterator is not an object.
- Looking up the `.next` property throws.
- Calling `.next()` throws (including if it is not callable, for example because it is `undefined`).
- `.next()` returns a value which is not an object.
- Looking up the `.done` property of the result of a `.next()` call throws.
- Looking up the `.value` property of the result of a `.next()` call throws.
- Looking up the `.return` property throws.
- Calling `.return()` throws (unless it is `undefined`).
- `.return()` returns a value which is not an object.

The consumer may have other expectations for the iterator - for example, that its `value`s are numbers - but violations of any other expectations are not violations of the iterator protocol, and if encountered the consumer is still expected to call `.return()`.

If the consumer is stopping early because it encountered an exception other than a violation of the iterator protocol, any exceptions thrown when calling `iterator.return()` are swallowed by that exception. Otherwise such exceptions are thrown and take precedence over whatever caused the consumer to stop.

For example:

```js
let iterator = {
  next() {
    return { done: false, value: 0 };
  },
  return() {
    throw 'error in return';
  },
};

let iterable = {
  [Symbol.iterator]: () => iterator,
};

try {
  for (let item of iterable) {
    throw 'error in loop'; // calls `iterator.return()`
  }
} catch (e) {
  console.log(e); // 'error in loop'
}

try {
  for (let item of iterable) {
    break; // calls `iterator.return()`
  }
} catch (e) {
  console.log(e); // 'error in return'
}
```


## Iterables

An iterable is an object whose `Symbol.iterator` method returns an iterator. Most places which need to do iteration should consume an iterable. For example, `for (let item of iterable)` consumes `iterable` as an iterable.

Nothing requires that an iterable be consumable multiple times, and nothing in the language currently does so. When the iterable is a static collection such as an Array, however, it should be possible to call its `Symbol.iterator` method multiple times and get multiple independent iterators.

By convention, most iterators are iterable by dint of having a `Symbol.iterator` method which returns `this`, which allows using iterators in, for example, `for (let item of iterator)`. However, nothing requires iterators to have a `Symbol.iterator` method. Iterators which lack such a method are not iterable and cannot be used in places which expect an iterable. Iterators which have such a method are referred to as iterable iterators.


## Generators

Generator functions can be used to create iterable iterators, but they are strictly more powerful. The generator protocol extends the iterator protocol in several ways:

- `.next()` can take a single argument.
- `.return()` can take a single argument, and returns a `{ done, value }` object.
- an optional `.throw()` method is added, taking a single argument and returning a `{ done, value }` object.

Because the generator protocol extends the iterator protocol, anything which implements the generator protocol is an iterator as long as its `next` and `return` methods are tolerant of being called with no arguments.

Right now nothing in the language actually consumes values using generator protocol, except that `yield*` forwards the whole protocol as described below.

Syntactic generator functions produce generators, which implement the generator protocol and make use of the extensions as follows:

- Calling a generator function produces a generator. The generator is also an iterable by virtue of having `[Symbol.iterator]() { return this }`.
- Calling `.next()` on generator will resume the generator's execution until the subsequent `yield` expression, `return` statement (including the implicit `return undefined` at the end of the function body), or uncaught exception is reached. `yield x` will cause the call to `.next` to result in `{ done: false, value: x }`. `return x` will cause the call to `.next` to result in `{ done: true, value: x }`. An exception will cause the call to `.next` to throw.
  - Note that `return` statements in the `try` of a `try {} finally {}` don't take effect until the end of the `finally`, and only if the `finally` does not override them. <details><summary>Example 1</summary>
    ```js
    let g = (function* () {
      try {
        return 1;
      } finally {
        console.log('here');
      }
    })();
    console.log(g.next()); // prints "here" and then `{ value: 1, done: true }`
    ```
    </details> <details><summary>Example 2</summary>

    ```js
    let g = (function* () {
      x: try {
        return 1;
      } finally {
        break x;
      }
      console.log('here');
      yield 2;
    })();
    console.log(g.next()); // prints "here" and then `{ value: 2, done: false }``
    ```
    </details>
- The argument to `.next()` provides the value of the `yield` expression which caused the generator to return control to the caller after the previous call to `.next()`. The argument to the very first call to `.next()` is not observable to the generator. <details><summary>Example</summary>
  ```js
  let g = (function* () {
    console.log(yield);
  })();
  g.next();
  g.next(0); // prints `0`
  ```
  </details>
- Calling `.return(foo)` will inject a return completion with value `foo` at the current `yield` expression, as if the `yield` were replaced with `return foo`. There is no way for the generator to observe `foo`, but a consumer may be able to see it the same way it can see the `x` of a `return x`. This can cause `return`s to happen in the middle of an expression, which is otherwise impossible.
  - The return completion will trigger `finally` blocks of any `try` it is within, which can override it. <details><summary>Example</summary>
    ```js
    let g = (function* () {
      try {
        yield;
      } finally {
        return 2;
      }
    })();
    g.next();
    console.log(g.return(1)); // { value: 2, done: true }
    ```
    </details>
- Calling `.throw(foo)` will inject a throw completion with value `foo`. The value is observable to the generator if the `yield` is in a `try` with a `catch (e)`.
- Calling `.next`, `.return`, or `.throw` while a call to `.next`, `.return`, or `.throw` is executing will throw.
- Calling `.next(x)` after the generator finishes results in `{ done: true, value: undefined }`. Calling `.throw(x)` after the generator finishes throws `x`. Calling `.return(x)` after the generator finishes returns `{ done: true, value: x }`.

Additionally, `yield* other` forwards all parts of the generator protocol to the iterator given by the iterable `other` up until the outer generator returns `{ done: true }`, at which point the outer generator resumes execution after the `yield*`. If `.return(foo)` is called on the outer generator but is not present on the inner iterator, the outer generator handles it, i.e. the `yield*` behaves as `return foo;`. If `.throw(foo)` is called on the outer generator but `.throw` is not present on the inner iterator, it will call `.return()` on the inner iterator (if present), and then throw a `TypeError`.

For the purposes of `yield*`, if a call to `.throw()` on the inner iterator throws or returns a non-object value, or if looking up the `.done` or `.value` properties of the returned value throws, that is considered to have closed the inner iterator, just as for `.next()` and `.return()`.


## Async iterators

An async iterator is exactly like a sync iterator, except that the result of `.next()` and `.return()` are `await`'d before being consumed. This allows the async iterator to return a Promise for a `{ done, value }` object instead of returning such an object synchronously. It is possible for the consumer to call `.next` multiple times without waiting for earlier promises to settle; how to handle this is up to the iterator. Everything currently in the language will wait for a promise from `.next` to settle before calling `.next` again, but that may change in the future.

In addition to all the violations of the sync iterator protocol enumerated above, it is also a violation of the async iterator protocol if `await`ing the value returned by `.next()` or `.return()` throws (including if looking up the `then` property throws, or if the promise is rejected).


## Async iterables

An async iterable is an object whose `Symbol.asyncIterator` method returns an async iterator. Note that it returns _synchronously_; the value is not `await`'d.

Places which expect an async iterable should generally also accept a sync iterable, and [promote the resulting iterator to an async iterator](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createasyncfromsynciterator) by transforming the result with `{ done: result.done, value: await result.value }`. If the `await` throws, including because of throwy `then` getters and similar shenanigans, that is not a violation of the iterator protocol, and therefore [the iterator should be closed](https://github.com/tc39/ecma262/pull/2600).

`for await (item of iterable)` consumes `iterable` as an async iterable and has the fallback described above.

As with sync iterators, the convention is for async iterators to themselves be iterables by dint of having a `[Symbol.asyncIterator]() return this }` method.


## Async generators

The async generator protocol extends the async iterator protocol in the same way that the (sync) generator protocol extends the (sync) iterator protocol, except that the `.next`, `.return`, and `.throw` all return promises for `{ done, value }` pairs (or exceptions).

Syntactic async generator functions produce async generators, which implement the async generator protocol. Async generators also have the following behaviors:

- They have a `[Symbol.asyncIterator]() { return this }` method, making them async iterables.
- Any `yield x` or `return x` will `await` the value `x` before the value is given to the caller, so that the `value` of a `{ done, value }` pair contains an unwrapped value. If in a `try` and the `await` throws it will trigger the exception handler exactly as if the user had done `yield await x` or `return await x` themselves.
  - It's [not quite _exactly_ the same](https://github.com/tc39/proposal-faster-promise-adoption?tab=readme-ov-file#problem), but the differences are very slight, and this may change in the future.
- Arguments to `.return` (but not the other two methods) are `await`'d before the `return` resolves. If the corresponding `yield` is within a `try` then the `await` can trigger the exception handler just as if the `yield` had been a `return`.
  - This `await` is still done for the arguments to calls to `.return` after the async generator completes. <details><summary>Example</summary>
    ```js
    let g = (async function* () {})();
    console.log(await g.next()); // { value: undefined, done: true }
    console.log(await g.return(Promise.resolve(0))); // { value: 0, done: true }
    ```
    </details>
- Calling `.next`, `.return`, or `.throw` while a call to `.next`, `.return`, or `.throw` is executing (either recursively or while paused at an `await`) is allowed. These calls are placed in a queue and handled in order.
