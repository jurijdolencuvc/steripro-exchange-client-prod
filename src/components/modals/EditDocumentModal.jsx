import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import EditDocumentForm from "../EditDocumentForm";

import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const EditDocumentModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const { documentsState, dispatch } = useContext(DocumentsContext);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_EDIT_DOCUMENT_MODAL });
	};

	return (
		<Modal 
		show={documentsState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t('editDocument')}</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<EditDocumentForm
				documentsState = {documentsState}
				dispatch = {dispatch}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default EditDocumentModal;
