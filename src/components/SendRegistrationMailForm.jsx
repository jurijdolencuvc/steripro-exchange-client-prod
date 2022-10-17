import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { BsBuilding } from "react-icons/bs";
import { GiPerson } from "react-icons/gi";
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const SendRegistrationMailForm = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);

	const { userState, dispatch } = useContext(UserContext);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const [roles, setRoles] = useState(userState.listRoles.roles);
	const [role, setRole] = useState(null);
	const [companies, setCompanies] = useState(userState.listCompanies.companies);
	const [company, setCompany] = useState(null);
	const [email2, setEmail2] = useState("");
	const [tf, setTf] = useState(true);

	const handleLogout = (event) => {

		userService.logout();
	}
	useEffect(() => {
		setCompanies(userState.listCompanies.companies)
		setRoles(userState.listRoles.roles)
	});
	const handleRoleChange = (e) => {
		if(e=="Admin"){
			setTf(true)
		}else{

			setTf(false)
		}
	}

	const handleSubmitNew = (e) => {
		e.preventDefault();

		let sendEmailRequest = {}
		if(role == null){
			sendEmailRequest = {
				email: email2,
				role: userState.listRoles.roles[0].title,
				company: company,
			};
		}else{
			sendEmailRequest = {
				email: email2,
				role: role,
				company: company,
			};
		}
		

		userService.resetPassword(sendEmailRequest, dispatch);
	};


	//useEffect- kao componentDidMount

	return (
		<body style={{ height: "750px" }}>
			<div>

				<UserContextProvider>
					<div class="wrapper">
						<nav id="sidebar">
							<div class="sidebar-header">
								<div class="image-div">
									<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'} alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
								</div>
							</div>

							<nav class="">
								<div class="nav_list"> <a href="#" class="nav_link"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">{t('tasks')}</span> </a>
									<a href="/#/exchangeDocuments" class="nav_link "> <i class='bx bx-user nav_icon'><BiCollection /></i> <span class="nav_name">{t('exchange_documents')}</span> </a>  </div>
								<a href="/#/exchangeLibraries" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><VscLibrary /></i> <span class="nav_name ">{t('library')}</span> </a>
								<a
									href="/#/roles"
									style={{ marginTop: "20px" }}
									class="nav_link "
								>
									
									<i class="bx bx-log-out nav_icon">
										<GiPerson />
									</i>
									<span class="nav_name ">{t("manageRoles")}</span>
								</a>
								<a href="/#/companies" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><BsBuilding /></i> <span class="nav_name ">{t('exchangeCompanies')}</span> </a>
								
								{<a href="/#/sendRegistrationMail" style={{ marginTop: "20px" }} class="nav_link active"> <i class='bx bx-log-out nav_icon'><AiOutlineUserAdd /></i> <span class="nav_name">{t('enroll')}</span> </a>}
								<a onClick={handleLogout} style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">{t('signout')}</span> </a>
							</nav>
						</nav>
					</div>
					<div >


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{ width: "100%", marginRight: "88px" }} >


								<h2 style={{ marginBottom: "80px" }}>Send registration link to the new user</h2>

								<div className="form-group">
									<input className="form-control" type="email" style={{ height: "50px" }} required name="email" placeholder={t("email")} value={email2} onChange={(e) => setEmail2(e.target.value)}></input>
								</div>
								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										<label><b>Choose user's role</b></label>
										<div class="row" >
											<div class="form-group col-lg-10">

												<select onChange={(e) => handleRoleChange(e.target.value)} name="role" class="custom-select" style={{ height: "50px", width: "1300px" }} >
													{roles.map(item =>
														<option key={item._id} value={item.title} >{item.title}</option>
													)};

												</select>
											</div>
										</div>
									</div>
								</div>

								<div className="control-group">
									<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
										<label><b>Choose users company</b></label>
										<div class="row" >
											<div class="form-group col-lg-10">

												<select id="select"  disabled={tf} onChange={(e) => setCompany(e.target.value)} name="company" class="custom-select" style={{ height: "50px", width: "1300px" }}>
													{companies.map(item =>
														<option key={item._id} value={item.title} >{item.title}</option>
													)};

												</select>
											</div>
										</div>
									</div>
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



