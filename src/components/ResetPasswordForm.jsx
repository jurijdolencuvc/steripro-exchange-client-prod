import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

import { LocaleContext } from "../contexts/locale.context.js";
import en from "../locales/en.json";
import sl from "../locales/sl.json";
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI

var url = process.env.REACT_APP_URL;


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};


const ResetPasswordForm = () => {

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
	const [lang, setLang] = useState("");
	const { userState, dispatch } = useContext(UserContext);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const queryParams = new URLSearchParams(useLocation().search);

	let { email } = useParams();
	let { token } = useParams();


	const handleSubmit = (e) => {
		e.preventDefault();


		if (password != confirmPassword) {
			setErrorMessage(t("passwordsDoNotMatch"))
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
		<div  >  <LocaleContext.Provider
			value={{
				current: current,
				t: t
			}}
		>
			<UserContextProvider>


				<div class="login-page">
					<div class="image-div">
						<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'} alt="SteriPro" style={{ maxWidth: "130px", marginBottom: "30px", width: "100%" }}></img>
					</div>
					<div class="form">


						<form method="post" onSubmit={handleSubmit}>


							<h4 style={{ marginBottom: "30px" }} >{t('setNewPassword')}</h4>
							<div className="form-group">
								<input className="form-control" type="password" style={{ height: "50px" }} required name="password" placeholder={t('newPassword')} value={password} onChange={(e) => setPassword(e.target.value)}></input>
							</div>

							<div className="form-group">
								<input className="form-control" type="password" style={{ height: "50px" }} required name="confirmPassword" placeholder={t('confirmPassword')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
							</div>
							{errorMessage && <div className="form-group text-center" style={{ color: "red", fontSize: "0.8em" }} >
								{errorMessage}
							</div>
							}
							<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

							<div className="form-group">
								<input className="btn btn-primary btn-block" id="kayitol" type="submit" style={{ background: "#5e90f6" }} value={t('send')} />
							</div>

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
						</form></div>
				</div>

			</UserContextProvider>
		</LocaleContext.Provider>
		</div>
	);


};
export default ResetPasswordForm;



