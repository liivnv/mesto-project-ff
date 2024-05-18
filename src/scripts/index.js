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
  enableValidation,
  clearValidation
}
from './validation.js'
import {
  getUserInfo,
  getInitialCards,
  changeProfileData,
  createNewCard,
  changeAvatar
}
from './api.js'

//поиск всех модальных окон
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_edit-avatar');

//константы, связанные с открытием модальных окон
const openEditPopupButton = document.querySelector('.profile__edit-button');
const openAddPopupButton = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__image');

//поиск всех кнопок для закрытия модальных окон
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close');
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close');
const closeButtonPopupImage = popupImage.querySelector('.popup__close');
const closeButtonPopupAvatar = popupAvatar.querySelector('.popup__close');

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
}, {
  popup: popupAvatar,
  closeButton: closeButtonPopupAvatar
}]

//константы, связанные с формой изменения профиля
const profileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//константы, связанные с формой добавления нового места
const formElementNewPlace = document.forms['new-place'];
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

//константы связанные с формой изменения аватара
const avatarForm = document.forms['edit-avatar'];
const linkAvatarInput = document.querySelector('.popup__input_type_avatar_url');

//константы, связанные с описанием профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//константы, связанные с отображением модальных окон с карточками
const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption');

//настройка валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//объект пользователя
const userInfo = {};

//массив карточек с сервера
//let initialCards;

const placesList = document.querySelector('.places__list');

//функция для открытия карточки
function openCard(evt) {
  openModal(popupImage);

  imageInPopup.src = evt.target.src;
  imageInPopup.alt = evt.target.alt;
  captionInPopup.textContent = evt.target.alt;
};

//функция для обработки формы изменения профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, evt.target); //отображение загрузки
  changeProfileData(nameInput.value, jobInput.value, evt.target)
    .then ((user) => {
      if (typeof user === 'object') {
        userInfo.name = user.name;
        userInfo.about = user.about;

        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        
        closeModal(popupEdit);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target));
};

//функция для обработки формы добавления нового места 
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  renderLoading(true, evt.target); //отображение загрузки
  createNewCard(placeValue, linkValue, evt.target)
    .then((card) => {
      if (typeof card === 'object') {
        const cardFromServer = card;
        placesList.prepend(createCard(cardFromServer, userInfo.id, deleteCard, likeCard, openCard)); //добавляем новую карточку на сайт
        closeModal(popupNewCard); //закрытие окна
        formElementNewPlace.reset(); //сбрасываем форму
        clearValidation(formElementNewPlace, validationConfig); //очищаем валидацию
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target));
};

//функция для обработки изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, evt.target); //отображение начала загрузки
  changeAvatar(linkAvatarInput.value, evt.target)
    .then ((user) => {
      if (typeof user === 'object') {
        userInfo.avatar = user.avatar;
        avatar.style.backgroundImage = `url(${userInfo.avatar})`;
        closeModal(popupAvatar); //закрытие окна
        avatarForm.reset(); //сброс формы
        clearValidation(avatarForm, validationConfig); //очистка валидации
      } 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target));
}

//добавление лоадера
function renderLoading(isLoading, form) {
  const submitButton = form.querySelector('.popup__button');
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
  }
  else {
    submitButton.textContent = 'Сохранить';
  }
};

//добавления класса для плавного открытия и закрытия
popupsListObject.forEach((item) => item.popup.classList.add('popup_is-animated'));

//добавление обработчика на кнопки открытия модальных окон (изменение профиля, добавление новой карточки и изменения аватара)
openEditPopupButton.addEventListener('click', function() {
  //обновление данных в форме редактирования профиля 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig); //очистка валидации 

  openModal(popupEdit);
});

openAddPopupButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

avatar.addEventListener('click', function() {
  openModal(popupAvatar);
});

//добавление обработчиков на кнопки закрытия
popupsListObject.forEach((item) => item.closeButton.addEventListener('click', function() {
  closeModal(item.popup);
}));

//добавление обработчиков на формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

//вызов функции для валидации форм
enableValidation(validationConfig);

//загрузка данных с сервера (пользовательская информация и карточки), отображение на странице
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    userInfo.avatar = user.avatar;
    userInfo.id = user._id;
    userInfo.name = user.name;
    userInfo.about = user.about;

    avatar.style.backgroundImage = `url(${userInfo.avatar})`;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    const initialCards = cards;
    initialCards.forEach((card) => placesList.append(createCard(card, userInfo.id, deleteCard, likeCard, openCard)));
  })
  .catch((err) => {
    console.log(err);
  });

//экспорт
export {
  openEditPopupButton,
  openAddPopupButton,
  openCard,
  renderLoading
};