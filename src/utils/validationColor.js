import Color from '../helpers/color';

module.exports = function validationColor(props, propName, componentName) {
  if (props[propName] && !Color.isValidHex(props[propName])) {
    return new Error(`${componentName}.props.${propName} Validation failed!`);
  }
};
