function keyHandler(event) {
	if (event.key === 'Escape') {
		const popup = document.querySelector('.popup_is-opened')
		closePopup(popup)
	}
}

export function openPopup(popup) {
	popup.classList.add('popup_is-opened')
	document.addEventListener('keydown', keyHandler)
}

export function closePopup(popup) {
	popup.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', keyHandler)
}

export function closeByOverlay(event) {
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget)
	}
}