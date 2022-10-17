
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { roleService } from "../services/RoleService";
import { RoleContext } from "../contexts/RoleContext";

import en from "../locales/en.json";
import sl from "../locales/sl.json";
const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

var url = process.env.REACT_APP_URL;

const AddNewRoleForm = (props) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const [roleTitle, setRoleTitle] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const { roleState, dispatch } = useContext(RoleContext);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);

	useEffect(() => {
		
		someFetchActionCreator()
	}, [dispatch]);


	const someFetchActionCreator = () => {

	}




	const handleSubmit = (e) => {
		e.preventDefault();

		if (roleTitle == "") {

			setErrMessage(t("fillAllFields"))
		} else {
		
		roleService.add(roleTitle,dispatch);
			
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
												<label><b>{t("roleTitle")}</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input
															className={"form-control"}
															placeholder={t("roleTitle")}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setRoleTitle(e.target.value)}
															value={roleTitle}
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
												{t("addRole")}
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

export default AddNewRoleForm;
