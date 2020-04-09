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
            showMessage(form);
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

function showMessage(form) {
    let message = document.createElement('div');
    message.textContent = 'Ваша заявка была принята. Мы перезвоним Вам позднее';
    message.style.color = 'black';
    form.appendChild(message);

    setTimeout(() => {
        form.removeChild(message);        
    }, 3000);
}

function checkRequiredAttribute(field) {
    return (field.hasAttribute("required"))? true : field.setAttribute("required", "");
}