'use strict';

// modal window
var callMeButton = document.querySelector('.callme-button');
var modalWindow = document.querySelector('.modal');
var modalCloseButton = document.querySelector('.modal-close');
var modalNameField = document.querySelector('#modal-name');

function getBodyScrollTop() {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (document.body && document.body.scrollTop)
  );
}

callMeButton.addEventListener('click', function (e) {
  e.preventDefault();

  document.body.dataset.scrollY = getBodyScrollTop();
  document.body.style.top = -document.body.dataset.scrollY + 'px';

  modalWindow.classList.add('modal--active');
  document.body.classList.add('body-lock');
  setTimeout(() => {
    modalNameField.focus();    
  }, 200);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModalWindow();
  }
});

modalWindow.addEventListener('click', function (e) {
  if (e.target === modalWindow) {
    closeModalWindow();
  }
});

modalCloseButton.addEventListener('click', function () {
  closeModalWindow();
});

function closeModalWindow() {
  modalWindow.classList.remove('modal--active');
  document.body.classList.remove('body-lock');
}

// window scroll
// window scroll
var scrollButton = document.querySelector('.scroll-button');
var aboutSection = document.querySelector('#about');
var consultButton = document.querySelector('.consult-button');
var feedbackSection = document.querySelector('#form');

scrollButton.addEventListener('click', function (e) {
  e.preventDefault();
  smoothScroll('#about', 1000, 50);
});

consultButton.addEventListener('click', function (e) {
  e.preventDefault();
  smoothScroll('#form', 1000);
});

function smoothScroll(target, duration, topPadding = 0) {
  var target = document.querySelector(target);
  var targetPosition = target.offsetTop;
  var startPosition = window.scrollY;
  var distance = targetPosition - startPosition + topPadding;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function ease(t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return (c / 2 * t * t + b);
    }
    t--;
    return -c / 2 * (t*(t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}


// phonemask check
IMask(document.querySelector('#phone'), {mask: '+{7}(000)000-00-00'});
IMask(document.querySelector('#modal-phone'), {mask: '+{7}(000)000-00-00'});

// form validator
var forms = document.querySelectorAll('.form');
for (var z = 0; z < forms.length; z++) {
  (function () {
    var form = forms[z];
    var submitButton = form.querySelector('.submit-button');
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        var formFields = form.querySelectorAll('.form__field');
        for (var b = 0; b < formFields.length; b++) {
          var fieldName = formFields[b].getAttribute('name');
          var fieldValue = formFields[b].value;
          localStorage.setItem(fieldName, fieldValue);
          formFields[b].value = '';
        }
        // var formFields = form.querySelectorAll('.form__field');
        // for (var k = 0; k < formFields.length; k++) {
        //   (function () {
        //     var fieldName = formFields[k].getAttribute('name');
        //     var fieldValue = formFields[k].value;
        //     localStorage.setItem(fieldName, fieldValue);
        //     formFields[k].value = '';
        //   })();
        // }
        return true;
      } else {
        return false;
      }
    });
  })();
}

function validateForm(form) {
  var valid = true;
  var formFields = form.querySelectorAll('.form__field');
  for (var n = 0; n < formFields.length; n++) {
    if (!validateField(formFields[n])) {
      valid = false;
    }
  }
  return valid;
}

function validateField(field) {
  checkRequiredAttribute(field);
  if (field.checkValidity()) {
    return (field.previousElementSibling) ? field.parentNode.removeChild(field.previousElementSibling) : '';
  } else {
    if (!field.previousElementSibling) {
      createError(field);
      field.previousElementSibling.textContent = field.validationMessage;
    }
    return false;
  }
}

function createError(field) {
  var error = document.createElement('div');
  field.parentNode.insertBefore(error, field);
  error.classList.add('error');
}

function checkRequiredAttribute(field) {
  return (field.hasAttribute('required')) ? true : field.setAttribute('required', '');
}

// footer toggles
var navigationTitle = document.querySelector('.navigation__title');
var navigationBlock = document.querySelector('.navigation');
var contactsTitle = document.querySelector('.contacts__title');
var contactsBlock = document.querySelector('.contacts');

navigationTitle.addEventListener('click', function () {
  navigationBlock.classList.toggle('navigation--active');
});

contactsTitle.addEventListener('click', function () {
  contactsBlock.classList.toggle('contacts--active');
});
