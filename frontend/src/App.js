import axios from "axios";
import { useState } from "react";
import { LoginPage } from "./LoginPage";
import { Members } from "./Members"
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  function userChange(event) {
    setUser(event.target.value);
  }

  const [pass, setPass] = useState("");
  function passChange(event) {
    setPass(event.target.value);
  }

  const [incorrect, setIncorrect] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Az API-al történő kommunikáció jelzése
  const [loading, setLoading] = useState(false);

  function login(e) {
    e.preventDefault();
    setLoading(true);
    setIncorrect(false);
    axios
      .post("http://127.0.0.1:8000/dj-rest-auth/login/", {
        username: user,
        password: pass,
      }, {
        withCredentials: true
      })
      .then(function (response) {
        setLoading(false);
        setLoggedIn(true);
      })
      .catch(function (error) {
        setIncorrect(true);
      });
  }

  if(!loggedIn) {
    return (
    <LoginPage
      onSubmit={login}
      user={user}
      pass={pass}
      userChange={userChange}
      passChange={passChange}
      incorrect={incorrect}
      loading={loading}
    />
  );
} else {
  return (
    <Members />
  );
}
}

export default App;
