
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { documentService } from "../services/DocumentService";
import DocumentContextProvider from "../contexts/DocumentsContext";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
const EditDocumentForm = (props) => {
	
	//const { documentState, dispatch } = useContext(DocumentsContext);
	
    let transferData = props.documentsState.updateData.data.document;
	const { t } = useTranslation();
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const [documentTitle, setDocumentTitle] = useState(transferData.documentTitle);
	const [documentDescription, setDocumentDescription] = useState(transferData.documentDescription);
	const [id, setId] = useState(transferData.id);

	useEffect(() => {


		i18next.changeLanguage(lang, (err, t) => {
		  if (err) return console.log('something went wrong loading', err);
		  t('key'); // -> same as i18next.t
		});
		
	  }, [props.dispatch]);
	const handleSubmit = (e) => {
		e.preventDefault();



		var data = {
			id: id,
			documentTitle: documentTitle,
			documentDescription: documentDescription
		}
		
		// Details of the uploaded file 

		// Request made to the backend api 
		// Send formData object 
		//axios.post("api/uploadfile", formData); 


	
		documentService.editDocument(data, props.dispatch);
	};


	return (
		<React.Fragment>

			<div>
				<Paper square>

<DocumentContextProvider>
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

					</DocumentContextProvider>

				</Paper>
			</div>
		</React.Fragment>
	);
};

export default EditDocumentForm;
