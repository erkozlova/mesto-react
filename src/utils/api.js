class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserData() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getAppInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  setUserData({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  putLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.putLike(cardId);
    }
  }

  changeAvatar(avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "8ee11e57-c1af-4cd4-bd58-96d38c730efa",
    "Content-type": "application/json",
  },
});

export default api;