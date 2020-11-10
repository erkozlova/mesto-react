import React from "react";

function Card(props) {

    function handleClick() {
      props.onCardClick(props.card);
    }

  return (
    <li className="elements__card">
      <img className="elements__image" src={props.card.link} alt="Фотография места" onClick={handleClick}/>
      <button className="elements__delete" type="button"></button>
      <div className="elements__info">
        <h2 className="elements__place">{props.card.name}</h2>
        <div className="elements__likes">
          <button className="elements__like" type="button"></button>
          <p className="elements__amount">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;