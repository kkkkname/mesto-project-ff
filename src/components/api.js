const configAPI = {
	url: 'https://nomoreparties.co/v1/wff-cohort-24',
	headers: {
		token: '7dd3d663-390c-4459-915e-403c489cc5ad',
	}
}

// Функция для обработки результата запроса
function handleResult(result) {
	if (result.ok) {
		return result.json()
	}
	return Promise.reject(`Ошибка: ${result.status}`)
}

// Функция для получения данных пользователя
export function getUserData() {
	return fetch(`${configAPI.url}/users/me`, {
		headers: {
			authorization: configAPI.headers.token
		}
	}).then(handleResult)
}

// Функция для получения карточек
export function getCardData() {
	return fetch(`${configAPI.url}/cards`, {
		headers: {
			authorization: configAPI.headers.token
		}
	}).then(handleResult)
}

// Функция для редактирования данных профиля
export function editProfileData(data) {
	return fetch(`${configAPI.url}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(handleResult)
}

// Функция для создания карточки
export function createCardData(data) {
	return fetch(`${configAPI.url}/cards`, {
		method: 'POST',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(handleResult)
}

// Функция для удаления карточки
export function deleteCardData(cardId) {
	return fetch(`${configAPI.url}/cards/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		}
	}).then(handleResult)
}

// Функция для добавления лайка
export function addLike(cardId) {
	return fetch(`${configAPI.url}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		}
	}).then(handleResult)
}

// Функция для удаления лайка
export function removeLike(cardId) {
	return fetch(`${configAPI.url}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		}
	}).then(handleResult)
}

// Функция для редактирования аватара
export function editAvatarData(data) {
	return fetch(`${configAPI.url}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: configAPI.headers.token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ avatar: data.avatar })
	}).then(handleResult)
}
