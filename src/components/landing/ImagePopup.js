import React from 'react';

function ImagePopup(props) {

  return(
    <section className={`popup popup_photo ${Object.keys(props.card).length!==0 && `popup_opened`}`}>
        <div className="popup__wrapper">
          <div className="popup__container">
            <img className="popup__fullimage" src={props.card.link} alt={`${props.card.name}`} />
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__subtitle">{props.card.name}</h3>
          </div>
        </div>
      </section>
  );
}

export default ImagePopup;  