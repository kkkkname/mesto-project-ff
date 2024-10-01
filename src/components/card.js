import { addLike, deleteCardData, removeLike } from './api'

const cardTemplate = document.querySelector('#card-template').content

function createCard(cardData, handleCardDelete, handleLikeToggle, handleImageOpen, userId) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')
	const likeCounter = cardElement.querySelector('.card__like-counter')
	
	// Установка данных карточки
	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name
	
	// Проверка владельца карточки для отображения кнопки удаления
	if (cardData.owner && cardData.owner._id === userId) {
		deleteButton.addEventListener('click', () => {
			handleCardDelete(cardElement, cardData._id)
			deleteButton.style.display = 'none'
		})
	} else {
		deleteButton.remove()  // Удаление кнопки, если это не карточка пользователя
	}
	
	// Установка счетчика лайков
	likeCounter.textContent = cardData.likes.length || 0
	
	// Проверка, был ли лайк от пользователя
	if (cardData.likes.some(like => like._id === userId)) {
		likeButton.classList.add('card__like-button_is-active')
	}
	
	// Обработчик для кнопки лайка
	likeButton.addEventListener('click', () => {
		handleLikeToggle(cardData._id, likeCounter, likeButton)
	})
	
	// Открытие изображения карточки
	cardImage.addEventListener('click', () => {
		handleImageOpen(cardData)
	})
	
	return cardElement
}

function handleCardDelete(cardElement, cardId) {
	deleteCardData(cardId)
		.then(() => {
			cardElement.remove()
		})
		.catch((err) => {
			console.error(`Ошибка при удалении карточки: ${err}`)
		})
}

function handleLikeToggle(cardId, likeCounter, likeButton) {
	const isLiked = likeButton.classList.contains('card__like-button_is-active')
	const apiMethod = isLiked ? removeLike : addLike
	
	apiMethod(cardId)
		.then((updatedCardData) => {
			likeButton.classList.toggle('card__like-button_is-active')
			likeCounter.textContent = updatedCardData.likes.length
		})
		.catch((err) => {
			console.error(`Ошибка при изменении лайка: ${err}`)
		})
}

export { createCard, handleCardDelete, handleLikeToggle }
