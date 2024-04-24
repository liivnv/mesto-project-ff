import {
  openEditPopupButton,
  openAddPopupButton
}
from './index.js';

//функция открытия модальных окон
function openModal(evt) {
  evt.preventDefault();

  //констаты, связанные с модальными окнами
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const popupImage = document.querySelector('.popup_type_image');

  //поиск нужного модального окна (по кнопке)
  if (evt.target === openEditPopupButton) {
    popupEdit.classList.add('popup_is-opened');
  }
  else if (evt.target === openAddPopupButton) {
    popupNewCard.classList.add('popup_is-opened');
  }
  else {
    popupImage.classList.add('popup_is-opened');
  }

  //поиск активного модального окна и кнопки для его закрытия
  const activePopup = document.querySelector('.popup_is-opened');
  const closeButton = activePopup.querySelector('.popup__close');

  //обработчики события: закрытие модального окна
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModalByEsc);
  activePopup.addEventListener('mousedown', closeModalByOverlay);
}

//функция для закрытия модального окна
function closeModal() {
  const activePopup = document.querySelector('.popup_is-opened');
  activePopup.classList.remove('popup_is-opened');

  //удаление обработчиков события: закрытие модального окна
  document.addEventListener('keydown', closeModalByEsc);
  activePopup.addEventListener('mousedown', closeModalByOverlay);
}

//функция для закрытия модального окна по кнопке esc
function closeModalByEsc(evt) {
  const codeEsc = 27;
  if (evt.keyCode === codeEsc) {
    closeModal();
  }
}

//функция для закрытия модального (при нажатии за его пределы)
function closeModalByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal()
  }
}

//экспорт
export {
  openModal,
  closeModal
}