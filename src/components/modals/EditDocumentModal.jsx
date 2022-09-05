import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import EditDocumentForm from "../EditDocumentForm";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

const EditDocumentModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);
	const { t } = useTranslation(); 
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_EDIT_DOCUMENT_MODAL });
	};

    useEffect(() => {
    
		console.log(documentsState.updateData)
        i18next.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
          });
        
      }, [dispatch]);
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
