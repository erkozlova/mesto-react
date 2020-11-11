import React from "react";
import editor from "../../images/editor.svg";
import plus from "../../images/plus.svg";
import api from "../../utils/api.js";
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAppInfo().then(([user, initialCards]) => {

      // Установка данных пользователя
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);

      // Установка изначальных 
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div className="profile__avatar-edit">
            <button
              className="profile__avatar-editor"
              type="button"
              onClick={props.onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__editor"
              type="button"
              onClick={props.onEditProfile}
            >
              <img src={editor} alt="Кнопка редактирования" />
            </button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          className="profile__addition"
          type="button"
          onClick={props.onAddPlace}
        >
          <img className="profile__plus" src={plus} alt="Кнопка добавления" />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (<Card card={card} key={card._id} onCardClick={props.onCardClick}/>);
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
