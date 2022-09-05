import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";

import { useTranslation } from 'react-i18next'
//import logo from '../../public/assets/img/logo.png';
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI
const LoginForm = () => {
  const { userState, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("");

  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();

    let loginRequest = {
      email,
      password,
    };


    userService.login(loginRequest, dispatch);
  };
  const handleChange = e => {
    setLang(e.target.value);
    let loc = "https://www.exchange.uvcsolutions.com/#/login/";
    window.location.replace(loc + "?lng=" + e.target.value);
    window.location.reload()
  }

  const languages = [
    { value: '', text: "Language" },
    { value: 'en', text: "English" },
    { value: 'sl', text: "Slovenian" }
  ]

  //useEffect- kao componentDidMount

  return (
    <div class="login-page">
      <div class="image-div">
        <img
          src={process.env.PUBLIC_URL + 'assets/img/logo.png'}
          alt="SteriPro"
          style={{ maxWidth: "130px", width: "100%", marginBottom: "30px" }}
        ></img>
      </div>
      <div class="form">
        <h4>{t('welcome_back')}</h4>
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

                  <select value={lang} onChange={handleChange}>
                    {languages.map(item => {
                      return (<option key={item.value}
                        value={item.value}>{item.text}</option>);
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
