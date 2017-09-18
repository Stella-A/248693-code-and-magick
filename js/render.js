'use strict';

(function () {
  var MAX_WIZARD_RENDER_COUNT = 4;
  var setupElement = document.querySelector('.setup');
  var similarElement = setupElement.querySelector('.setup-similar');
  var similarListElement = setupElement.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > MAX_WIZARD_RENDER_COUNT ? MAX_WIZARD_RENDER_COUNT : data.length;

    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }

    similarElement.classList.remove('hidden');
  };
})();
