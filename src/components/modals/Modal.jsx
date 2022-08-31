import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { documentsConstants } from "../../constants/DocumentsConstants";
import { DocumentsContext } from "../../contexts/DocumentsContext";

const DocModal = () => {

	const { documentsState, dispatch } = useContext(DocumentsContext);

	const handleModalClose = () => {
		dispatch({ type: documentsConstants.DOCUMENT_HIDE_SUCCESS });
		window.location.reload(true);
	};

	return (
		<Modal 
		show={documentsState.modal.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{documentsState.modal.title} </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
			<div class= "form-modal" >
							<form  >


								<h6 >{documentsState.modal.message}</h6>

							</form>
						</div>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocModal;
