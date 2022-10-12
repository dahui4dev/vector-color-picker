import 'vector-color-picker/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'vector-color-picker';

function changeHandler(colors) {
  console.log(colors);
}

function closeHandler(colors) {
  console.log(colors);
}

ReactDOM.render(
  <div style={{ margin: '20px 20px 20px', textAlign: 'center' }}>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <h4>Custom Align</h4>
    <ColorPicker
      color={'#e2f'}
      align={{
        points: ['tr', 'tl'],
        offset: [-40, 0],
        targetOffset: [0, 0],
      }}
      alpha={90}
      onChange={changeHandler}
      onClose={closeHandler}
      placement="topLeft"
      className="some-class"
    />
    <p>-</p>
    <p>-</p>
    <h4>topLeft</h4>
    <ColorPicker
      color={'#36c'}
      alpha={30}
      onChange={changeHandler}
      onClose={closeHandler}
      placement="topLeft"
      className="some-class"
    >
      <span className="vector-color-picker-trigger" />
    </ColorPicker>

    <h4>topRight</h4>
    <ColorPicker color={'#F10'} onChange={changeHandler} placement="topRight" />

    <p>-</p>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <p>-</p>
    <h4>bottomLeft</h4>
    <ColorPicker
      color={'#0ad'}
      alpha={50}
      onChange={changeHandler}
      placement="bottomLeft"
    />
    <h4>bottomRight</h4>
    <ColorPicker
      color={'#0F0'}
      onChange={changeHandler}
      placement="bottomRight"
    />
  </div>,
  document.getElementById('__react-content')
);
