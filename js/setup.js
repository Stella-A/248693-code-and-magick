'use strict';

(function () {
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var CELL_ARTEFACT = 'setup-artifacts-cell';
  var NONE_CHILD_ELEMENT = 0;
  var COLOR_YELLOW = 'yellow';
  var COLOR_NONE = '';

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupPlayer = setup.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var artifactsElement = setup.querySelector('.setup-artifacts');
  var form = setup.querySelector('.setup-wizard-form');
  var draggedItem = null;

  var fillElement = function (elem, arr) {
    elem.style.fill = arr[window.util.getRandomInteger(0, arr.length - 1)];
  };

  var changeElementBackground = function (elem, arr) {
    elem.style.backgroundColor = arr[window.util.getRandomInteger(0, arr.length - 1)];
  };

  window.colorizeElement(wizardCoat, WIZARD_COATS, fillElement);
  window.colorizeElement(wizardEyes, WIZARD_EYES, fillElement);
  window.colorizeElement(setupFireballWrap, WIZARD_FIREBALLS, changeElementBackground);

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    if (evt.target.className === CELL_ARTEFACT && evt.target.childElementCount === NONE_CHILD_ELEMENT) {
      evt.target.appendChild(draggedItem.cloneNode());
      evt.target.style.backgroundColor = COLOR_NONE;
      evt.target.style.outline = 'none';
      evt.preventDefault();
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    if (evt.target.className === CELL_ARTEFACT && evt.target.childElementCount === NONE_CHILD_ELEMENT) {
      evt.target.style.backgroundColor = COLOR_YELLOW;
      evt.target.style.outline = '2px dashed red';
      evt.preventDefault();
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    if (evt.target.className === CELL_ARTEFACT && evt.target.childElementCount === NONE_CHILD_ELEMENT) {
      evt.target.style.backgroundColor = COLOR_NONE;
      evt.target.style.outline = 'none';
      evt.preventDefault();
    }
  });

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
  });
})();
