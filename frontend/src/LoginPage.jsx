import axios from "axios";
import { useState } from 'react';

export function LoginPage(props) {
    const [user, setUser] = useState('');
    function userChange(event) {
        setUser(event.target.value);
    }

    const [pass, setPass] = useState('');
    function passChange(event) {
        setPass(event.target.value);
    }

    function login(e) {
        e.preventDefault();
        axios.post('http://127.0.0.1/dj-rest-auth/login', {
            username: user,
            password: pass
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <form onSubmit={login}> 
            <div id="username">
                <label htmlFor="usr">Felhasználónév:</label>
                <input name="usr" id="usr" value={user} onChange={userChange} />
            </div>

            <div id="password">
                <label htmlFor="pwd">Jelszó:</label>
                <input type="password" name="pwd" id="pwd" value={pass} onChange={passChange} />
            </div>

            <button type="submit">Bejelentkezés</button>
        </form>
    )
}
