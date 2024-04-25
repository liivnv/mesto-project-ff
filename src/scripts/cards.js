import {
  openCard
}
from './index.js';

const cardTemplate = document.querySelector('#card-template').content;

//функция для создания новой карточки
function createCard(item, deleteCard, likeCard, openCard) {
  const userElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = userElement.querySelector('.card__delete-button');

  const likeButton = userElement.querySelector('.card__like-button');

  const cardImage = userElement.querySelector(".card__image");
  const cardTitle = userElement.querySelector('.card__title');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.alt;

  //обработчики событий
  deleteButton.addEventListener('click', deleteCard); //удаление
  likeButton.addEventListener('click', likeCard); //лайк
  cardImage.addEventListener('click', openCard); //открытие модального окна

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

//экспорт
export {
  createCard,
  deleteCard,
  likeCard
};