import '../pages/index.css'
import {
	createCardData,
	editAvatarData,
	editProfileData,
	getCardData,
	getUserData
} from './api'
import { createCard, handleCardDelete, handleLikeToggle } from './card'
import { closeByOverlay, closePopup, openPopup } from './modal'
import { clearValidation, enableValidation } from './validation'

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}

const popups = document.querySelectorAll('.popup')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const profileForm = document.forms['edit-profile']
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const popupAddCard = document.querySelector('.popup_type_new-card')
const placeList = document.querySelector('.places__list')
const popupCardImage = document.querySelector('.popup_type_image')
const popupImage = popupCardImage.querySelector('.popup__image')
const popupImageCaption = popupCardImage.querySelector('.popup__caption')
const placeForm = document.querySelector('[name="new-place"]')
const placeName = placeForm.querySelector('.popup__input_type_card-name')
const placeLink = placeForm.querySelector('.popup__input_type_url')
const avatarImage = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_edit-avatar')
const formAvatar = document.querySelector('.popup_type_edit-avatar .popup__form')
const avatarUrlInput = document.querySelector('.popup__input__avatar_url')
const submitButtonAvatar = formAvatar.querySelector('.popup__button')

// Функция открытия попапа с валидацией
function openPopupWithValidation(popup, form) {
	openPopup(popup)
	clearValidation(form, validationConfig)
}

// Обработчики открытия попапов
profileEditButton.addEventListener('click', () => {
	profileForm.elements.name.value = profileTitle.textContent
	profileForm.elements.description.value = profileDescription.textContent
	openPopupWithValidation(document.querySelector('.popup_type_edit'), profileForm)
})

profileAddButton.addEventListener('click', () => {
	placeForm.reset()
	openPopupWithValidation(popupAddCard, placeForm)
})

avatarImage.addEventListener('click', () => {
	openPopupWithValidation(avatarPopup, formAvatar)
})

// Открытие изображения карточки
function openImagePopup(image) {
	popupImage.src = image.link
	popupImage.alt = image.name
	popupImageCaption.textContent = image.name
	openPopup(popupCardImage)
}

// Получение данных пользователя и карточек
Promise.all([getUserData(), getCardData()])
	.then(([userData, cardData]) => {
		profileTitle.textContent = userData.name
		profileDescription.textContent = userData.about
		avatarImage.style.backgroundImage = `url(${userData.avatar})`
		const userId = userData._id
		
		cardData.forEach((dataCard) => {
			placeList.append(createCard(dataCard, handleCardDelete, handleLikeToggle, openImagePopup, userId))
		})
	})
	.catch((err) => {
		console.error(`Ошибка: ${err}`)
	})

// Сохранение данных профиля
profileForm.addEventListener('submit', (evt) => {
	evt.preventDefault()
	renderLoading(true, profileForm.querySelector('.popup__button'))
	
	editProfileData({
		name: profileForm.elements.name.value,
		about: profileForm.elements.description.value
	})
		.then((res) => {
			profileTitle.textContent = res.name
			profileDescription.textContent = res.about
			closePopup(document.querySelector('.popup_type_edit'))
		})
		.catch((err) => {
			console.error(`Ошибка при редактировании профиля: ${err}`)
		})
		.finally(() => {
			renderLoading(false, profileForm.querySelector('.popup__button'))
		})
})

// Добавление новой карточки
placeForm.addEventListener('submit', (evt) => {
	evt.preventDefault()
	const cardData = { name: placeName.value, link: placeLink.value }
	renderLoading(true, placeForm.querySelector('.popup__button'))
	
	createCardData(cardData)
		.then((res) => {
			const userId = res.owner._id
			placeList.prepend(createCard(res, handleCardDelete, handleLikeToggle, openImagePopup, userId))
			closePopup(popupAddCard)
			placeForm.reset()
		})
		.catch((err) => {
			console.error(`Ошибка при добавлении карточки: ${err}`)
		})
		.finally(() => {
			renderLoading(false, placeForm.querySelector('.popup__button'))
		})
})

// Редактирование аватара
formAvatar.addEventListener('submit', (evt) => {
	evt.preventDefault()
	renderLoading(true, submitButtonAvatar)
	
	editAvatarData({ avatar: avatarUrlInput.value })
		.then((res) => {
			avatarImage.style.backgroundImage = `url(${res.avatar})`
			closePopup(avatarPopup)
			formAvatar.reset()
		})
		.catch((err) => {
			console.error(`Ошибка при обновлении аватара: ${err}`)
		})
		.finally(() => {
			renderLoading(false, submitButtonAvatar)
		})
})

// Закрытие попапов по кнопкам и клику на оверлей
popups.forEach((popup) => {
	const closeButton = popup.querySelector('.popup__close')
	if (closeButton) {
		closeButton.addEventListener('click', () => {
			closePopup(popup)
		})
	}
	
	// Обработчик клика на оверлей
	popup.addEventListener('mousedown', closeByOverlay)
})

// Показ загрузки при сабмите
function renderLoading(isLoading, button) {
	button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}

enableValidation(validationConfig)
