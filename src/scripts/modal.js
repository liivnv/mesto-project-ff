//функция открытия модального окна
function openModal(evt) {
  evt.classList.add('popup_is-opened');
  //добавление обработчиков закрытия
  document.addEventListener('keydown', closeModalByEsc);
  evt.addEventListener('mousedown', closeModalByOverlay);
}

//функция для закрытия модального окна
function closeModal(evt) {
  evt.classList.remove('popup_is-opened');
  //удаление обработчиков закрытия
  document.removeEventListener('keydown', closeModalByEsc);
  evt.removeEventListener('mousedown', closeModalByOverlay);
}

//функция для закрытия модального окна по кнопке esc
function closeModalByEsc(evt) {
  const codeEsc = 27;
  if (evt.keyCode === codeEsc) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

//функция для закрытия модального (при нажатии за его пределы)
function closeModalByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.target);
  }
}

//экспорт
export {
  openModal,
  closeModal
}