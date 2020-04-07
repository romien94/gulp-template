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