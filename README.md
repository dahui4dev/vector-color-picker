# vector-color-picker

---

基于 rc-color-picker 二次开发的 Vector Color Picker.

差异点：增加 "HEX/CSS/RGB/HSL/HSB" 互相切换。

[![npm version](http://img.shields.io/npm/v/vector-color-picker.svg)](https://www.npmjs.org/package/vector-color-picker)
[![npm download](http://img.shields.io/npm/dm/vector-color-picker.svg)](https://www.npmjs.org/package/vector-color-picker)
[![npm dependency](https://david-dm.org/react-component/color-picker.svg)](https://david-dm.org/react-component/color-picker)
[![Build Status](https://travis-ci.org/react-component/color-picker.svg?branch=master)](https://travis-ci.org/react-component/color-picker)

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Chrome 31.0+ ✔                                                                           | Edge 12.0+ ✔                                                                       | Firefox 31.0+ ✔                                                                             | IE 10+ ✔                                                                                                                     | Opera 30.0+ ✔                                                                         | Safari 7.0+ ✔                                                                            |

## Screenshots

<img width="279" alt="image" src="https://user-images.githubusercontent.com/6160798/195413518-18c79ae9-9238-487d-87ae-5618c065f10a.png">

## Development

```
npm install
npm start
```

## Example

online example: [http://react-component.github.io/color-picker/](http://react-component.github.io/color-picker/)

## Feature

- support color mode RGB HSB HSL

## install

[![vector-color-picker](https://nodei.co/npm/vector-color-picker.png)](https://npmjs.org/package/vector-color-picker)

## Usage

```js
var ColorPicker = require('vector-color-picker');
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(<ColorPicker />, container);
```

## API

### ColorPicker.props

| name              | type                             | default                                               | description                                                              |
| :---------------- | :------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------- |
| align             | Object: alignConfig of dom-align |                                                       | popup 's align config [dom-align](https://github.com/yiminghe/dom-align) |
| alpha             | Number                           | `100`                                                 | opacity of the color                                                     |
| animation         | String                           |                                                       | index.css support 'slide-up'                                             |
| children          | Node                             | `<span className='react-colorpicker-trigger'></span>` | additional trigger appended to picker                                    |
| className         | String                           | ''                                                    | Aditional class to be added to component                                 |
| color             | String                           | `#ff0000`                                             | color board current background color                                     |
| defaultAlpha      | Number                           | `100`                                                 | opacity of the color                                                     |
| defaultColor      | String                           | `#ff0000`                                             | color board current background color                                     |
| enableAlpha       | Boolean                          | `true`                                                | enable alpha controls                                                    |
| getPopupContainer | Function():Element               | `function(){return document.body;}`                   | dom node where picker to be rendered into                                |
| mode              | String                           | `RGB`                                                 | color mode, support mode 'RGB', 'HSB' or 'HSL'                           |
| onChange          | Function                         | noop                                                  | when select color                                                        |
| onClose           | Function                         | noop                                                  | when color picker popup close                                            |
| onOpen            | Function                         | noop                                                  | when color picker popup open                                             |
| placement         | String                           | `topLeft`                                             | one of ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']              |
| transitionName    | String                           |                                                       | css class for animation                                                  |

### ColorPicker.Panel.props

| name         | type     | default   | description                                    |
| :----------- | :------- | :-------- | :--------------------------------------------- |
| alpha        | Number   | `100`     | opacity of the color                           |
| className    | String   | `''`      | Additional class to be added to component      |
| color        | String   | `#ff0000` | color board current background color           |
| defaultAlpha | Number   | `100`     | opacity of the color                           |
| defaultColor | String   | `#ff0000` | color board current background color           |
| enableAlpha  | Boolean  | `true`    | enable alpha controls                          |
| mode         | String   | `RGB`     | color mode, support mode 'RGB', 'HSB' or 'HSL' |
| onBlur       | Function |           | when picker loose focus                        |
| onChange     | Function |           | when select color trigger                      |
| onFocus      | Function |           | when picker focus trigger                      |
| style        | Object   | `{}`      | root node CSS style                            |

## License

vector-color-picker is released under the MIT license.
