
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { deviceService } from "../services/DeviceService";
import DocumentsContextProvider from "../contexts/DocumentsContext";
const EditDeviceForm = (props) => {

	//const { documentState, dispatch } = useContext(DocumentsContext);

	let data = props.deviceState.updateData.data.device;
	
	const [errMessage, setErrMessage] = useState("");
	const [deployDate, setDeployDate] = useState(data.deployDate);
	const [lastRegularServiceDate, setLastRegularServiceDate] = useState(data.lastRegularServiceDate);
	const [id, setId] = useState(data.id);


	const handleSubmit = (e) => {
		e.preventDefault();


		if(deployDate == null){

			setErrMessage("Please define deploy date.")
			return;
		}
		if(lastRegularServiceDate == null){
			var data = {
				id: id,
				deployDate: deployDate,
				lastRegularServiceDate: deployDate
			}
		}else{
			var data = {
				id: id,
				deployDate: deployDate,
				lastRegularServiceDate: lastRegularServiceDate
			}
		}
	
		

		deviceService.editDevice(data, props.dispatch);
	};


	return (
		<React.Fragment>

			<div>
				<Paper square>

					<DocumentsContextProvider>
						<div className="container"  >


							<div className="row mt-5">

								<form id="contactForm" >



									<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
										<td width="600rem"  >
											<div className="control-group">
												<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
													<label><b>Deploy date</b></label>
													<div class="row" >
														<div class="form-group col-lg-10">
															<input

																className={"form-control"}
																placeholder="Deploy date"
																aria-describedby="basic-addon1"
																id="name"
																type="date"
																style={{ backgroundColor: 'white', outline: 'none' }}

																onChange={(e) => setDeployDate(e.target.value)}
																value={deployDate}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="control-group">
												<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
													<label><b>Last regular service date</b></label>
													<div class="row" >
														<div class="form-group col-lg-10">
															<input

																className={"form-control"}
																placeholder="Last regular service date"
																aria-describedby="basic-addon1"
																id="name"
																type="date"
																style={{ backgroundColor: 'white', outline: 'none' }}

																onChange={(e) => setLastRegularServiceDate(e.target.value)}
																value={lastRegularServiceDate}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
									{errMessage}
								</div>
								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
											<div className="form-group text-center">
												<button
													style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

													onClick={(e) => { handleSubmit(e) }}
													className="btn btn-primary btn-xl"
													id="sendMessageButton"
													type="button"
												>
													Update
												</button>
											</div>


										</td>
									</table>



								</form>
							</div>


						</div>

					</DocumentsContextProvider>

				</Paper>
			</div>
		</React.Fragment>
	);
};

export default EditDeviceForm;
