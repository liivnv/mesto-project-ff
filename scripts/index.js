// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
function createCards(initialCards, deleteCards){
  const cardTemplate = document.querySelector('#card-template').content;
  const placesList = document.querySelector('.places__list');

  const userElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = userElement.querySelector('.card__delete-button');

  userElement.querySelector('.card__title').textContent = initialCards.name;
  userElement.querySelector('.card__image').src = initialCards.link;
  userElement.querySelector('.card__image').alt = initialCards.alt;
  
  placesList.append(userElement);

  deleteButton.addEventListener('click', deleteCards); 
}
// @todo: Функция удаления карточки
function deleteCards(e){
    const placesItem = e.target.closest('.places__item');
    placesItem.remove();
}
// @todo: Вывести карточки на страницу
for (let i=0; i<initialCards.length; i++){
  createCards(initialCards[i], deleteCards);
}