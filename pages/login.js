import { useState } from "react";
import { useMain } from "../context/mainContext";
import axios from "axios";

import styles from "./login.module.scss";
import MainContainer from "../components/MainContainer";
import { ButtonMain } from "../components/ButtonMain";

export default function login() {
  const [login, setLogin] = useState("grushko.kpi@gmail.com");
  const [password, setPassword] = useState("");

  const { setAuthTokens } = useMain();

  async function postLogin() {
    var encode_userName = unescape(encodeURIComponent(login));
    var encode_password = unescape(encodeURIComponent(password));
    await axios
      .post(
        "/api/flask/login",
        {},
        {
          auth: { username: encode_userName, password: encode_password },
        }
      )
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data.data);
        }
      });
  }
  const Content = () => {
    return (
      <div>
        <div className={styles.card}>
          <label className={styles.loginLabel} for="username">
            Email
          </label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Email or Phone"
            id="username"
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            value={login}
          />

          <label className={styles.loginLabel} for="password">
            Password
          </label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <ButtonMain
            onClick={postLogin}
            className={styles.loginButton}
            text={"Log In"}
          />
        </div>
      </div>
    );
  };
  return (
    <MainContainer
      pageName={"login"}
      descriptionContent={"Login"}
      Content={Content}
    />
  );
}
