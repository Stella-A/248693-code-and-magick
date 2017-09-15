'use strict';

(function () {
  var CELL_ARTEFACT = 'setup-artifacts-cell';
  var NONE_CHILD_ELEMENT = 0;
  var COLOR_YELLOW = 'yellow';
  var COLOR_NONE = '';

  var setupElement = document.querySelector('.setup');
  var shopElement = setupElement.querySelector('.setup-artifacts-shop');
  var artifactsElement = setupElement.querySelector('.setup-artifacts');
  var formElement = setupElement.querySelector('.setup-wizard-form');
  var draggedItem = null;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

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

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), function () {
      setupElement.classList.add('hidden');
    }, errorHandler);
  });
})();
