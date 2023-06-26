export const chromaKeyer = (
  frame: ImageData,
  r: [number, number] = [0, 255],
  g: [number, number] = [0, 255],
  b: [number, number] = [0, 255]
): void => {
  for (let i = 0; i < frame.data.length; i += 4) {
    let red = frame.data[i];
    let green = frame.data[i + 1];
    let blue = frame.data[i + 2];
    if (
      red >= r[0] &&
      red <= r[1] &&
      green >= g[0] &&
      green <= g[1] &&
      blue >= b[0] &&
      blue <= b[1]
    ) {
      // If the pixel is within the range, set the alpha to 0
      frame.data[i + 3] = 0;
    }
  }
};
