# The iterator protocol and related protocols


## Iterators

Iterators represent a single-use sequence of values.

An iterator is assumed to be an object with a (own or inherited) `.next()` method which returns `{ done, value }` objects, which represent each step in the iteration. The consumer does not call `.next()` again after receiving a value with a truthy `.done`, or after a violation of the iterator protocol.

It may also have a `.return()` method which returns an object, which the consumer of the iterator should call (if present) if the consumer stops consuming the iterator early, unless the reason it's stopping is because the iterator has violated the iterator protocol. The consumer is expected to check that `.return()` returns an object (though I don't know why), but otherwise does not use the resulting value.

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

An iterable is an object whose `Symbol.iterator` method returns an iterator. Most places which need to do iteration should consume an iterable. For example, `for (let item of iter)` consumes `iter` as an iterable.


## Generators

The generator protocol extends the iterator protocol in several ways:

- `.next()` can take a single argument.
- `.return()` can take a single argument, and returns a `{ done, value }` object.
- an optional `.throw()` method is added taking a single argument.

Right now nothing in the language actually consumes values using generator protocol, except that `yield*` forwards the whole protocol as described below.

Syntactic generator functions produce generators and make use of the extensions as follows:

- Calling a generator function produces a generator. (The iterator is also an iterable by virtue of having `[Symbol.iterator]() { return this }`.)
- Calling `.next()` on generator will resume the generator's execution until the subsequent `yield` expression, `return` statement (including the implicit `return undefined` at the end of the function body), or exception is reached. `yield x` will cause the call to `.next` to result in `{ done: false, value: x }`. `return x` will cause the call to `.next` to result in `{ done: true, value: x }`. An exception will cause the call to `.next` to throw.
  - Note that `return` statements in the `try` of a `try {} finally {}` don't take effect until the end of the `finally`.
- The argument to `.next()` provides the value of the `yield` expression which caused the generator to return control to the caller after the previous call to `.next()`. The argument to the very first call to `.next()` is not observable to the generator.
- Calling `.return(foo)` will inject a return completion with value `foo` at the current `yield` expression, as if the `yield` were replaced with `return foo`. There is no way for the generator to observe `foo`, but a consumer may be able to see it the same way it can see the `x` of a `return x`. This can cause `return`s to happen in the middle of an expression, which is otherwise impossible.
- Calling `.throw(foo)` will inject a throw completion with value `foo`. This is observable to the generator if the `yield` is in a `try` with a `catch (e)`.

Additionally, `yield* other` forwards all parts of the generator protocol to the iterator given by the iterable `other`. If `.return(foo)` is called on the outer generator but is not present on the inner iterator, the outer generator handles it, i.e. the `yield*` behaves as `return foo;`. If `.throw(foo)` is called on the outer generator but `.throw` is not present on the inner iterator, it will call `.return()` on the inner iterator (if present), and then throw a `TypeError`.


## Async iterators

An async iterator is exactly like a sync iterator, except that the result of `.next()` and `.return()` are `await`d. This allows the async iterator to return a Promise for a `{ done, value }` object instead of returning such an object synchronously. It is possible for the consumer to call `.next` multiple times without waiting for earlier promises to settle; how to handle this is up to the iterator.

When calling `.return()` the consumer is expected to `await` the result before proceeding.

In addition to all the violations of the sync iterator protocol enumerated above, it is also a violation of the async iterator protocol if `await`ing the value returned by `.next()` or `.return()` throws (including if looking up the `then` property throws, or if the promise is rejected).


## Async iterables

An async iterable is an object whose `Symbol.asyncIterator` method returns an async iterator. Note that it returns _synchronously_; the value is not `await`d.

Places which expect an async iterable should generally also accept a sync iterable, and [promote the resulting iterator to an async iterator](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createasyncfromsynciterator) by transforming the result with `{ done: result.done, value: await result.value }`. If the `await` throws that is not a violation of the iterator protocol, and therefore [the iterator should be closed](https://github.com/tc39/ecma262/pull/2600).


## Async generators

TODO
