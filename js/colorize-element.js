'use strict';

(function () {
  window.colorizeElement = function (elem, arr, callback) {
    elem.addEventListener('click', function () {
      if (typeof callback === 'function') {
        callback(elem, arr);
      }
    });
  };
})();
