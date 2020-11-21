import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    props.onAddCard({
      name,
      link,
    });
  }

  React.useEffect(() => {
    if(!props.isLoading) {
      setName('');
      setLink('');
    }
  }, [props.isLoading]);

  return (<PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
  <label className="popup__label">
          <input
            className="popup__input popup__input_value_name"
            id="place-name"
            type="text"
            name="name"
            placeholder="Название"
            minLength="1"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__error" id="place-name-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_value_place-link"
            id="place-link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span className="popup__error" id="place-link-error"></span>
        </label>
  </PopupWithForm>);
}

export default AddPlacePopup;