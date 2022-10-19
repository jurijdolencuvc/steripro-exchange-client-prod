import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { roleConstants } from "../../constants/RoleConstants";
import { RoleContext } from "../../contexts/RoleContext";
import AddNewRoleForm from "../AddNewRoleForm";

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
const RolesModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	
	t = t.bind(this);
	const { roleState, dispatch } = useContext(RoleContext);

	const [role, setRole] = useState(false);
	const [token, setToken] = useState("");
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: roleConstants.HIDE_ADD_ROLE_MODAL });
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
		show={roleState.listRoles.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t('addRole')}</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewRoleForm
				role = {role}
				token = {token}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default RolesModal;
