// modal window
const body = document.querySelector("body");
const callMeButton = document.querySelector(".callme-button");
const modalWindow = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal-close");

function getBodyScrollTop() {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (document.body && document.body.scrollTop)
  );
}

callMeButton.addEventListener("click", (e) => {
  e.preventDefault();

  body.dataset.scrollY = getBodyScrollTop();
  body.style.top = `-${body.dataset.scrollY}px`;

  modalWindow.classList.add("modal--active");
  body.classList.add("body-lock");
});

document.addEventListener('keydown', e => {
  closeModalWindow();
})

modalWindow.addEventListener("click", e => {
  if (e.target === modalWindow ) {
    closeModalWindow();
  }
})

modalCloseButton.addEventListener("click", (e) => closeModalWindow());

function closeModalWindow() {
  modalWindow.classList.remove("modal--active");
  body.classList.remove("body-lock");
}

// phonemask check
IMask(document.querySelector('#phone'), {mask: '+{7}(000)000-00-00'});
IMask(document.querySelector('#modal-phone'), {mask: '+{7}(000)000-00-00'});


// form validator
const forms = document.querySelectorAll('.form');

forms.forEach((form, index) => {
    const submitButton = form.querySelector('.submit-button');

    submitButton.addEventListener('click', e => {
        e.preventDefault();
        if (validateForm(form)) {
            const formFields = form.querySelectorAll('.form__field');
            formFields.forEach(field => {
                const fieldName = field.getAttribute("name"),
                    fieldValue = field.value;
                    localStorage.setItem(fieldName, fieldValue);
                    field.value = '';
            })
        }
    })
})

function validateForm(form) {
    let valid = true;
    const formFields = form.querySelectorAll('.form__field');
    formFields.forEach(field => {
        if (!validateField(field)) valid = false;
    })
    return valid;
}

function validateField(field) {
    checkRequiredAttribute(field);
    if (field.checkValidity()) {
        (field.previousElementSibling)? field.parentNode.removeChild(field.previousElementSibling) : '';
        return true;
    } else {
        (field.previousElementSibling)? '' : createError(field);
        field.previousElementSibling.textContent = field.validationMessage;
        return false;  
    }
}

function createError(field) {
    const error = document.createElement('div');
    field.parentNode.insertBefore(error, field);
    error.classList.add('error');
}

function clearField(field) {
    return field.value = '';
}

function checkRequiredAttribute(field) {
    return (field.hasAttribute("required"))? true : field.setAttribute("required", "");
}

// footer toggles
const navigationTitle = document.querySelector('.navigation__title');
const navigationBlock = document.querySelector('.navigation');
const contactsTitle = document.querySelector('.contacts__title');
const contactsBlock = document.querySelector('.contacts');

navigationTitle.addEventListener('click', e => {
  navigationBlock.classList.toggle('navigation--active');  
})

contactsTitle.addEventListener('click', e => {
  contactsBlock.classList.toggle('contacts--active');  
})