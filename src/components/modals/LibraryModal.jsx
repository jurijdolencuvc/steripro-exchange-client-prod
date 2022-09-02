import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import AddNewLibraryForm from "../AddNewLibraryForm";

const LibraryModal = () => {

	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_ADD_LIBRARY_MODAL });
	};

	return (
		<Modal 
		show={libraryState.listFiles.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Add new library</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewLibraryForm
				categories = {libraryState.listCategories.categories}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default LibraryModal;
