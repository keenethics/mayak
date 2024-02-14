# Rules

Following listed rules which are considered mandatory to use, and pull requests violates these should not be approved.

## Use function declaration for React components

Wrong:

```javascript
const Header = (props) => {
  return ...
};

```

Right:

```javascript
function Header(props) {
  return ...
}

```

## Use in-place exports, rather than in the end of file

Wrong:

```javascript
const utility = () => {
  return ...
};

// some more code ...

export { utility };
```

Right:

```javascript
export const utility = () => {
  return ...
};
```
