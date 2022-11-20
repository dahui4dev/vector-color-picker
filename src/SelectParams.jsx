import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Color from './helpers/color';
import percentage from './helpers/percentage';

const modesMap = ['HEX', 'CSS', 'RGB', 'HSL', 'HSB'];

export default class SelectParams extends React.Component {
  constructor(props) {
    super(props);

    // 管理 input 的状态
    this.state = {
      mode: props.mode,
      hex: props.color.hex,
      css: props.color.css,
      color: props.color, // instanceof tinycolor 最终都以此值为准
      viewChannel: {
        RGB: props.color.RGB,
        HSL: props.color.HSL,
        HSB: props.color.HSB,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { color: nextColor } = nextProps;

    this.setState({
      color: nextColor,
      hex: nextColor.hex,
      css: nextColor.css,
      viewChannel: {
        RGB: nextColor.RGB,
        HSL: nextColor.HSL,
        HSB: nextColor.HSB,
      },
    });
  }

  getChannelInRange = (value, index) => {
    const channelMap = {
      RGB: [
        [0, 255],
        [0, 255],
        [0, 255],
      ],
      HSL: [
        [0, 360],
        [0, 100],
        [0, 100],
      ],
      HSB: [
        [0, 360],
        [0, 100],
        [0, 100],
      ],
    };
    const mode = this.state.mode;
    const range = channelMap[mode][index];
    let result = parseInt(value, 10);
    if (isNaN(result)) {
      result = 0;
    }
    result = Math.max(range[0], result);
    result = Math.min(result, range[1]);
    return result;
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-params`;
  };

  /**
   onchange 记录临时修改到 state.hex，
   onPress\onBlur 将临时修改校验：
      通过：同步进 state.color，以及通知父组件，
      不通过：将错误的 state.hex 用 color 替换
   */
  handleHexChange = (event) => {
    const hex = event.target.value;
    this.setState({
      hex,
    });
  };
  handleHexBlur = () => {
    const hex = this.state.hex;
    this.syncHexFinalVal(hex);
  };
  handleHexPress = (event) => {
    const hex = this.state.hex;
    if (event.nativeEvent.which === 13) {
      this.syncHexFinalVal(hex);
    }
  };
  syncHexFinalVal = (hex) => {
    let color = this.state.color;
    let changeSuccess = false;
    if (Color.isValidHex(hex)) {
      color = new Color(hex);
      changeSuccess = true;
    }
    if (changeSuccess) {
      this.setState({
        color,
        hex,
      });
      this.props.onChange(color, false);
    } else {
      this.setState({
        hex: color.hex,
      });
    }
  };

  /**
    onchange 记录临时修改到 state.css，
    onPress\onBlur 将临时修改校验：
      通过：同步进 state.color，以及通知父组件，
      不通过：将错误的 state.css 用 color 替换
   */
  handleCssChange = (event) => {
    const css = event.target.value;
    this.setState({
      css,
    });
  };
  handleCssPress = (event) => {
    const css = this.state.css;
    if (event.nativeEvent.which === 13) {
      this.syncCssFinalVal(css);
    }
  };
  handleCssBlur = () => {
    const css = this.state.css;
    this.syncCssFinalVal(css);
  };
  syncCssFinalVal = (css) => {
    let color = this.state.color;
    let changeSuccess = false;
    if (Color.isValidHex(css)) {
      color = new Color(css);
      changeSuccess = true;
    }
    if (changeSuccess) {
      this.setState({
        color,
        css: color.css,
      });
      this.props.onChange(color, false);
    } else {
      this.setState({
        css: color.css,
      });
    }
  };

  handleModeChange = (event) => {
    let mode = event.target.value;

    const modeIndex = modesMap.indexOf(mode) % modesMap.length;
    mode = modesMap[modeIndex];

    this.setState(
      {
        mode,
      },
      () => {
        this.props.onModeChange(mode);
      }
    );
  };

  handleAlphaHandler = (event) => {
    let alpha = parseInt(event.target.value.replaceAll('%', ''), 10);

    if (isNaN(alpha)) {
      alpha = 0;
    }
    alpha = Math.max(0, alpha);
    alpha = Math.min(alpha, 100);

    this.props.onAlphaChange(alpha);
  };

  updateColorByChanel = (channel, value) => {
    const { color } = this.props;
    const { mode } = this.state;

    if (mode === 'HSB') {
      if (channel === 'H') {
        color.hue = parseInt(value, 10);
      } else if (channel === 'S') {
        color.saturationHsb = parseInt(value, 10) / 100;
      } else if (channel === 'B') {
        color.brightness = parseInt(value, 10) / 100;
      }
    } else if (mode === 'HSL') {
      if (channel === 'H') {
        color.hue = parseInt(value, 10);
      } else if (channel === 'S') {
        color.saturationHsl = parseInt(value, 10) / 100;
      } else if (channel === 'L') {
        color.lightness = parseInt(value, 10) / 100;
      }
    } else {
      if (channel === 'R') {
        color.red = parseInt(value, 10);
      } else if (channel === 'G') {
        color.green = parseInt(value, 10);
      } else if (channel === 'B') {
        color.blue = parseInt(value, 10);
      }
    }

    return color;
  };

  handleColorChannelChange = (index, event) => {
    const inputVal = event.target.value;
    const { mode, viewChannel } = this.state;
    const channelArr3 = Array.from(viewChannel[mode]);
    // eslint-ignore
    const temp =
      ['S', 'B', 'L'].indexOf(mode[index]) !== -1
        ? parseInt(inputVal, 10) / 100
        : parseInt(inputVal, 10);
    channelArr3[index] = mode === 'RGB' ? parseInt(inputVal, 10) : temp;

    this.setState({
      viewChannel: {
        ...viewChannel,
        [mode]: channelArr3,
      },
    });
  };
  handleColorChannelPress = (index, event) => {
    if (event.nativeEvent.which === 13) {
      this.syncColorChannelFinalVal(index);
    }
  };
  handleColorChannelBlur = (index) => {
    this.syncColorChannelFinalVal(index);
  };
  syncColorChannelFinalVal = (index) => {
    const { mode, color, viewChannel } = this.state;
    const channel = mode[index];
    const channelArr3 = viewChannel[mode];
    let viewVal = channelArr3[index];
    if (isNaN(viewVal)) {
      viewVal = color[mode][index];
    }
    // eslint 报错
    const temp =
      ['S', 'B', 'L'].indexOf(mode[index]) !== -1
        ? percentage(viewVal)
        : parseInt(viewVal, 10);
    const realVal = mode === 'RGB' ? parseInt(viewVal, 10) : temp;

    const rightValue = this.getChannelInRange(realVal, index);
    const colorObj = this.updateColorByChanel(channel, rightValue);
    this.setState(
      {
        hex: colorObj.hex,
        css: colorObj.css,
        viewChannel: {
          RGB: colorObj.RGB,
          HSL: colorObj.HSL,
          HSB: colorObj.HSB,
        },
      },
      () => {
        this.props.onChange(colorObj, false);
      }
    );
  };

  renderInput() {
    const prefixCls = this.getPrefixCls();
    const { enableAlpha } = this.props;
    const { mode, viewChannel } = this.state;
    let colorChannel = [];

    switch (mode) {
      case 'HEX':
        return (
          <React.Fragment>
            <div className={`${prefixCls}-value-hex`}>
              <input
                type="text"
                maxLength="6"
                onKeyPress={this.handleHexPress}
                onBlur={this.handleHexBlur}
                onChange={this.handleHexChange}
                value={this.state.hex.toUpperCase()}
              />
            </div>

            {enableAlpha && this.renderAlphaInput()}
          </React.Fragment>
        );
      case 'CSS':
        return (
          <div className={`${prefixCls}-value-css`}>
            <input
              type="text"
              onKeyPress={this.handleCssPress}
              onBlur={this.handleCssBlur}
              onChange={this.handleCssChange}
              value={this.state.css}
            />
          </div>
        );
      case 'RGB':
        colorChannel = [...viewChannel[mode]];
        return (
          <React.Fragment>
            {this.renderChannelInput(`${prefixCls}-value-rgb`, colorChannel)}
            {enableAlpha && this.renderAlphaInput()}
          </React.Fragment>
        );
      case 'HSL':
        colorChannel = [...viewChannel[mode]];
        colorChannel[0] = Math.round(colorChannel[0]);
        colorChannel[1] = percentage(colorChannel[1]);
        colorChannel[2] = percentage(colorChannel[2]);

        return (
          <React.Fragment>
            {this.renderChannelInput(`${prefixCls}-value-hsl`, colorChannel)}
            {enableAlpha && this.renderAlphaInput()}
          </React.Fragment>
        );
      case 'HSB':
        colorChannel = [...viewChannel[mode]];
        colorChannel[0] = Math.round(colorChannel[0]);
        colorChannel[1] = percentage(colorChannel[1]);
        colorChannel[2] = percentage(colorChannel[2]);

        return (
          <React.Fragment>
            {this.renderChannelInput(`${prefixCls}-value-hsb`, colorChannel)}
            {enableAlpha && this.renderAlphaInput()}
          </React.Fragment>
        );

      default:
        return null;
    }
  }

  renderAlphaInput() {
    const prefixCls = this.getPrefixCls();

    return (
      <input
        type="text"
        className={`${prefixCls}-value-alpha`}
        value={`${Math.round(this.props.alpha)}%`}
        onChange={this.handleAlphaHandler}
      />
    );
  }

  /**
   * 渲染：RGB、HSL、HSB 三种模式
   * @param className
   * @param colorChannel
   * @returns {JSX.Element}
   */
  renderChannelInput(className, colorChannel) {
    return (
      <React.Fragment>
        <div className={className}>
          <input
            type="number"
            ref="channel_0"
            value={colorChannel[0]}
            onKeyPress={this.handleColorChannelPress.bind(null, 0)}
            onBlur={this.handleColorChannelBlur.bind(null, 0)}
            onChange={this.handleColorChannelChange.bind(null, 0)}
          />
          <input
            type="number"
            ref="channel_1"
            value={colorChannel[1]}
            onKeyPress={this.handleColorChannelPress.bind(null, 1)}
            onBlur={this.handleColorChannelBlur.bind(null, 1)}
            onChange={this.handleColorChannelChange.bind(null, 1)}
          />
          <input
            type="number"
            ref="channel_2"
            value={colorChannel[2]}
            onKeyPress={this.handleColorChannelPress.bind(null, 2)}
            onBlur={this.handleColorChannelBlur.bind(null, 2)}
            onChange={this.handleColorChannelChange.bind(null, 2)}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    const prefixCls = this.getPrefixCls();

    const { enableAlpha } = this.props;
    const { mode } = this.state;

    const paramsClasses = cx({
      [prefixCls]: true,
      [`${prefixCls}-has-alpha`]: enableAlpha,
    });

    return (
      <div className={paramsClasses}>
        <div className={`${prefixCls}-type`}>
          <select
            className={`${prefixCls}-select`}
            value={mode}
            onChange={this.handleModeChange}
          >
            <option value="HEX">HEX</option>
            <option value="RGB">RGB</option>
            <option value="CSS">CSS</option>
            <option value="HSL">HSL</option>
            <option value="HSB">HSB</option>
          </select>

          <div className={`${prefixCls}-value`}>{this.renderInput()}</div>
        </div>
      </div>
    );
  }
}

SelectParams.propTypes = {
  alpha: PropTypes.number,
  enableAlpha: PropTypes.bool,
  color: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(modesMap),
  onModeChange: PropTypes.func,
  onAlphaChange: PropTypes.func,
  onChange: PropTypes.func,
  rootPrefixCls: PropTypes.string,
};

SelectParams.defaultProps = {
  mode: modesMap[0],
  enableAlpha: true,
};
