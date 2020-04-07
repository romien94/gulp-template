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

modalCloseButton.addEventListener("click", (e) => closeModalWindow());

function closeModalWindow() {
  modalWindow.classList.remove("modal--active");
  body.classList.remove("body-lock");
}