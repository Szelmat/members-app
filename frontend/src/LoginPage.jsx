import { FiLogIn } from "react-icons/fi";

export function LoginPage(props) {
  return (
    <form onSubmit={props.onSubmit} id="loginForm">
      <h1 className="login">Bejelentkezés</h1>

      <div id="loginInputs">
        <div className="login" id="username">
          <label htmlFor="usr">Felhasználónév:</label>
          <input
            name="usr"
            id="usr"
            value={props.user}
            onChange={props.userChange}
          />
        </div>

        <div className="login" id="password">
          <label htmlFor="pwd">Jelszó:</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={props.pass}
            onChange={props.passChange}
          />
        </div>
      </div>

      <div className="login">
        <button type="submit"><FiLogIn/> Bejelentkezés</button>
      </div>

      {props.incorrect && (
        <p className="loginErrorMessage login">
          Hibás felhasználónév vagy jelszó! Kérjük, próbálja újra!
        </p>
      )}
    </form>
  );
}
