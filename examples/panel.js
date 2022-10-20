webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(156);


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(11);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _vectorColorPicker = __webpack_require__(20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function onChange(obj) {
	  console.log(obj);
	}
	function onAbsorption() {
	  // console.log('onAbsorption 开启吸色');
	}
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  {
	    style: {
	      backgroundColor: '#ddd',
	      padding: 20,
	      display: 'flex',
	      flexDirection: 'column',
	      alignContent: 'center',
	      justifyContent: 'flex-start',
	      alignItems: 'center'
	    }
	  },
	  _react2.default.createElement(_vectorColorPicker.Panel
	  // enableAlpha={false}
	  , { alpha: 100,
	    color: 'hsv(0, 100%, 1%)',
	    onChange: onChange,
	    onAbsorption: onAbsorption,
	    mode: 'HSB'
	  }),
	  _react2.default.createElement('hr', null),
	  _react2.default.createElement(_vectorColorPicker.Panel, {
	    alpha: 80,
	    color: '#477898',
	    onChange: onChange,
	    mode: 'HEX'
	  })
	), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=panel.js.map