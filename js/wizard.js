'use strict';

(function () {
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupElement = document.querySelector('.setup');
  var setupPlayerElement = setupElement.querySelector('.setup-player');
  var wizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupPlayerElement.querySelector('.wizard-eyes');
  var setupFireballWrapElement = setupPlayerElement.querySelector('.setup-fireball-wrap');

  var fillElement = function (elem, arr) {
    var newColor = arr[window.util.getRandomInteger(0, arr.length - 1)];

    elem.style.fill = newColor;

    if (elem === wizardCoatElement) {
      wizard.onCoatChange(newColor);
    } else if (elem === wizardEyesElement) {
      wizard.onEyesChange(newColor);
    }
  };

  var changeElementBackground = function (elem, arr) {
    elem.style.backgroundColor = arr[window.util.getRandomInteger(0, arr.length - 1)];
  };

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  window.colorizeElement(wizardCoatElement, WIZARD_COATS, fillElement);
  window.colorizeElement(wizardEyesElement, WIZARD_EYES, fillElement);
  window.colorizeElement(setupFireballWrapElement, WIZARD_FIREBALLS, changeElementBackground);

  window.wizard = wizard;

  return window.wizard;
})();
