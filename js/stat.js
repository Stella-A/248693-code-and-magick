'use strict';

(function () {
  var PLAYER = 'Вы';
  var COLOR_BLACK = 'rgb(0, 0, 0)';
  var COLOR_WHITE = 'rgb(256, 256, 256)';
  var COLOR_RED = 'rgba(255, 0, 0, 1)';
  var COLOR_BLACK_TRANSPARENT = 'rgba(0, 0, 0, 0.7)';
  var COLOR_TRANSPARENT = 'rgba(0, 0, 0, 0.0)';
  var FONT = '16px PT Mono';
  var HISTOGRAM_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var INDENT = 50;
  var INITIAL_X = 130;
  var INITIAL_Y = 250;

  var drawCloud = function (ctx) {
    ctx.fillStyle = COLOR_WHITE;
    ctx.beginPath();
    ctx.moveTo(100, 10);
    ctx.bezierCurveTo(120, -20, 250, 30, 200, 15);
    ctx.bezierCurveTo(320, 40, 270, -33, 370, 25);
    ctx.bezierCurveTo(380, 25, 455, -30, 480, 40);
    ctx.bezierCurveTo(470, 20, 580, 64, 520, 120);
    ctx.bezierCurveTo(520, 106, 660, 180, 530, 200);
    ctx.bezierCurveTo(500, 185, 800, 320, 100, 275);
    ctx.lineTo(100, 10);
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = COLOR_BLACK_TRANSPARENT;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  var getRandomShadeColor = function (r, g, b) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + window.util.getRandomNumber(0.1, 1) + ')';
  };

  var renderingHistogramColumn = function (ctx, x, y, width, height, offset, iteration) {
    x = x + (offset + width) * iteration;
    ctx.fillRect(x, y, width, height);
  };

  window.renderStatistics = function (ctx, names, times) {

    drawCloud(ctx);

    ctx.fillStyle = COLOR_BLACK;
    ctx.font = FONT;
    ctx.shadowColor = COLOR_TRANSPARENT;
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    var step = HISTOGRAM_HEIGHT / (window.util.getMaxElement(times) - 0);

    for (var j = 0; j < times.length; j++) {
      ctx.fillStyle = getRandomShadeColor(0, 0, 255);
      if (names[j] === PLAYER) {
        ctx.fillStyle = COLOR_RED;
      }

      renderingHistogramColumn(ctx, INITIAL_X, INITIAL_Y, BAR_WIDTH, times[j] * -step, INDENT, j);
      ctx.fillStyle = COLOR_BLACK;
      ctx.textBaseline = 'top';
      ctx.fillText(names[j], INITIAL_X + (INDENT + BAR_WIDTH) * j, INITIAL_Y);
      ctx.textBaseline = 'bottom';
      ctx.fillText(Math.round(times[j]), INITIAL_X + (INDENT + BAR_WIDTH) * j, INITIAL_Y + times[j] * -step);
    }
  };
})();
