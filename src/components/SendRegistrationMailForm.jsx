import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";

import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';

import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
//const Forn({prop1, prop2, ...rest}) => {} HOOKOVI
const SendRegistrationMailForm = () => {
	const { userState, dispatch } = useContext(UserContext);



	const { t } = useTranslation();
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);

	const [email2, setEmail2] = useState("");


	const handleLogout = (event) => { 

		userService.logout();
	   //dataService.getDecisionAsExel(travelReqID, dispatch);
	 }

	const handleSubmitNew = (e) => {
		e.preventDefault();



		let sendEmailRequest = {
			email: email2,

		};

		userService.resetPassword(sendEmailRequest, dispatch);
	};


	useEffect(() => {


		i18next.changeLanguage(lang, (err, t) => {
		  if (err) return console.log('something went wrong loading', err);
		  t('key'); // -> same as i18next.t
		});
		
	  }, [dispatch]);
	
	//useEffect- kao componentDidMount

	return (
		<body style={{ height: "750px" }}>
			<div  >

				<UserContextProvider>
					<div class="wrapper">
						<nav id="sidebar">
							<div class="sidebar-header">
								<div class="image-div">
									<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
								</div>
							</div>

							<nav class="">
              <div class="nav_list"> <a href="#" class="nav_link"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">{t('devices')}</span> </a>
                <a href="/#/exchangeDocuments" class="nav_link "> <i class='bx bx-user nav_icon'><BiCollection /></i> <span class="nav_name">{t('exchange_documents')}</span> </a>  </div>
              <a href="/#/exchangeLibraries" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><VscLibrary /></i> <span class="nav_name ">{t('library')}</span> </a>

             {<a href="/#/sendRegistrationMail" style={{ marginTop: "20px" }} class="nav_link active"> <i class='bx bx-log-out nav_icon'><AiOutlineUserAdd /></i> <span class="nav_name">{t('enroll')}</span> </a>}
              <a onClick={handleLogout} style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">{t('signout')}</span> </a>
            </nav>
						</nav>
					</div>
					<div >


						<div  style={{display:"flex", justifyContent:"center",marginLeft:"338px", marginTop:"100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{width:"100%",marginRight:"88px"  }} >


								<h2 style={{ marginBottom:"80px" }}>{t("passwordResetLink")}</h2>

								<div className="form-group">
									<input className="form-control" type="email" style={{ height: "50px" }} required name="email" placeholder={t("email")} value={email2} onChange={(e) => setEmail2(e.target.value)}></input>
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
export default SendRegistrationMailForm;



