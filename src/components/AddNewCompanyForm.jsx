
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { companyService } from "../services/CompanyService";
import { CompanyContext } from "../contexts/CompanyContext";

import en from "../locales/en.json";
import sl from "../locales/sl.json";
const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

var url = process.env.REACT_APP_URL;

const AddNewCompanyForm = (props) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const [companyName, setCompanyName] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const { companyState, dispatch } = useContext(CompanyContext);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);

	useEffect(() => {
		
		someFetchActionCreator()
	}, [dispatch]);


	const someFetchActionCreator = () => {

	}




	const handleSubmit = (e) => {
		e.preventDefault();

		if (companyName == "") {

			setErrMessage(t("fillAllFields"))
		} else {
		
		companyService.add(companyName,dispatch);
			
		}
	};
	

	return (
		<React.Fragment>

			<div>
				<Paper square>


					<div className="container"  >


						<div className="row mt-5">

							<form id="contactForm" >



								<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
									<td width="600rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>{t("companyName")}</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder={t("companyName")}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setCompanyName(e.target.value)}
															value={companyName}
														/>
													</div>
												</div>
											</div>
										</div>
									
										<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
											{errMessage}
										</div>
										<div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmit(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												{t("addCompany")}
											</button>
										</div>
									</td>
								</table>



							</form>
						</div>


					</div>



				</Paper>
			</div>
		</React.Fragment>
	);
};

export default AddNewCompanyForm;
