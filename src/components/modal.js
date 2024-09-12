function keyHandler(event) {
    if(event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup)
    }
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
}

export { openPopup, closePopup };