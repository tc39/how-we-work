# Reading a proposal draft

Each proposal which is Stage 2 or higher has a specification text draft, located at `https://tc39.github.io/proposal-<name>`. This is the authoritative definition which implementations should use as a reference; README text or issues may be used for context.

The specification text for proposals is phrased as a diff over the [current draft specification](https://tc39.github.io/ecma262), possibly with the addition of certain other proposals. When an entirely new section is added, it is not highlighted, but when existing sections are modified, they are highlighted in green for insertions and red for deletions.

Specification text is meant to be interpreted abstractly. Only the *observable semantics*, that is, the behavior when JavaScript code is executed, need to match the specification. Implementations can use any strategy they want to make that happen, including using different algorithms that reach the same result.

For more details on reading specification text, see Timothy Gu's [How to Read the ECMAScript Specification](https://timothygu.me/es-howto/) and the ECMAScript specification's [Notational Conventions](https://tc39.github.io/ecma262/#sec-notational-conventions) section.
