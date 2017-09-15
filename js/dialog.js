'use strict';

(function () {
  var onPopupEscPress = function (evt) {
    if (!(userNameInputElement === document.activeElement)) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    dialogHandleElement.addEventListener('mousedown', onDialogHandleMousedown);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    dialogHandleElement.removeEventListener('mousedown', onDialogHandleMousedown);
    setupElement.removeAttribute('style');
  };

  var onDialogHandleMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var closeButtonElement = setupElement.querySelector('.setup-submit');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');
  var dialogHandleElement = setupElement.querySelector('.setup-user-pic');

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInputElement.addEventListener('invalid', function () {
    if (!userNameInputElement.validity.valid) {
      if (userNameInputElement.validity.tooShort) {
        userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInputElement.validity.tooLong) {
        userNameInputElement.setCustomValidity('Имя не должно превышать 50-ти символов');
      } else if (userNameInputElement.validity.valueMissing) {
        userNameInputElement.setCustomValidity('Обязательное поле');
      } else {
        userNameInputElement.setCustomValidity('');
      }
    }
  });

  userNameInputElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  closeButtonElement.addEventListener('click', function () {
    if (userNameInputElement.validity.valid) {
      closePopup();
    }
  });

  closeButtonElement.addEventListener('keydown', function (evt) {
    if (userNameInputElement.validity.valid) {
      window.util.isEnterEvent(evt, closePopup);
    }
  });
})();
