import 'vector-color-picker/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Panel as ColorPickerPanel } from 'vector-color-picker';

function onChange(obj) {
  console.log(obj);
}
function onAbsorption() {
  // console.log('onAbsorption 开启吸色');
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
      color={'rgb(128, 128, 128)'}
      onChange={onChange}
      onAbsorption={onAbsorption}
      mode="RGB"
    />
    <hr />
    <ColorPickerPanel
      alpha={80}
      color={'#477898'}
      onChange={onChange}
      mode="HEX"
    />
  </div>,
  document.getElementById('__react-content')
);
