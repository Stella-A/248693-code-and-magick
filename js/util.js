'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getMaxElement: function (arr) {
      var max = -1;

      for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        if (num > max) {
          max = num;
        }
      }

      return max;
    },
    getRandomNumber: function (min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);

      return rand;
    },
    getRandomElement: function (arr) {
      return arr[this.getRandomInteger(0, arr.length - 1)];
    }
  };
})();
