import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import RequestRemove from "./RequestRemove";

const RequestDeleteModal = () => {

	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_REQUEST_MODAL });
	};

	return (
		<Modal 
		show={libraryState.modalRequest.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>?</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<RequestRemove
				libraryState = {libraryState}
				dispatch = {dispatch}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default RequestDeleteModal;
