import React from "react";
import success from '../../images/success.svg';
import fail from '../../images/fail.svg';

function InfoTooltip(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen && `popup_opened`}`}>
        <div className="popup__wrapper">
          <div className="popup__form">
            <img className="popup__image" src={ props.isSuccess ? success : fail } alt='Успешно'/>
            <p className="popup__text-info">{ props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
          </div>
        </div>
      </section>
  );
}

export default InfoTooltip;