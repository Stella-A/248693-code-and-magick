'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);

  return rand;
};

var getRandomElement = function (arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
};

var createWizard = function (arr) {
  for (var j = 0; j < 4; j++) {
    arr[j] = {
      name: getRandomElement(WIZARD_FIRST_NAMES) + ' ' + getRandomElement(WIZARD_SECOND_NAMES),
      coatColor: getRandomElement(WIZARD_COATS),
      eyesColor: getRandomElement(WIZARD_EYES)
    };
  }

  return wizards;
}

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
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var wizards = [];

createWizard(wizards);

fillDOM(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
