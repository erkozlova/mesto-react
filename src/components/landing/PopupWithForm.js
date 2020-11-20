import React from 'react';

function PopupWithForm(props) {
  return( 
    <section className={`popup popup_${props.name} ${props.isOpen && `popup_opened`}`}>
        <div className="popup__wrapper">
          <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
            <h3 className="popup__title">{props.title}</h3>
            {props.children}
            <input className="popup__submit" type="submit" value={props.submit} />
            <button className="popup__close" type="button" onClick={props.onClose}></button>
          </form>
        </div>
      </section>
  );
}

export default PopupWithForm;