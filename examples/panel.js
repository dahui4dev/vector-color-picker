import 'vector-color-picker/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Panel as ColorPickerPanel } from 'vector-color-picker';

function onFocus(obj) {
  console.log('onFocus', obj);
}
function onChange(obj) {
  console.log('onChange', obj);
}
function onBlur(obj) {
  console.log('onBlur', obj);
}
function onAbsorption(color) {
  console.log('onAbsorption', color);
}

ReactDOM.render(
  <div
    style={{
      backgroundColor: '#ddd',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <ColorPickerPanel
      // enableAlpha={false}
      alpha={100}
      color={'rgb(186, 104, 134)'}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onAbsorption={onAbsorption}
      mode="CSS"
    />
    <hr />
    <ColorPickerPanel
      alpha={80}
      color={'#477898'}
      onChange={onChange}
      onAbsorption={onAbsorption}
      mode="HEX"
    />
  </div>,
  document.getElementById('__react-content')
);
