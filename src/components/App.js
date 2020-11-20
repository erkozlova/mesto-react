import React from "react";
import Header from "./landing/Header.js";
import Main from "./landing/Main.js";
import Footer from "./landing/Footer.js";
import ImagePopup from "./landing/ImagePopup.js";
import PopupWithForm from "./landing/PopupWithForm";
import EditProfilePopup from './landing/EditProfilePopup';
import EditAvatarPopup from './landing/EditAvatarPopup';
import AddPlacePopup from './landing/AddPlacePopup';
import api from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({});

  // Попап  редактировния профиля
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  // Попап добавления карточки
  const [isAddProfilePopupOpen, setAddProfilePopupOpen] = React.useState(false);
  // Попап редактирования аватара
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  
  // Открытие попапа редактирования 
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // Открытие попапа добавления карточки 
  function handleAddPlaceClick() {
    setAddProfilePopupOpen(true);
  }

  // Открытие попапа редактирования 
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // Закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  // Открытие попапа полной картинки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обновление информации о пользователе
  function handleUpdateUser(user) {
    api.setUserData(user).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
  }

  // Обновление аватара
  function handleUpdateAvatar({avatar}) {
    api.changeAvatar(avatar).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
  }

  // Установка/снятие лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(userId => userId._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((currCard) => currCard._id === card._id ? newCard : currCard);
      setCards(newCards);
    });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((currCard) => currCard._id !== card._id);
      setCards(newCards);
    });
  }

  function handleAddCard(card) {
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  React.useEffect(() => {
    api.getAppInfo().then(([user, initialCards]) => {
      // Установка первоначальных данных о пользователе 
      setCurrentUser(user);

      // Установка изначальных карточек
      setCards(initialCards);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser} >

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
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      {/* Попап увеличения картинки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      {/* Попап редактирования профиля */}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

      {/* Попап добавления карточки  */}
      <AddPlacePopup isOpen={isAddProfilePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>

      {/* Попап редактирования аватара  */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      {/* Попап удаления карточки */}
      <PopupWithForm name="delete" title="Вы уверены?" isOpen={false}></PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default App;
