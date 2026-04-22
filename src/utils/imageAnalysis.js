export const getAveragePixel = (ctx, x, y, size = 11) => {
  const half = Math.floor(size / 2);

  let r = 0, g = 0, b = 0, count = 0;

  for (let dx = -half; dx <= half; dx++) {
    for (let dy = -half; dy <= half; dy++) {
      const px = x + dx;
      const py = y + dy;

      if (
        px >= 0 &&
        py >= 0 &&
        px < ctx.canvas.width &&
        py < ctx.canvas.height
      ) {
        const data = ctx.getImageData(px, py, 1, 1).data;
        r += data[0];
        g += data[1];
        b += data[2];
        count++;
      }
    }
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
};

export const computeIndex = ({ r, g }) => {
  if (r === "-" || g === "-") return "-";
  return ((g - r) / (g + r)).toFixed(3);
};