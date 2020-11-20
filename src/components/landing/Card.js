import React from "react";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isOwn, setIsOwn] = React.useState(false);

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onLikeClick(props.card);
  }

  function handleDeleteClick() {
    props.onDeleteButtonClick(props.card);
  }

  React.useEffect(() => {
    if(Object.keys(currentUser).length) {
      setIsOwn(props.card.owner._id === currentUser._id)
    }
  }, [currentUser, props.card.owner._id])

  return (
    <li className="elements__card" key={props.card._id}>
      <img className="elements__image" src={props.card.link} alt={`${props.card.name}`} onClick={handleClick}/>
      { isOwn &&  <button className="elements__delete" type="button" onClick={handleDeleteClick}></button> }
      <div className="elements__info">
        <h2 className="elements__place">{props.card.name}</h2>
        <div className="elements__likes">
        <button className={`elements__like ${isLiked && 'elements__like_active'}`} type="button" onClick={handleLikeClick}></button>
          <p className="elements__amount">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;