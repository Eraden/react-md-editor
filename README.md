# React Markdown Editor

A Markdown Editor for [React.js](http://facebook.github.io/react), built with [CodeMirror](https://codemirror.net).

**This is a work in progress.** Format application and removal is not very robust, some formats are missing.


## Installation

The easiest way to use codemirror is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/codemirror.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
yarn add codemirror https://github.com/Eraden/react-md-editor.git\#master
```


## Usage

```css
@import "~react-md-editor/lib/MarkdownEditor.css";
@import "~codemirror/lib/codemirror.css";
```

```js
import React              from "react";
import MarkdownEditor     from "react-md-editor";

class App extends React.Component {
	state = {
        code: "# Markdown"
    };

	updateCode = (newCode) =>
		this.setState({
			code: newCode
		});

	render() {
		return <Editor value={this.state.code} onChange={this.updateCode} />
	}
};

React.render(<App />, document.getElementById('app'));
```

### Properties

* `value` `String` the markdown
* `className` `String` element class name
* `options` `Object (newValue)` options passed to the CodeMirror instance
* `onChange` `Function (newValue)` called when a change is made

See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

### License

MIT. Copyright (c) 2016 Jed Watson.
