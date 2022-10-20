webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(155);


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(11);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _vectorColorPicker = __webpack_require__(20);
	
	var _vectorColorPicker2 = _interopRequireDefault(_vectorColorPicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function changeHandler(colors) {
	  console.log(colors);
	}
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  { style: { textAlign: 'center' } },
	  _react2.default.createElement(
	    _vectorColorPicker2.default,
	    { color: '#36c', onChange: changeHandler },
	    _react2.default.createElement(
	      'span',
	      { className: 'react-custom-trigger' },
	      'choose color'
	    )
	  )
	), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=custom-trigger.js.map