import {
  deleteCardFromCardsList,
  addLike,
  deleteLike
}
from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

//функция для создания новой карточки
function createCard(card, userId, deleteCard, likeCard, openCard) {
  const userElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = userElement.querySelector('.card__delete-button');

  const likeButton = userElement.querySelector('.card__like-button');

  const cardImage = userElement.querySelector(".card__image");
  const cardTitle = userElement.querySelector('.card__title');

  const countLikes = userElement.querySelector('.likes');

  //заполнение данных карты на странице
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  //отображение количество лайков, если оно не равно 0
  if (card.likes.length !== 0) {
    countLikes.textContent = card.likes.length;
  };

  //удаление только своей карточки
  if (card.owner._id !== userId) {
    deleteButton.style.visibility = 'hidden';
  };

  //если лайк уже поставлен с этого профиля - сердце выделено
  card.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  //обработчики событий
  deleteButton.addEventListener('click', () => {
    deleteCard(deleteButton, card._id)
  }); //удаление
  likeButton.addEventListener('click', () => {
    likeCard(likeButton, card, countLikes)
  }); //лайк
  cardImage.addEventListener('click', openCard); //открытие модального окна

  return userElement;
}

//функция для удаления карточки
function deleteCard(button, cardId) {
  const placesItem = button.closest('.places__item');
  deleteCardFromCardsList(cardId)
    .then (() => {
      placesItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция для лайка 
function likeCard(button, card, countLikes) {
  //button.classList.toggle('card__like-button_is-active');

  if (!button.classList.contains('card__like-button_is-active')) {
    addLike(card._id)
      .then((card) => {
        if (typeof card === 'object') {
          changeCountLikes(card, countLikes, button);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    deleteLike(card._id)
      .then((card) => {
        if (typeof card === 'object') {
          changeCountLikes(card, countLikes, button);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//функция для изменения количества лайков
function changeCountLikes(card, countLikes, button) {
  button.classList.toggle('card__like-button_is-active');
  if (card.likes.length !== 0) {
    countLikes.style.display = 'block';
    countLikes.textContent = card.likes.length;
  }
  else {
    countLikes.style.display = 'none';
  }
}

//экспорт
export {
  createCard,
  deleteCard,
  likeCard
};