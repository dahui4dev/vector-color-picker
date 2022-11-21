import React from 'react';
import PropTypes from 'prop-types';

import Color from './helpers/color';

import Board from './Board';
// import Preview from "./Preview";
import Absorption from './Absorption';
import Ribbon from './Ribbon';
import Alpha from './Alpha';
// import Params from "./Params";
import SelectParams from './SelectParams';

import cx from 'classnames';

function noop() {}

export default class Panel extends React.Component {
  constructor(props) {
    super(props);

    const alpha =
      typeof props.alpha === 'undefined'
        ? props.defaultAlpha
        : Math.min(props.alpha, props.defaultAlpha);

    const color = new Color(props.color || props.defaultColor);
    color.alpha = alpha;
    const mode = props.mode;

    this.state = {
      color,
      alpha,
      mode,
    };
  }

  componentDidMount() {
    this.props.onMount(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      const color = new Color(nextProps.color);
      this.setState({
        color,
      });
    }
    if (nextProps.alpha !== undefined) {
      this.setState({
        alpha: nextProps.alpha,
      });
    }
  }

  onSystemColorPickerOpen = (e) => {
    // only work with browser which support color input
    if (e.target.type === 'color') {
      this.systemColorPickerOpen = true;
    }
  };

  onFocus = () => {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  };

  onBlur = () => {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(() => {
      // if is system color picker open, then stop run blur
      if (this.systemColorPickerOpen) {
        this.systemColorPickerOpen = false;
        return;
      }

      this.props.onBlur();
    }, 100);
  };

  /**
   * 开启吸色
   */
  onAbsorption = () => {
    this.props.onAbsorption({
      color: this.state.color.toRgbString(),
      alpha: this.state.alpha,
    });
  };

  /**
   * 响应 alpha 的变更
   * @param  {Number} alpha Range 0~100
   */
  handleAlphaChange = (alpha) => {
    const { color } = this.state;
    color.alpha = alpha;

    this.setState({
      alpha,
      color,
    });
    this.props.onChange({
      color: color.toHexString(),
      alpha,
    });
  };

  /**
   * color change
   * @param  {Object}  color      tiny-color instance
   */
  handleChange = (color) => {
    this.setState({ color, alpha: color.alpha });
    this.props.onChange({
      color: color.toHexString(),
      alpha: color.alpha,
    });
  };

  handleChangeWithoutAlpha = (color) => {
    color.alpha = this.state.alpha;
    this.setState({ color, alpha: this.state.alpha }, () => {
      this.props.onChange({
        color: color.toHexString(),
        alpha: this.state.alpha,
      });
    });
  };

  handleModeChange = (mode) => {
    this.setState({ mode });
  };

  render() {
    const { prefixCls, enableAlpha } = this.props;
    const { color, alpha } = this.state;

    const wrapClasses = cx({
      [`${prefixCls}-wrap`]: true,
      [`${prefixCls}-wrap-has-alpha`]: enableAlpha,
    });

    return (
      <div
        ref={(ref) => (this.ref = ref)}
        className={[prefixCls, this.props.className].join(' ')}
        style={this.props.style}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        tabIndex="0"
      >
        <div className={`${prefixCls}-inner`}>
          <Board
            rootPrefixCls={prefixCls}
            color={color}
            mode={this.state.mode}
            onChange={this.handleChangeWithoutAlpha}
          />
          <div className={wrapClasses}>
            <div className={`${prefixCls}-wrap-ribbon`}>
              <Ribbon
                rootPrefixCls={prefixCls}
                color={color}
                onChange={this.handleChangeWithoutAlpha}
              />
            </div>
            {enableAlpha && (
              <div className={`${prefixCls}-wrap-alpha`}>
                <Alpha
                  rootPrefixCls={prefixCls}
                  alpha={alpha}
                  color={color}
                  onChange={this.handleAlphaChange}
                />
              </div>
            )}
            <div className={`${prefixCls}-wrap-preview`}>
              <Absorption
                rootPrefixCls={prefixCls}
                onAbsorption={this.onAbsorption}
              />
            </div>
          </div>
          <div
            className={`${prefixCls}-wrap`}
            style={{ height: 40, marginTop: 10 }}
          >
            <SelectParams
              rootPrefixCls={prefixCls}
              color={color}
              alpha={alpha}
              onAlphaChange={this.handleAlphaChange}
              onChange={this.handleChange}
              mode={this.state.mode}
              onModeChange={this.handleModeChange}
              enableAlpha={this.props.enableAlpha}
            />
          </div>
        </div>
      </div>
    );
  }
}

import typeColor from './utils/validationColor';

Panel.propTypes = {
  alpha: PropTypes.number,
  className: PropTypes.string,
  color: typeColor, // Hex string
  defaultAlpha: PropTypes.number,
  defaultColor: typeColor, // Hex string
  enableAlpha: PropTypes.bool,
  mode: PropTypes.oneOf(['HEX', 'CSS', 'RGB', 'HSL', 'HSB']),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onMount: PropTypes.func,
  onAbsorption: PropTypes.func,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
};

Panel.defaultProps = {
  className: '',
  defaultAlpha: 100,
  defaultColor: '#ff0000',
  enableAlpha: true,
  mode: 'RGB',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onMount: noop,
  onAbsorption: noop,
  prefixCls: 'vector-color-picker-panel',
  style: {},
};
