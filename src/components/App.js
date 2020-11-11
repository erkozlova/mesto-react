import React from "react";
import Header from "./landing/Header.js";
import Main from "./landing/Main.js";
import Footer from "./landing/Footer.js";
import ImagePopup from "./landing/ImagePopup.js";
import PopupWithForm from "./landing/PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddProfilePopupOpen, setAddProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <Main
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddProfilePopupOpen={isAddProfilePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />
      <Footer />

      {/* Попап увеличения картинки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      {/* Попап редактирования профиля */}
      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <label className="popup__label">
          <input
            className="popup__input popup__input_value_name"
            id="author-name"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error" id="author-name-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_value_description"
            id="author-description"
            type="text"
            name="description"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error" id="author-description-error"></span>
        </label>
      </PopupWithForm>

      {/* Попап добавления карточки  */}
      <PopupWithForm name="add" title="Новое место" isOpen={isAddProfilePopupOpen} onClose={closeAllPopups}>
      <label className="popup__label">
              <input
                className="popup__input popup__input_value_name"
                id="place-name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="1"
                maxLength="30"
                required
              />
              <span className="popup__error" id="place-name-error"></span>
            </label>
            <label className="popup__label">
              <input
                className="popup__input popup__input_value_place-link"
                id="place-link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__error" id="place-link-error"></span>
            </label>
      </PopupWithForm>

      {/* Попап редактирования аватара  */}
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <label className="popup__label">
          <input
            className="popup__input popup__input_value_avatar-link"
            id="avatar-link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error" id="avatar-link-error"></span>
        </label>
      </PopupWithForm>

      {/* Попап удаления карточки */}
      <PopupWithForm name="delete" title="Вы уверены?" isOpen={false}></PopupWithForm>
    </>
  );
}

export default App;
