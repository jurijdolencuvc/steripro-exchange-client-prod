
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { libraryService } from "../services/LibraryService";
import { LibraryContext } from "../contexts/LibraryContext";

const AddNewLibraryForm = (props) => {
	const [documentTitle, setDocumentTitle] = useState("");
	const [documentDescription, setDocumentDescription] = useState("");
	const [category, setCategory] = useState("");
	const [file, setFile] = useState(null);
	const [errMessage, setErrMessage] = useState("");
	const { libraryState, dispatch } = useContext(LibraryContext);


	useEffect(() => {

		someFetchActionCreator()
	}, [dispatch]);


	const someFetchActionCreator = () => {

	//	console.log("tu sam" + props.categories)
		const getDocumentsInfoHandler = async () => {
			//await documentService.getCategories(dispatch);
		};
		getDocumentsInfoHandler();
	}

	const onFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{ marginTop: "20px" }}>File Details:</h2>
					<p>File Name: {file.name}</p>
					<p>File Type: {file.type}</p>
					<p>
						Last Modified:{" "}
						{file.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(category)
		if (file == null || documentDescription == "" || documentTitle == ""|| category=="") {

			setErrMessage("Please fill all fields")
		} else {
			const formData = new FormData();

			formData.append('File', file);
			formData.append("documentTitle", documentTitle);
			formData.append("documentDescription", documentDescription);
			formData.append("category", category);
			// Details of the uploaded file 

			// Request made to the backend api 
			// Send formData object 
			//axios.post("api/uploadfile", formData); 



			libraryService.addLibrary(formData, dispatch);
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
												<label><b>Title</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Title"
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
												<label><b>Description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Description"
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

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Category</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">

														<select onChange={(e)=>setCategory(e.target.value)} name="category" class="custom-select" style={{width:"360px"}}>
															{props.categories.map(item =>
																<option key={item._id} value={item.title} >{item.title}</option>
															)};
														
														</select>
													</div>
												</div>
											</div>
										</div>


										<div style={{ marginTop: "15px" }}>
											<input type="file" name="file" onChange={onFileChange} />

										</div>
										{fileData()}

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
												Add
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

export default AddNewLibraryForm;
