import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import AddNewDocumentForm from "../AddNewDocumentForm";

import { useTranslation } from 'react-i18next'
import i18next from 'i18next';
const DocumentsModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);

    const { t } = useTranslation(); 
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_ADD_DOCUMENT_MODAL });
	};

    useEffect(() => {
    
		console.log("fjsdhfksjdf")
		console.log(documentsState.listDistributors)
        i18next.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
          });
       
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
				distributors = {documentsState.listDistributors.distributors}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocumentsModal;
