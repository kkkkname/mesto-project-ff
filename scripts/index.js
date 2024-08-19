const placesList = document.querySelector('.places__list');

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    return cardElement;
}

initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    placesList.appendChild(cardElement);
});
