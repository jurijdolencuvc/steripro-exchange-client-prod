import React from "react";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};


const PageNotFound = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	return (
		<React.Fragment>
			<section className="login-clean">
				<div className="illustration" style={{ fontSize: "150px" }}>
					<i className="icon ion-ios-navigate"></i>
				</div>

				<div className="text-center" style={{ fontSize: "6em", color: "#F4476B" }}>
					<b>404</b>
				</div>
				<div className="text-center mt-5" style={{ fontSize: "3em" }}>
					Oops... <br />
					{t("pageNotFound")} <br/>

				</div>		
			
			</section>
		</React.Fragment>
	);
};

export default PageNotFound;
