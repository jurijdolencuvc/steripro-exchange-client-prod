import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import EditLibraryForm from "../EditLibraryForm";

const EditLibraryModal = () => {

	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_EDIT_LIBRARY_MODAL });
	};

	return (
		<Modal 
		show={libraryState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Edit</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<EditLibraryForm
				libraryState = {libraryState}
				dispatch = {dispatch}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default EditLibraryModal;
