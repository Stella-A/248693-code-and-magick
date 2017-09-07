'use strict';

(function () {
  var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var CELL_ARTEFACT = 'setup-artifacts-cell';
  var NONE_CHILD_ELEMENT = 0;
  var COLOR_YELLOW = 'yellow';
  var COLOR_NONE = '';

  var createWizards = function (arr) {
    for (var j = 0; j < 4; j++) {
      arr[j] = {
        name: window.util.getRandomElement(WIZARD_FIRST_NAMES) + ' ' + window.util.getRandomElement(WIZARD_SECOND_NAMES),
        coatColor: window.util.getRandomElement(WIZARD_COATS),
        eyesColor: window.util.getRandomElement(WIZARD_EYES)
      };
    }
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fillDOM = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    similarListElement.appendChild(fragment);
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
  var artifactCell = setup.querySelector('.setup-artifacts-cell');
  var draggedItem = null;
  var wizards = [];

  createWizards(wizards);

  fillDOM(wizards);

  setup.querySelector('.setup-similar').classList.remove('hidden');

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = WIZARD_COATS[window.util.getRandomInteger(0, WIZARD_COATS.length - 1)];
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = WIZARD_EYES[window.util.getRandomInteger(0, WIZARD_EYES.length - 1)];
  });

  setupFireballWrap.addEventListener('click', function () {
    setupFireballWrap.style.backgroundColor = WIZARD_FIREBALLS[window.util.getRandomInteger(0, WIZARD_FIREBALLS.length - 1)];
  });

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
})();
