import {
  openModal
}
from './modal.js';

//создание исходного массива
const initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  alt: "Фотография Архыза",
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  alt: "Фотография Челябинской области",
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  alt: "Фотография Иваново",
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  alt: "Фотография Камчатки",
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  alt: "Фотография Холмогорского района",
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  alt: "Фотография Байкала",
}];

//функция для создания новой карточки
function createCard(initialCards, deleteCard, likeCard, openCard) {
  const cardTemplate = document.querySelector('#card-template').content;

  const userElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = userElement.querySelector('.card__delete-button');

  const likeButton = userElement.querySelector('.card__like-button');

  userElement.querySelector('.card__title').textContent = initialCards.name;
  userElement.querySelector('.card__image').src = initialCards.link;
  userElement.querySelector('.card__image').alt = initialCards.alt;

  //обработчики событий
  deleteButton.addEventListener('click', deleteCard); //удаление
  likeButton.addEventListener('click', likeCard); //лайк
  userElement.querySelector('.card__image').addEventListener('click', openCard); //открытие модального окна

  return userElement;
}

//функция для удаления карточки
function deleteCard(evt) {
  const placesItem = evt.target.closest('.places__item');
  placesItem.remove();
}

//функция для лайка
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

//функция для открытия модального окна
function openCard(evt) {
  openModal(evt);

  const popupImage = document.querySelector('.popup_type_image');

  const imageInPopup = popupImage.querySelector('.popup__image');
  const captionInPopup = popupImage.querySelector('.popup__caption');

  imageInPopup.src = evt.target.src;

  //поиск имени карточки в массиве карточек
  for (let i = 0; i < initialCards.length; i++) {
    if (initialCards[i].link === imageInPopup.src) {
      captionInPopup.textContent = initialCards[i].name;
    }
  }
}

//экспорт
export {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
  openCard
};