import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

import { useTranslation } from 'react-i18next'

import { LocaleContext } from "../contexts/locale.context.js";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
  "Choose language": "Choose language",
  en,
  sl
};



var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const LoginForm = () => {

  var t = (s) => {

    if (current.langCode == null) {

      return translations[current][s] || s;
    } else {

      return translations[current.langCode][s] || s;
    }
  }
  let langCode = localStorage.getItem("language") || "en";
  if (!Object.keys(translations).includes(langCode)) {
    langCode = "en";
  }

  t = t.bind(this);

  const [current, setCurrent] = useState(langCode);
  const { userState, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let loginRequest = {
      email,
      password,
    };


    userService.login(loginRequest, dispatch);
  };

  return (
    <div>
      <LocaleContext.Provider
        value={{
          current: current,
          t: t
        }}
      >


        <div class="login-page">
          <div class="image-div">
            <img
              src={process.env.PUBLIC_URL + 'assets/img/logo.png'}
              alt="SteriPro"
              style={{ maxWidth: "130px", width: "100%", marginBottom: "30px" }}
            ></img>
          </div>
          <div class="form">
            <h4>{t('welcome_back')} </h4>
            <p></p>
            <p></p>
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  required
                  name="email"
                  style={{ height: "50px" }}
                  type="email"
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  style={{ height: "50px" }}
                  required
                  name="password"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div
                className="form-group text-center"
                style={{ color: "red", fontSize: "0.8em" }}
                hidden={!userState.loginError.showError}
              >
                {userState.loginError.errorMessage}
              </div>
              <input
                className="btn btn-primary btn-block"
                type="submit"
                id="kayitol"
                style={{ background: "#5e90f6" }}
                value={t('login')}
              />
              <div >
                <div style={{ color: "#6c757d", opacity: 1 }}>
                  <p>{t('choose')}</p>
                  <div  >
                    <div >

                      <select value={lang} onChange={event => {
                        const langCode = event.target.value;
                        setCurrent({ langCode })
                      }}>
                        {Object.keys(translations).map(lang => (
                          <option key={lang} value={lang}>
                            {lang.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </LocaleContext.Provider>
    </div>
  );
};

export default LoginForm;
