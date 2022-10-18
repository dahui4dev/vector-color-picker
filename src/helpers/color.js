import tinycolor from 'tinycolor2';

export default class Color {
  constructor(input) {
    this.color = tinycolor(input);

    this.initRgb();
    this.initHsb();
    this.initHsl();

    const initAlpha = (input && input.alpha) || this.color.toRgb().a;
    this.alphaValue = Math.min(1, initAlpha) * 100;
  }

  static isValidHex(hex) {
    return tinycolor(hex).isValid();
  }

  initRgb = () => {
    const { r, g, b } = this.color.toRgb();

    this.redValue = r;
    this.greenValue = g;
    this.blueValue = b;
  };

  initHsb = () => {
    const { h, s, v } = this.color.toHsv();

    this.hueValue = h;
    this.saturationHsbValue = s;
    this.brightnessValue = v;
  };

  initHsl = () => {
    const { h, s, l } = this.color.toHsl();

    this.hueValue = h;
    this.saturationHslValue = s;
    this.lightnessValue = l;
  };

  toHexString = () => {
    return this.color.toHexString();
  };

  toRgbString = () => {
    return this.color.toRgbString();
  };

  get hex() {
    return this.color.toHex();
  }

  // 色相
  set hue(value) {
    this.color = tinycolor({
      h: value,
      s: this.saturationHsb,
      v: this.brightness,
    });

    this.initRgb();
    this.initHsb();
    this.initHsl();
    this.hueValue = value;
  }
  get hue() {
    return this.hueValue;
  }

  // HSB 饱和度
  set saturationHsb(value) {
    this.color = tinycolor({
      h: this.hue,
      s: value,
      v: this.brightness,
    });

    this.initRgb();
    this.initHsl();
    this.saturationHsbValue = value;
  }
  get saturationHsb() {
    return this.saturationHsbValue;
  }

  // HSB 亮度
  set brightness(value) {
    this.color = tinycolor({
      h: this.hue,
      s: this.saturationHsb,
      v: value,
    });

    this.initRgb();
    this.initHsl();
    this.brightnessValue = value;
  }
  get brightness() {
    return this.brightnessValue;
  }

  // HSL 饱和度
  set saturationHsl(value) {
    this.color = tinycolor({
      h: this.hue,
      s: value,
      v: this.lightness,
    });

    this.initRgb();
    this.initHsb();
    this.saturationHslValue = value;
  }
  get saturationHsl() {
    return this.saturationHslValue;
  }

  // HSL 亮度
  set lightness(value) {
    this.color = tinycolor({
      h: this.hue,
      s: this.saturationHsl,
      l: value,
    });

    this.initRgb();
    this.initHsb();
    this.lightnessValue = value;
  }
  get lightness() {
    return this.lightnessValue;
  }

  // red
  set red(value) {
    const rgb = this.color.toRgb();
    this.color = tinycolor({
      ...rgb,
      r: value,
    });

    this.initHsb();
    this.initHsl();
    this.redValue = value;
  }
  get red() {
    return this.redValue;
  }

  // green
  set green(value) {
    const rgb = this.color.toRgb();
    this.color = tinycolor({
      ...rgb,
      g: value,
    });

    this.initHsb();
    this.initHsl();
    this.greenValue = value;
  }
  get green() {
    return this.greenValue;
  }

  // blue
  set blue(value) {
    const rgb = this.color.toRgb();
    this.color = tinycolor({
      ...rgb,
      b: value,
    });

    this.initHsb();
    this.initHsl();
    this.blueValue = value;
  }
  get blue() {
    return this.blueValue;
  }

  // alpha
  set alpha(value) {
    this.color.setAlpha(value / 100);
  }
  get alpha() {
    return this.color.getAlpha() * 100;
  }

  get RGB() {
    return [this.red, this.green, this.blue];
  }

  get HSB() {
    return [this.hue, this.saturationHsb, this.brightness];
  }

  get HSL() {
    return [this.hue, this.saturationHsl, this.lightness];
  }
}
