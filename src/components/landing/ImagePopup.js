import React from 'react';

function ImagePopup(props) {
  return(
    <section className={`popup popup_photo ${props.card && `popup_opened`}`}>
        <div className="popup__wrapper">
          <div className="popup__container">
            <img className="popup__fullimage" src={props.card? props.card.link: ''} alt="Полная картинка" />
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__subtitle"></h3>
          </div>
        </div>
      </section>
  );
}

export default ImagePopup;  