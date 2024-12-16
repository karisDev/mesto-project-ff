const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");

const togglePopup = (popup) => {
  popup.classList.toggle("popup_is-opened");
};

const initPopups = () => {
  popups.forEach((item) => {
    item.classList.add("popup_is-animated");
  });
  closeButtons.forEach((item) =>
    item.addEventListener("click", () =>
      closePopup(item.closest(".popup_is-opened"))
    )
  );
};

const openPopup = (popup) => {
  togglePopup(popup);
  document.addEventListener("keydown", closePopupKeydown);
  popup.addEventListener("click", closePopupOverlay);
};

const closePopup = (popup) => {
  togglePopup(popup);
  document.removeEventListener("keydown", closePopupKeydown);
  popup.removeEventListener("click", closePopupOverlay);
};

const closePopupKeydown = (popup) => {
  if (popup.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

const closePopupOverlay = (event) => {
  if (event.currentTarget === event.target) {
    closePopup(event.target.closest(".popup_is-opened"));
  }
};

export { openPopup, initPopups, closePopup };
