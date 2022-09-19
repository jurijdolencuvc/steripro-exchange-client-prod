import React from "react";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

const UnauthorizedPage = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	return (
		<React.Fragment>
			<section className="login-clean">
			<div class="image-div" style={{marginTop: "70px"}}>
							<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "100px", width: "100%" }}></img>
						</div>

				<div className="text-center" style={{ fontSize: "6em", color: "#3861b3" }}>
					<b>401</b>
				</div>
				<div className="text-center mt-5" style={{ fontSize: "3em" }}>
					Oops... <br />
					{t("unauthorized")}
				</div>
				<div className="text-center mt-5" style={{ fontSize: "1em" }}>
				{t("tryLoggingIn")} <a href="#/login">{t("here")} </a> <br />
					
					
				</div>
			</section>
		</React.Fragment>
	);
};

export default UnauthorizedPage;
