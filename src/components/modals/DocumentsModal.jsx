import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import AddNewDocumentForm from "../AddNewDocumentForm";

const DocumentsModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);

	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_ADD_DOCUMENT_MODAL });
	};

	return (
		<Modal 
		show={documentsState.listFiles.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Add new document</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewDocumentForm/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocumentsModal;
