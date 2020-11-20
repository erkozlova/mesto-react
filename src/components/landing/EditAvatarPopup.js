import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const inputRef = React.createRef();

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  } 

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__label">
          <input
            className="popup__input popup__input_value_avatar-link"
            id="avatar-link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            ref={inputRef}
          />
          <span className="popup__error" id="avatar-link-error"></span>
        </label>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;