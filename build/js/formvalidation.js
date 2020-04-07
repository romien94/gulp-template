const form = document.querySelector('.feedback__form'),
    sendButton = form.querySelector('.submit-button'),
    formFields = Array.from(form.querySelectorAll('.form__field'));

sendButton.addEventListener('click', e => {
    e.preventDefault();
    validateForm(form);

    if (validateForm(form)) {
        console.log('okay')
    } else {
        console.log('not okay')
    }
})

function validateForm(form) {
    let valid = true;
    for (let field of formFields) {
        checkField(field);
        if (!checkField(field)) valid = false;
    }
    return valid;
}

function checkField(field) {
    if (field.checkValidity()) {
        (field.previousElementSibling) ? field.parentNode.removeChild(field.previousElementSibling) : '';
        return true;
    }
    else {
        (!field.previousElementSibling) ? createError(field) : '';
        field.previousElementSibling.textContent = field.validationMessage;
        return false;
    }
}

function createError(field) {
    const error = document.createElement('div');
    // field.parentNode.appendChild(error);
    field.parentNode.insertBefore(error, field)
    error.classList.add('error');
}