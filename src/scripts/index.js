import '../pages/index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
  openCard
}
from './cards.js';
import {
  openModal,
  closeModal
}
from './modal.js';

//поиск всех модальных окон
const popups = document.querySelectorAll('.popup');

//констаты, связанные с открытием модальных окон
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');

//массив кнопок открытия модальных окон
const openButtons = [openEditPopupButton, openAddPopupButton];

//констаты, связанные с формой изменения профиля
const formElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//констаты, связанные с формой добавления нового места
const formElementNewPlace = document.forms['new-place'];
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

//функция для обработки формы изменения профиля 
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal();
}

//функция для обработки формы добавления нового места
function addFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const card = {
    name: placeValue,
    link: linkValue,
    alt: 'пользовательская карточка'
  };

  initialCards.push(card); //добавляем новую карту в исходный массив
  placesList.prepend(createCard(card, deleteCard, likeCard, openCard)); //добавляем новую карту на сайт

  closeModal();
  formElementNewPlace.reset(); //сбрасываем формы
}

//добавления карточек на сайт
const placesList = document.querySelector('.places__list');
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(createCard(initialCards[i], deleteCard, likeCard, openCard));
}

//добавления класса для плавного открытия и закрытия
popups.forEach((popup) => popup.classList.add('popup_is-animated'));

//обработчики событий
openButtons.forEach((button) => button.addEventListener('click', openModal));

formElement.addEventListener('submit', handleFormSubmit);

formElementNewPlace.addEventListener('submit', addFormSubmit);

//экспорт
export {
  openEditPopupButton,
  openAddPopupButton
};