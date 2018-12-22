# Materialize Toasts

Tagged MaterializeCSS toasts makes for organised closing.

## Installation
```
$ meteor add mozfet:materialize-toast
```

## Usage
Anywhere in client side code after MaterializeCSS NPM package was loaded.
```js
import { Toast } from 'meteor/mozfet:materialize-toast'
Toast.show(['tag1', 'tag2'], "My message")
Toast.show(['tag3', 'tag4'], "Another message")
Toast.closeTags(['tag1', 'tag4'])  //closes both messages
```
