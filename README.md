# **mkobj**

---

This JavaScript utility allows you to easily create **objects with optional (conditional) properties**, as this is not very straightforward in JS.

## Installation

Install with [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/):

npm:

```sh
npm install --save mkobj
```

Yarn:

```sh
yarn add mkobj
```

## Usage

The simplest way to write optional property in JS is to use ternary operator:

```js
const obj = {
  foo: true ? 'bar' : 'else',
};
```

Disadvantage of this approach is that you have to specify **else value**. But in many cases you don't have, or don't want to provide else (default) property value, because this value is specified somewhere else in your code base, or even doesn't exist. `mkobj` provides way to write optional properties without providing else value.

```js
// MyReactHeader.js
import React, { PropTypes } from 'react';
import mkobj from 'mkobj';

MyReactHeader.propTypes = {
  text: PropTypes.string.isRequired,
  highlighted: PropTypes.bool,
};

export default function MyReactHeader({ text, highlighted }) {
  return (
    <div
      style={mkobj(
        { color: 'blue', fontSize: 25 },
        [ highlighted, 'fontWeight', 600 ],
      )}
    >
      {text}
    </div>
  );
}
```

First argument of `mkobj` is destination object. Object in which optional properties will be copied into. In above example this is style object. The arguments after this destination object are optional properties. Optional property is written as array with three elements:

```js
[condition, propertyName, propertyValue]
```

You can specify any number of these properties, or even none.

You don't have to provide destination object, `mkobj` will provide empty object for you:

```js
const obj = mkobj(
  [true, 'foo', 'bar'],
  [false, 'bar', 'foo'],
); // { foo: 'bar' }
```

All properties with falsy condition values are ignored and not copied into destination object.

You can even use `mkobj` to create empty object instead of object literal.

```js
const obj = mkobj(); // {}
```

Properties are copied in order, so you can take advantage of that and overwrite property values with latter ones.

```js
const obj = mkobj(
  [true, 'foo', 'bar1']
  [true, 'foo', 'bar2']
); // { foo: 'bar2' }
```
