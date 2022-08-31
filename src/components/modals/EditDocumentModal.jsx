import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import EditDocumentForm from "../EditDocumentForm";

const EditDocumentModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);

	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_EDIT_DOCUMENT_MODAL });
	};

	return (
		<Modal 
		show={documentsState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Edit document</big>
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
