import '../pages/index.css';
import {
  createCard,
  deleteCard,
  likeCard
}
from './cards.js';
import {
  openModal,
  closeModal
}
from './modal.js';
import {
  initialCards
}
from './initialCards.js';

//поиск всех модальных окон
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

//констаты, связанные с открытием модальных окон
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');

//поиск всех кнопок для закрытия модальных окон
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close');
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close');
const closeButtonPopupImage = popupImage.querySelector('.popup__close');

//массив объектов
const popupsListObject = [{
  popup: popupEdit,
  closeButton: closeButtonPopupEdit
}, {
  popup: popupNewCard,
  closeButton: closeButtonPopupNewCard
}, {
  popup: popupImage,
  closeButton: closeButtonPopupImage
}]

//констаты, связанные с формой изменения профиля
const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//констаты, связанные с формой добавления нового места
const formElementNewPlace = document.forms['new-place'];
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

//константы, связанные с описанием профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//константы, связанные с отображением модальных окон с карточками
const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

//функция для открытия карточки
function openCard(evt) {
  openModal(popupImage);

  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  captionInPopup.textContent = evt.target.alt;
}

//функция для обработки формы изменения профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}

//функция для обработки формы добавления нового места
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const card = {
    name: placeValue,
    link: linkValue,
    alt: placeValue
  };

  placesList.prepend(createCard(card, deleteCard, likeCard, openCard)); //добавляем новую карту на сайт

  closeModal(popupNewCard);
  formElementNewPlace.reset(); //сбрасываем форму
}

//добавления карточек на сайт
initialCards.forEach((card) => placesList.append(createCard(card, deleteCard, likeCard, openCard)));

//добавления класса для плавного открытия и закрытия
popupsListObject.forEach((item) => item.popup.classList.add('popup_is-animated'));

//добавление обработчика на кнопки открытия модальных окон (изменение профиля и добавление новой карточки)
openEditPopupButton.addEventListener('click', function() {
  //обновление данных в форме редактирования профиля 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;  
  openModal(popupEdit);
});

openAddPopupButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

//добавление обработчиков на кнопки закрытия
popupsListObject.forEach((item) => item.closeButton.addEventListener('click', function() {
  closeModal(item.popup);
}));

//добавление обработчиков на формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleCardFormSubmit);

//экспорт
export {
  openEditPopupButton,
  openAddPopupButton,
  openCard
};