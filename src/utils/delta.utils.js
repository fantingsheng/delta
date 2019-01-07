
/**
* 为canvas添加辅助的绘图网格
*/
function drawGrid(ctx, xspacing = 10, yspacing = 10, color = '#CCC') {
  const WIDTH = ctx.canvas.width;
  const HEIGHT = ctx.canvas.height;
  const HORIZONTAL_NUMS = HEIGHT / yspacing;
  const VERTICAL_NUMS = WIDTH / xspacing;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.setLineDash = [1, 1];
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  for (let i = 0; i < HORIZONTAL_NUMS; i++) {
    ctx.moveTo(0, xspacing * i + 0.5);
    ctx.lineTo(WIDTH, xspacing * i + 0.5);
  }
  for (let i = 0; i < VERTICAL_NUMS; i++) {
    ctx.moveTo(yspacing * i + 0.5, 0);
    ctx.lineTo(yspacing * i + 0.5, HEIGHT);
  }
  ctx.stroke();
  ctx.restore();
}
/**
* 绘制矩形,可设置圆角
*/
function drawRect(ctx, x, y, width, height, r = 0) {

}
/**
* 创建指定的命名空间
*/
function pkg(path) {
  let paths = path.split('.');
  paths.reduce( (path, name) => {
    if (!path[name]) {
      path[name] = {};
    }
    return path[name];
  }, global);
}
function angle2Radian(angle) {
  return angle / 180 * Math.PI;
}
function radian2Angle(radian) {
  return 180 / Math.PI * radian;
}
function getScaleMatrix(scaleX, sy) {
  let scaleY = sy || scaleX;
  return [
    [scaleX, 0, 0],
    [0, scaleY, 0],
    [0,      0, 1]
  ];
}
function getRotateMatrix(angle) {
  return [
    [ Math.cos(angle), Math.sin(angle), 0],
    [-Math.sin(angle), Math.cos(angle), 0],
    [0,      0, 1]
  ];
}
function getTranslateMatrix(translate) {
  return [
    [1, 0, translate[0]],
    [0, 1, translate[1]],
    [0, 0,            1]
  ];
}
function multiplyMatrix(m1, m2) {
  if (m1[0].length !== m2.length) {
    throw 'invalid arguments';
  }
  let result = [];
  let rows = m1.length,
      cols = m2[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!result[i]) {
        result[i] = [];
      }
      result[i][j] = m1[i].reduce((sum, num, index) => {
        sum += num * m2[index][j];
        return sum;
      }, 0);
    }
  }
  return result;
}
export {drawGrid,
        drawRect,
        pkg,
        angle2Radian,
        radian2Angle,
        getScaleMatrix,
        getRotateMatrix,
        getTranslateMatrix,
        multiplyMatrix
      };
