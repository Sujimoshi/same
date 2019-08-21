import { ColorFormats } from "tinycolor2";

export const calcSaturation = (
  e: MouseEvent,
  hsl: ColorFormats.HSLA,
  container: HTMLElement
): ColorFormats.HSVA => {
  const {
    width: containerWidth,
    height: containerHeight
  } = container.getBoundingClientRect();
  const x = e.pageX;
  const y = e.pageY;
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  } else if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  const saturation = (left * 100) / containerWidth;
  const bright = -((top * 100) / containerHeight) + 100;

  return {
    h: hsl.h,
    s: saturation,
    v: bright,
    a: hsl.a
  };
};

export const calcHue = (
  e: MouseEvent,
  hsl: ColorFormats.HSLA,
  container: HTMLElement
): ColorFormats.HSLA => {
  const containerWidth = container.clientWidth;
  const x = e.pageX;
  const y = e.pageY;
  const left =
    x - (container.getBoundingClientRect().left + window.pageXOffset);

  let h;
  if (left < 0) {
    h = 0;
  } else if (left > containerWidth) {
    h = 359;
  } else {
    const percent = (left * 100) / containerWidth;
    h = (360 * percent) / 100;
  }

  if (hsl.h !== h) {
    return {
      h,
      s: hsl.s,
      l: hsl.l,
      a: hsl.a
    };
  }
  return null;
};

export const calcAplha = (
  e: MouseEvent,
  hsl: ColorFormats.HSLA,
  container: HTMLElement
): ColorFormats.HSLA => {
  const containerWidth = container.clientWidth;
  const x = e.pageX;
  const y = e.pageY;
  const left =
    x - (container.getBoundingClientRect().left + window.pageXOffset);

  let a;
  if (left < 0) {
    a = 0;
  } else if (left > containerWidth) {
    a = 1;
  } else {
    a = Math.round((left * 100) / containerWidth) / 100;
  }

  return {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
    a
  };
};
