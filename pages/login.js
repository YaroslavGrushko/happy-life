import { useEffect, useState } from "react";
import { useMain } from "../context/mainContext";
import axios from "axios";

import styles from "./login.module.scss";
import MainContainer from "../components/MainContainer";
import Button from "../components/Button";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();

  const { setAuthTokens } = useMain();
  const { isSignUpPressed, setIsSignUpPressed } = useMain();

  const [header, setHeader] = useState(
    "Fill out the form and click on the button, please"
  );
  const [message, setMessage] = useState(false);

  const Content = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    async function postLogin() {
      if (!isSignUpPressed) {
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
            setMessage();
            if (result.data.isAdmin) {
              localStorage.setItem("username", login);
              localStorage.setItem("password", password);

              setAuthTokens(result.data.data);
              router.push("/adminDashboard");
            } else if (result.data.isAdmin == false) {
              router.push("/userDashboard");
            } else {
              setMessage("error");
              setHeader("Username or password is incorrect");
            }
          });
      } else {
        setMessage("error");
        setHeader("Please press on Sign up button");
        setIsSignUpPressed(false);
      }
    }

    function signupOnClick() {
      setHeader("Press sign up to continue registering, please");
      setMessage("warning");
      setIsSignUpPressed(true);
    }

    async function postSignup() {
      if (passwordRepeat == password) {
        var encode_userName = unescape(encodeURIComponent(login));
        var encode_password = unescape(encodeURIComponent(password));
        await axios
          .post(
            "/api/flask/signup",
            {},
            {
              auth: { username: encode_userName, password: encode_password },
            }
          )
          .then((result) => {
            if (result.data.data == "ok") {
              setHeader("You are successfully signed");
              setMessage();
            } else if (result.data.data == "Already Exists") {
              setMessage("error");
              setHeader("Username already exists");
            } else {
              setMessage("error");
              setHeader("Username or password is incorrect");
            }
          });
      } else {
        setMessage("error");
        setHeader("Passwords are not same");
      }
    }

    useEffect(() => {
      const localStorageUsername = localStorage.getItem("username");
      const localStoragePassword = localStorage.getItem("password");
      localStorageUsername && setLogin(localStorageUsername);
      localStoragePassword && setPassword(localStoragePassword);
    }, []);

    return (
      <div>
        <div className={styles.card}>
          <form>
            <label className={styles.loginLabel} htmlFor="username">
              Email
            </label>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Email"
              id="username"
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              autoComplete="on"
              value={login}
              key={0}
            />

            <label className={styles.loginLabel} htmlFor="password">
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
              autoComplete="on"
              value={password}
              key={1}
            />
            {isSignUpPressed && (
              <>
                <label className={styles.loginLabel} htmlFor="passwordRepeat">
                  Repeat password
                </label>
                <input
                  className={styles.loginInput}
                  type="password"
                  placeholder="Repeat password"
                  id="passwordRepeat"
                  onChange={(e) => {
                    setPasswordRepeat(e.target.value);
                  }}
                  value={passwordRepeat}
                  autoComplete="on"
                  key={1}
                />
              </>
            )}
            <Button
              onClick={postLogin}
              className={styles.loginButton}
              text={"Sign In"}
            />

            <Button
              onClick={!isSignUpPressed ? signupOnClick : postSignup}
              className={styles.signupButton}
              text={"Sign Up"}
            />
          </form>
        </div>
      </div>
    );
  };
  return (
    <MainContainer
      pageName={"login"}
      header={header}
      message={message}
      descriptionContent={"Login"}
      isSettingsVisible={false}
    >
      <Content />
    </MainContainer>
  );
};
export default login;
