import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";
import RequestRemoveDocument from "./RequestRemoveDocument";

const RequestDeleteDocumentModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);

	const handleModalClose = () => {
		dispatch({ type: documentsConstants.HIDE_REQUEST_MODAL });
	};

	return (
		<Modal 
		show={documentsState.modalRequest.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>?</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<RequestRemoveDocument
				documentsState = {documentsState}
				dispatch = {dispatch}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default RequestDeleteDocumentModal;
