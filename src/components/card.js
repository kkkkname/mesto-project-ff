function createCard(cardData, deleteCardElement, likeCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    likeButton.addEventListener('click', () => {
        likeCallback(likeButton);
    });

    cardImage.addEventListener('click', () => {
      openImageCallback(cardData)
    });

    return cardElement;
}

function deleteCard (cardElement) {
    cardElement.remove();
}

function likeCard (cardElement) {
    cardElement.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }