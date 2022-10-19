import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { companyConstants } from "../../constants/CompanyConstants";
import { CompanyContext } from "../../contexts/CompanyContext";
import AddNewCompanyForm from "../AddNewCompanyForm";

import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const CompaniesModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	
	t = t.bind(this);
	const { companyState, dispatch } = useContext(CompanyContext);

	const [role, setRole] = useState(false);
	const [token, setToken] = useState("");
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: companyConstants.HIDE_ADD_COMPANY_MODAL });
		window.location.reload()
	};

    useEffect(() => {
    
		  var token = authHeader()
		  if (token == "null") {
			  window.location = "#/unauthorized";
		  } else {
  
			setToken(token)
			  Axios.get(`${url}api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			  )
				  .then((res) => {
					  if (res.status === 201) {
						  if ("Admin" == res.data) {
  
				setRole(true)
						  }
					  } 
				  })
				  .catch((err) => {
					  
				  })
		  }

       
      }, [dispatch]);
	return (
		<Modal 
		show={companyState.listCompanies.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t('addCompany')}</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewCompanyForm
				role = {role}
				token = {token}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default CompaniesModal;
