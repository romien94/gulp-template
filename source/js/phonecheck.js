const phoneInputs = document.querySelectorAll("input[type='tel']");

phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('focus', e => {
        checkCountryCode(phoneInput);
    });
    
    
    phoneInput.addEventListener('keydown', e => {
        (checkFieldLength(phoneInput) && Number(e.key) || checkIfButtonIsAllowed(e))? '' : e.preventDefault();
    })
    
    phoneInput.addEventListener('blur', e => {
        let phoneValue = phoneInput.value;
        (phoneValue.startsWith('+7') && checkField(phoneValue))? '': phoneInput.value = '';
    })
})



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

function checkIfButtonIsAllowed(event) {
    let pressedButton = event.key;
    let ctrlVCombination = event.ctrlKey && event.key === 'v';

    if (pressedButton === 'Backspace' || pressedButton === 'Tab' || ctrlVCombination) return true;
    else return false;
}