import React from "react";
import editor from "../../images/editor.svg";
import plus from "../../images/plus.svg";
import Card from './Card.js';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

   return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
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
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__editor"
              type="button"
              onClick={props.onEditProfile}
            >
              <img src={editor} alt="Кнопка редактирования" />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
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
          {props.cards.map((card) => {
            return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onLikeClick={props.onCardLike} onDeleteButtonClick={props.onCardDelete}/>);
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
