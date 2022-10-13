import React from 'react';
import PropTypes from 'prop-types';

/**
 * 吸管
 */
export default class Absorption extends React.Component {
  constructor(props) {
    super(props);
  }

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-absorption`;
  };

  render() {
    const prefixCls = this.getPrefixCls();
    return (
      <div className={prefixCls} onMouseDown={this.props.onAbsorption}>
        <span />
      </div>
    );
  }
}

Absorption.propTypes = {
  rootPrefixCls: PropTypes.string,
  onAbsorption: PropTypes.func,
};
