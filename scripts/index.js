// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
function createCard(initialCards, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;

  const userElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = userElement.querySelector('.card__delete-button');

  userElement.querySelector('.card__title').textContent = initialCards.name;
  userElement.querySelector('.card__image').src = initialCards.link;
  userElement.querySelector('.card__image').alt = initialCards.alt;

  deleteButton.addEventListener('click', deleteCard); 

  return userElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt){
    const placesItem = evt.target.closest('.places__item');
    placesItem.remove();
}
// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
for (let i=0; i<initialCards.length; i++){
  placesList.append(createCard(initialCards[i], deleteCard));
}