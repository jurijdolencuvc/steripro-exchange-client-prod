
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { libraryService } from "../services/LibraryService";
import { LibraryContext } from "../contexts/LibraryContext";


import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

var url = process.env.REACT_APP_URL;

const AddNewLibraryForm = (props) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);

	const [documentTitle, setDocumentTitle] = useState("");
	const [documentDescription, setDocumentDescription] = useState("");
	const [category, setCategory] = useState(props.categories[0].title);
	const [file, setFile] = useState(null);
	
	//const [distributor, setDistributor] = useState(props.distributors[0].name);
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	
	const progressRef = React.useRef();
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
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
				<h2 style={{ marginTop: "20px" }}>{t("fileDetails")}</h2>
				<p>{t("fileName")}: {file.name}</p>
				<p>{t("fileType")}: {file.type}</p>
				<p>
				{t("lastModified")}:{" "}
					{file.lastModifiedDate.toDateString()}
				</p>
			</div>
			);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (file == null || documentDescription == "" || documentTitle == ""|| category=="") {

			setErrMessage(t("fillAllFields"))
		} else {
			const formData = new FormData();

			formData.append('File', file);
			formData.append("documentTitle", documentTitle);
			formData.append("documentDescription", documentDescription);
			formData.append("category", category);
			//formData.append("distributor", distributor);
			// Details of the uploaded file 

			// Request made to the backend api 
			// Send formData object 
			//axios.post("api/uploadfile", formData); 

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);

			xhr.open('POST', `api/uploadfileLibrary`, true);
			xhr.setRequestHeader("Authorization", props.token);
			xhr.onload = function () {
				// do something to response
				console.log(this.responseText);
			};

			xhr.send(formData);

		}
	};

	const ProgressHandler = (e) => {
		//  loadTotalRef.current.innerHTML = `uploaded ${e.loaded} bytes of ${e.total}`;
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
		
	};

	const SuccessHandler = (e) => {
		
		statusRef.current.innerHTML = "Success";
		progressRef.current.value = 100;
		libraryService.addLibrary(true, dispatch);
	};
	const ErrorHandler = () => {
		
		statusRef.current.innerHTML = "Upload failed";
		libraryService.addLibrary(false, dispatch);
	};
	const AbortHandler = () => {
		
		statusRef.current.innerHTML = "Upload aborted";
		libraryService.addLibrary(false, dispatch);
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
															placeholder={t("description")}
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
												<label><b>{t("category")}</b></label>
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
											{t("addLibrary")}
											</button>
										</div>

										<label>
										{t("fileProgress")}: <progress ref={progressRef} value="0" max="100" />
										</label>
										<p ref={statusRef}></p>
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
