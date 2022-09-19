import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';

import { VscLibrary } from 'react-icons/vsc';
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI
const SupportForm = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);

	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);

	const { userState, dispatch } = useContext(UserContext);


	const [errMessage, setErrMessage] = useState("");
	const [file, setFile] = useState(null);

	const [message, setMessage] = useState("");


	useEffect(() => {

		
	  }, [dispatch]);
	const handleLogout = (event) => {

		userService.logout();
		//dataService.getDecisionAsExel(travelReqID, dispatch);
	}

	/*	const handleSubmit = (e) => {
			e.preventDefault();
	
	
	
			let messageSend = {
				message: message,
	
			};
	
			userService.contact(messageSend, dispatch);
		};*/



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

		if (message == "") {

			setErrMessage(t("fillAllFields"))
		} else {
			const formData = new FormData();

			formData.append('File', file);
			formData.append("message", message);
			// Details of the uploaded file 

			// Request made to the backend api 
			// Send formData object 
			//axios.post("api/uploadfile", formData); 



			userService.contact(formData, dispatch);
		}
	};



	//useEffect- kao componentDidMount

	return (
		<body style={{ height: "750px" }}>
			<div  >

				<UserContextProvider>
					<div class="wrapper">
						<nav id="sidebar">
							<div class="sidebar-header">
								<div class="image-div">
									<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'} alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
								</div>
							</div>

							<nav class="">
              <div class="nav_list"> <a href="#" class="nav_link"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">{t('devices')}</span> </a>
                <a href="/#/exchangeDocuments" class="nav_link "> <i class='bx bx-user nav_icon'><BiCollection /></i> <span class="nav_name">{t('exchange_documents')}</span> </a>  </div>
              <a href="/#/exchangeLibraries" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><VscLibrary /></i> <span class="nav_name ">{t('library')}</span> </a>

			  <a href="/#/contact" style={{ marginTop: "20px" }} class="nav_link active"> <i class='bx bx-log-out nav_icon'><AiOutlineMail /></i> <span class="nav_name ">{t('support')}</span> </a>
             <a onClick={handleLogout} style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">{t('signout')}</span> </a>
            </nav>
						

						</nav>
					</div>
					<div >


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmit} style={{ width: "100%", marginRight: "88px" }} >


								<h2 style={{ marginBottom: "50px" }}>{t("sendMessage")}</h2>

								<div className="form-group">
									<textarea className="form-control" style={{ height: "200px" }} type="textarea" required name="message" placeholder={t("insertText")} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
								</div>
								<div style={{ marginTop: "15px" }}>
									<input type="file" name="file" onChange={onFileChange} />

								</div>
								{fileData()}

								<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
									{errMessage}
								</div>
								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div className="form-group">
									<input className="btn btn-primary btn-block" id="kayitol" type="submit" style={{ background: "#5e90f6" }} value={t("send")} />
								</div>


							</form>
						</div>


					</div>
				</UserContextProvider>
			</div>
		</body>
	);


};
export default SupportForm;



