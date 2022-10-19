
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { libraryService } from "../services/LibraryService";
import LibraryContextProvider from "../contexts/LibraryContext";

import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const EditLibraryForm = (props) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
    let transferData = props.libraryState.updateData.data.library;
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const [documentTitle, setDocumentTitle] = useState(transferData.documentTitle);
	const [documentDescription, setDocumentDescription] = useState(transferData.documentDescription);
	const [id, setId] = useState(transferData.id);

	useEffect(() => {
		
	  }, [props.dispatch]);
	const handleSubmit = (e) => {
		e.preventDefault();



		var data = {
			id: id,
			documentTitle: documentTitle,
			documentDescription: documentDescription
		}
		
		libraryService.editLibrary(data, props.dispatch);
	};


	return (
		<React.Fragment>

			<div>
				<Paper square>

<LibraryContextProvider>
					<div className="container"  >


						<div className="row mt-5">

							<form id="contactForm" >



								<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
									<td width="600rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>{t("title")}</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder={t("title")}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setDocumentTitle(e.target.value)}
															value={documentTitle}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>{t("description")}</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder={t("decription")}
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setDocumentDescription(e.target.value)}
															value={documentDescription}
														/>
													</div>
												</div>
											</div>
										</div>

										
										<div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmit(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												{t("update")}
											</button>
										</div>


									</td>
								</table>



							</form>
						</div>


					</div>

					</LibraryContextProvider>

				</Paper>
			</div>
		</React.Fragment>
	);
};

export default EditLibraryForm;
