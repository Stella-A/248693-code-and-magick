'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgb(256, 256, 256)';
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
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.0)';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  var barWidth = 40;
  var indent = 50;
  var initialX = 130;
  var initialY = 250;

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = 'rgba(2, 14, 134, ' + (Math.random() * (1 - 0.1) + 0.1) + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + (indent + barWidth) * i, initialY, barWidth, times[i] * -step);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textBaseline = 'top';
    ctx.fillText(names[i], initialX + (indent + barWidth) * i, initialY);
    ctx.textBaseline = 'bottom';
    ctx.fillText(Math.floor(times[i]), initialX + (indent + barWidth) * i, initialY + times[i] * -step);
  }
};
