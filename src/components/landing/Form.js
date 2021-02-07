import React from "react";

function Form(props) {
  return (
    <section className="admission">
      <form className="admission__form" name={props.name} noValidate onSubmit={props.onSubmit}>
      <h3 className="admission__title">{props.title}</h3>
      <label className="admission__email">
        <input
          className="admission__input"
          id="email-login"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={props.email}
          onChange={props.handleEmailChange}
        />
        <span className="" id=""></span>
      </label>
      <label className="admission_password">
        <input
          className="admission__input"
          id="password-login"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={props.password}
          onChange={props.handlePasswordChange}
        />
        <span className="" id=""></span>
      </label>
      <input className="admission__submit" type="submit" value={props.submit} />
      {props.children}
    </form>
    </section>
  );
}

export default Form;
