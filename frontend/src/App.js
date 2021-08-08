import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { LoginPage } from "./LoginPage";
import { Members } from "./Members";
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

  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

  function login(e) {
    e.preventDefault();
    setIncorrect(false);
    axios
      .post("http://127.0.0.1:8000/dj-rest-auth/login/", {
        username: user,
        password: pass,
      }, {
        withCredentials: true
      })
      .then(function (response) {
        console.log(response);
        // axios.get("http://127.0.0.1:8000/api/").then(function (response) {
        //   console.log(response);
        // });
      })
      .catch(function (error) {
        setIncorrect(true);
      });
  }

  return (
    <LoginPage
      onSubmit={login}
      user={user}
      pass={pass}
      userChange={userChange}
      passChange={passChange}
      incorrect={incorrect}
    />
    // <Members />
  );
}

export default App;
