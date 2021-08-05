import { useState } from 'react'

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
        console.log(user)
        console.log(pass)
        console.log()
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
