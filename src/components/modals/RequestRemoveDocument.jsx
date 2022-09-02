
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { documentService } from "../../services/DocumentService";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import { documentsConstants } from "../../constants/DocumentsConstants";

const RequestRemoveDocument = (props) => {
	
	const { documentsState, dispatch } = useContext(DocumentsContext);

	

	const handleSubmitNo = (e) => {
		e.preventDefault();

		dispatch({ type: documentsConstants.HIDE_REQUEST_MODAL });
	};

	
	const handleSubmitYes = (e) => {
		documentService.deleteDocument(props.documentsState.modalRequest.file, dispatch);
		
	};


	return (
		<React.Fragment>

			<div>
				<Paper square>
					<div className="container"  >

						<div className="row mt-5">

							<form id="contactForm" >

								<table style={{ marginLeft: "4rem", marginBottom: "4rem"}}>
									<td width="500rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Are you sure you want to delete this item?</b></label>
												
											</div>
										</div>
										
										<div style={{ display: "flex", flexDirection: "row", marginLeft: "100px", marginTop: "30px" }}>


										
										<div className="form-group text-center" id="container">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmitYes(e) }}
												className="btn btn-primary btn-xl button1"
												id="button1"
												type="button"
											>
												Yes
											</button>
										</div>


										<div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmitNo(e) }}
												className="btn btn-primary btn-xl button2"
												id="button2"
												type="button"
											>
												No
											</button>
										</div>
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

export default RequestRemoveDocument;
