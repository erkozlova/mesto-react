import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if(Object.keys(currentUser).length) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  return (<PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
  <label className="popup__label">
    <input
      className="popup__input popup__input_value_name"
      id="author-name"
      type="text"
      name="name"
      placeholder="Имя"
      minLength="2"
      maxLength="40"
      required
      value={name}
      onChange={handleNameChange}
    />
    <span className="popup__error" id="author-name-error"></span>
  </label>
  <label className="popup__label">
    <input
      className="popup__input popup__input_value_description"
      id="author-description"
      type="text"
      name="description"
      placeholder="Описание"
      minLength="2"
      maxLength="200"
      required
      value={description}
      onChange={handleDescriptionChange}
    />
    <span className="popup__error" id="author-description-error"></span>
  </label>
</PopupWithForm>);
}

export default EditProfilePopup;