// @todo: Темплейт карточки
const placesItemTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (item, onDelete) => {
  const cardElement = placesItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", onDelete);

  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (event) => event.target.closest(".card").remove();

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => placesList.append(createCard(item, deleteCard)));
