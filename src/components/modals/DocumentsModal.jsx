import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import AddNewDocumentForm from "../AddNewDocumentForm";

import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var url = process.env.REACT_APP_URL;

const DocumentsModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	
	t = t.bind(this);
	const { documentsState, dispatch } = useContext(DocumentsContext);

	const [role, setRole] = useState(false);
	const [token, setToken] = useState("");
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_ADD_DOCUMENT_MODAL });
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
						console.log(res.data)
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
		show={documentsState.listFiles.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t('addNewDocument')}</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewDocumentForm
				categories = {documentsState.listCategories.categories}
				distributors = {documentsState.listDistributors.distributors}
				role = {role}
				token = {token}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocumentsModal;
