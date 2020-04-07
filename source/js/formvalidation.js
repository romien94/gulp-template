const form = document.querySelector('.feedback__form'),
    sendButton = form.querySelector('.submit-button');

sendButton.addEventListener('click', e => {
    
    if (validateForm(form)) {
        const formFields = form.querySelectorAll('.form__field');
        for (let i = 0; i < formFields.length; i++) {
            let fieldName = formFields[i].getAttribute("name");
            let fieldValue = formFields[i].value;
            localStorage.setItem(fieldName, fieldValue);
            clearField(formFields[i]);
        }
        showMessage(form);
    }

});

function validateForm(form) {
    let valid = true;
    const formFields = Array.from(form.querySelectorAll('.form__field'));
    formFields.forEach(field => {
        if (!validateField(field)) valid = false;
    })
    return valid;
}

function validateField(field) {
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

function showMessage(form) {
    let message = document.createElement('div');
    message.textContent = 'Ваша заявка была принята. Мы перезвоним Вам позднее';
    form.appendChild(message);

    setTimeout(() => {
        form.removeChild(message);        
    }, 3000);
}