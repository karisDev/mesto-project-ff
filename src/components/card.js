import { CardService } from "../api/cardService";
import { closePopup, openPopup } from "./popup";
import { user } from "./user";
import {
  clearValidation,
  disableButtonElement,
  SELECTOR,
  toggleSubmitButtonLoader,
} from "./validation";

const content = document.querySelector(".content");
const template = document.querySelector("#card-template").content;
const placesList = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImageImage = popupImage.querySelector(".popup__image");

const cardModal = document.querySelector(".popup_type_new-card");
const cardName = cardModal.querySelector(".popup__input_type_card-name");
const cardUrl = cardModal.querySelector(".popup__input_type_url");

const createCardButton = content.querySelector(".profile__add-button");
const createCardForm = document.forms.namedItem("new-place");

const hasUserLike = (card) => card.likes.some((like) => like._id === user.id);

const deleteCard = (e, id) => {
  const card = e.target.closest(".card");
  CardService.delete(id)
    .then(() => card.remove())
    .catch(console.error);
};

const expandImage = (card) => {
  popupImageCaption.textContent = card.name;
  popupImageImage.src = card.link;
  popupImageImage.alt = card.name;
  openPopup(popupImage);
};

const createCard = (card) => {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (user.id === card.owner._id) {
    deleteButton.addEventListener("click", (e) => deleteCard(e, card._id));
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => expandImage(card));

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = card.likes.length;
  if (hasUserLike(card)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    toggleLike(card, likeButton, likeCounter)
  );

  return cardElement;
};

const toggleLike = async (card, likeButton, likeCounter) => {
  let res;
  if (hasUserLike(card)) {
    res = await CardService.dislike(card._id);
  } else {
    res = await CardService.like(card._id);
  }

  likeCounter.textContent = res.likes.length;
  card.likes = res.likes;
  likeButton.classList.toggle("card__like-button_is-active");
};

const initCards = async () => {
  if (!user.id) throw new Error("user is not initialized");

  const cards = await CardService.get();

  cards.forEach((card) => placesList.append(createCard(card)));

  createCardButton.addEventListener("click", () => {
    const submitButton = createCardForm.querySelector(SELECTOR.submitButton);
    openPopup(cardModal);
    clearValidation(cardModal);
    createCardForm.reset();
    disableButtonElement(true, submitButton);
  });

  cardModal.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = createCardForm.querySelector(SELECTOR.submitButton);
    toggleSubmitButtonLoader(submitButton, true);

    CardService.create(cardName.value, cardUrl.value).then((card) => {
      placesList.prepend(createCard(card));
      closePopup(cardModal);
      createCardForm.reset();
    });
  });
};

export { initCards };
