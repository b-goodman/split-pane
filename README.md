# split-pane

Custom element wrapper for [split.js](https://split.js.org/).

## Installation

```bash
npm install @bgoodman/split-pane

yarn add @bgoodman/split-pane
```

## Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>split-pane</title>
    <script type="module" src="./dist/index.js"></script>
</head>

<body>
    <split-pane>

        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

    </split-pane>
</body>

</html>
```

## Attributes

### `direction`

Specify the direction of movement of the pane gutter.

+ `"horizontal"` (default)
+ `"vertical"`

---

### `pane-size`

An array containing the values of the variable width(height) for horizontal(vertical) configuations.  Value is a percentage of the overall size of the element.  Default size for each of `n` child panes is `100/n`.  Reflected by property `currentPaneSize`.

---

### `key`

An identifier which if provided, enables the element's state to persist using `window.localStorage` to hold the value of `pane-size`.

---

## Methods

### `resetPaneSize`

Resets the property `currentPaneSize` to the initial value of `pane-size`.
