const phoneInput = document.querySelector("#phone");
const phoneLength = phone.length;

function checkCountryCode(field) {
    let fieldValue = field.value;
    return (fieldValue.startsWith('+7'))? true : field.value = '+7' + field.value;
}

function checkField(value) {
    return (parseInt(value) && value.length === 12)? true: false;
}

function checkFieldLength(field) {
    let fieldLength = field.value.length;
    return (fieldLength < 12)? true : false;
}

phoneInput.addEventListener('focus', e => {
    checkCountryCode(phoneInput);
});


phoneInput.addEventListener('keydown', e => {
    (checkFieldLength(phoneInput) && Number(e.key) || e.key === 'Backspace')? '' : e.preventDefault();
})

phoneInput.addEventListener('blur', e => {
    let phoneValue = phoneInput.value;
    (phone.value.startsWith('+7') && checkField(phoneValue))? '': phoneInput.value = '';
})