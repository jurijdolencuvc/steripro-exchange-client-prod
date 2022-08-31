import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
//import logo from '../../public/assets/img/logo.png';
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI
const LoginForm = () => {
  const { userState, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let loginRequest = {
      email,
      password,
    };


    userService.login(loginRequest, dispatch);
  };

	//useEffect- kao componentDidMount

  return (
      <div class="login-page">
        <div class="image-div">
          <img
            src={process.env.PUBLIC_URL + 'assets/img/logo.png'}
            alt="SteriPro"
            style={{ maxWidth: "100px", width: "100%" }}
          ></img>
        </div>
        <div class="form">
          <h4>Welcome back</h4>
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
                placeholder="Email"
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
                placeholder="Password"
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
              value="Log in"
            />
           
          </form>
        </div>
      </div>
  );
};

export default LoginForm;
