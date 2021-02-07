import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./landing/Header.js";
import Main from "./landing/Main.js";
import Footer from "./landing/Footer.js";
import ImagePopup from "./landing/ImagePopup.js";
import PopupWithForm from "./landing/PopupWithForm";
import EditProfilePopup from "./landing/EditProfilePopup";
import EditAvatarPopup from "./landing/EditAvatarPopup";
import AddPlacePopup from "./landing/AddPlacePopup";
import Register from "./landing/Register";
import Login from "./landing/Login";
import api from "../utils/api.js";
import ProtectedRoute from "./landing/ProtectedRoute";
import InfoTooltip from "./landing/InfoTooltip";
import { getUser } from '../utils/auth';

function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
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

  const [isAddCardLoading, setIsAddCardLoading] = React.useState(false);

  // Попап информации о регистрации
  const [infoTooltipPopup, setInfoTooltipPopup] = React.useState(false);

  // Email пользователя для Header
  const [email, setEmail] = React.useState('');

  // Переменная успешности запроса при регистрации
  const [isSuccess, setIsSuccess] = React.useState(false);

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

  // Открытие попапа информации о регистрации
  function handleInfoTooltip(isOk) {
    isOk? setIsSuccess(true) : setIsSuccess(false);
    setInfoTooltipPopup(true);
  }

  // Полчение email для Header
  function getEmail(email) {
    setEmail(email);
  }

  // Изменение статуса пользователя залогинен на незалогинен
  function loggedInOff() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    props.history.push('/sign-in');
  }

  // Изменение статуса пользователя незалогинен на залогинен
  function loggedInOn() {
    setLoggedIn(true);
  }

  // Закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipPopup(false);
    setSelectedCard({});
  }

  // Открытие попапа полной картинки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обновление информации о пользователе
  function handleUpdateUser(user) {
    api
      .setUserData(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обновление аватара
  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Установка/снятие лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((currCard) =>
          currCard._id === card._id ? newCard : currCard
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((currCard) => currCard._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Добавление карточки
  function handleAddCard(card) {
    setIsAddCardLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsAddCardLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([user, initialCards]) => {
        // Установка первоначальных данных о пользователе
        setCurrentUser(user);

        // Установка изначальных карточек
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




// Проверяем токен при отрисовке странице
React.useEffect(() => {
  if (localStorage.getItem('token')){
    const jwt = localStorage.getItem('token');
    getUser(jwt).then((result) => {
      if(result) {
        getEmail(result.data.email);
        loggedInOn();
        props.history.push('/');
      }
    })
  }
}, [props.history]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} isLoggedIn={loggedIn} loggedInOff={loggedInOff} />
      <Switch>
        <Route path="/sign-up">
          <Register handleInfoTooltip={handleInfoTooltip} />
        </Route>
        <Route path="/sign-in">
          <Login getEmail={getEmail} loggedInOn={loggedInOn}/>
        </Route>
        <ProtectedRoute
          path="/"
          loggedIn={loggedIn}
          component={Main}
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
      </Switch>
      <Footer />

      {/* Попап увеличения картинки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* Попап редактирования профиля */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      {/* Попап добавления карточки  */}
      <AddPlacePopup
        isOpen={isAddProfilePopupOpen}
        isLoading={isAddCardLoading}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
      />

      {/* Попап редактирования аватара  */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      {/* Попап удаления карточки */}
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        isOpen={false}
      ></PopupWithForm>

      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={infoTooltipPopup}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
