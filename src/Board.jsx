import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

import tinycolor from 'tinycolor2';

const WIDTH = 200;
const HEIGHT = 140;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.removeListeners();
    this.removeTouchListeners();
  }

  onBoardMouseDown = (e) => {
    const buttons = e.buttons;

    // only work on left click
    // @see https://developer.mozilla.org/en-US/docs/Web/Events/mousedown
    if (buttons !== 1) return;

    this.removeListeners();
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({ x, y });
    this.dragListener = addEventListener(window, 'mousemove', this.onBoardDrag);
    this.dragUpListener = addEventListener(
      window,
      'mouseup',
      this.onBoardDragEnd
    );
  };

  onBoardTouchStart = (e) => {
    if (e.touches.length !== 1) {
      return;
    }
    this.removeTouchListeners();
    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    this.pointMoveTo({ x, y });
    this.touchMoveListener = addEventListener(
      window,
      'touchmove',
      this.onBoardTouchMove
    );
    this.touchEndListener = addEventListener(
      window,
      'touchend',
      this.onBoardTouchEnd
    );
  };

  onBoardTouchMove = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    const x = e.targetTouches[0].clientX;
    const y = e.targetTouches[0].clientY;
    this.pointMoveTo({
      x,
      y,
    });
  };

  onBoardTouchEnd = () => {
    this.removeTouchListeners();
  };

  onBoardDrag = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y,
    });
  };

  onBoardDragEnd = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    this.pointMoveTo({
      x,
      y,
    });
    this.removeListeners();
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-board`;
  };

  removeTouchListeners = () => {
    if (this.touchMoveListener) {
      this.touchMoveListener.remove();
      this.touchMoveListener = null;
    }
    if (this.touchEndListener) {
      this.touchEndListener.remove();
      this.touchEndListener = null;
    }
  };

  removeListeners = () => {
    if (this.dragListener) {
      this.dragListener.remove();
      this.dragListener = null;
    }
    if (this.dragUpListener) {
      this.dragUpListener.remove();
      this.dragUpListener = null;
    }
  };

  /**
   * 移动光标位置到
   * @param  {object} pos X Y 全局坐标点
   */
  pointMoveTo = (pos) => {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    let left = pos.x - rect.left;
    let top = pos.y - rect.top;

    const rWidth = rect.width || WIDTH;
    const rHeight = rect.height || HEIGHT;

    left = Math.max(0, left);
    left = Math.min(left, rWidth);
    top = Math.max(0, top);
    top = Math.min(top, rHeight);

    const { color } = this.props;

    const mode = this.props.mode;

    if (mode === 'HSL') {
      color.saturationHsl = left / rWidth;
      color.lightness = 1 - top / rHeight;
    } else {
      color.saturationHsb = left / rWidth;
      color.brightness = 1 - top / rHeight;
    }

    this.props.onChange(color);
  };

  render() {
    const prefixCls = this.getPrefixCls();
    const color = this.props.color;
    const mode = this.props.mode;

    const hueHsv = {
      h: color.hue,
      s: 1,
      v: 1,
    };

    const hueColor = tinycolor(hueHsv).toHexString();

    let xRel = 0;
    let yRel = 0;

    if (mode === 'HSL') {
      xRel = color.saturationHsl * 100;
      yRel = (1 - color.lightness) * 100;
    } else {
      xRel = color.saturationHsb * 100;
      yRel = (1 - color.brightness) * 100;
    }

    return (
      <div className={prefixCls}>
        {mode === 'HSL' ? (
          <div
            className={`${prefixCls}-hsl`}
            style={{ backgroundColor: hueColor }}
          >
            <div className={`${prefixCls}-hsl-value`} />
            <div className={`${prefixCls}-hsl-saturation`} />
          </div>
        ) : (
          <div
            className={`${prefixCls}-hsv`}
            style={{ backgroundColor: hueColor }}
          >
            <div className={`${prefixCls}-hsv-value`} />
            <div className={`${prefixCls}-hsv-saturation`} />
          </div>
        )}

        <span
          style={{
            left: `${xRel}%`,
            top: `${yRel}%`,
            backgroundColor: `${color.toRgbString()}`,
          }}
        />

        <div
          className={`${prefixCls}-handler`}
          onMouseDown={this.onBoardMouseDown}
          onTouchStart={this.onBoardTouchStart}
        />
      </div>
    );
  }
}

/**
 * hsv
 * h: range(0, 360)
 * s: range(0, 1)
 * v: range(0, 1)
 */

Board.propTypes = {
  color: PropTypes.object,
  onChange: PropTypes.func,
  rootPrefixCls: PropTypes.string,
  mode: PropTypes.oneOf(['HEX', 'CSS', 'RGB', 'HSL', 'HSB']),
};
