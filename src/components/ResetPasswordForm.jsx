import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI
const ResetPasswordForm = () => {
	const { userState, dispatch } = useContext(UserContext);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const queryParams = new URLSearchParams(useLocation().search);
	
	let { email } = useParams();
	let { token } = useParams();



	const handleSubmit = (e) => {
		e.preventDefault();


		if(password != confirmPassword){
			setErrorMessage("Passwords do not match.")
			return
		}
		let sendRequest = {
			password,
			confirmPassword,
			email,
			token
		};

		userService.changePassword(sendRequest, dispatch);
	};


	//useEffect- kao componentDidMount

	return (
		<body style={{   background: "#387499", height: "750px"}}>
		<div  >
			<UserContextProvider>

					<div class="login-page">
					<div class="image-div">
							<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "100px", width: "100%" }}></img>
						</div>
						<div class="form">
						
						
							<form method="post" onSubmit={handleSubmit}>
							
							
								<h2 style={{marginBottom: "30px"}} >Set new password</h2>
								<div className="form-group">
									<input className="form-control" type="password" style={{ height: "50px" }} required name="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
								</div>
						
								<div className="form-group">
									<input className="form-control" type="password" style={{ height: "50px" }} required name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
								</div>
								{errorMessage && <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em" }} >
									{errorMessage}
								</div>
}
								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div className="form-group">
									<input className="btn btn-primary btn-block" id="kayitol" type="submit" style={{ background: "#5e90f6" }} value="Send" />
								</div>


							</form></div>
					</div>
			</UserContextProvider>
		</div>
		</body>
	);


};
export default ResetPasswordForm;



