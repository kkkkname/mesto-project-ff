import '../pages/index.css'
import { cards } from "./cards";
import { createCard, deleteCard, likeCard } from "./card";
import { closePopup, openPopup } from "./modal";

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddCard = document.querySelector('.popup_type_new-card');

const placeList = document.querySelector('.places__list');
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupImageCaption = popupCardImage.querySelector('.popup__caption');

const placeForm = document.querySelector(['[name="new-place"]']);
const placeName = placeForm.querySelector('.popup__input_type_card-name')
const placeLink = placeForm.querySelector('.popup__input_type_url');

function openImagePopup(image) {
    popupImage.src = image.link;
    popupImage.alt = image.name;
    popupImageCaption.textContent = image.name;
    openPopup(popupCardImage);
}

cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placeList.append(cardElement);
})

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('mousedown', (event) => {
        if(event.target === event.currentTarget) {

            closePopup(popup);
        }
    });
    popup.classList.add('popup_is-animated')
})

profileEditButton.addEventListener('click', () => {
    openPopup(popupProfile);
    profileForm.elements.name.value = profileTitle.textContent;
    profileForm.elements.description.value = profileDescription.textContent;
})

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddCard)
})

function submitProfileForm(popup, event) {
    event.preventDefault();
    profileTitle.textContent = profileForm.elements.name.value;
    profileDescription.textContent = profileForm.elements.description.value;
    closePopup(popup);
}

profileForm.addEventListener('submit', (evt) => submitProfileForm(popupProfile, evt));

function submitPlaceForm(popup, event) {
    event.preventDefault();
    const cardData = {
        name: placeName.value,
        link: placeLink.value
    }
    const cardElement = createCard(cardData, deleteCard, likeCard, openImagePopup);
    placeList.prepend(cardElement);
    placeForm.reset();
    closePopup(popup);
}

placeForm.addEventListener('submit', (evt) => submitPlaceForm(popupAddCard, evt));

