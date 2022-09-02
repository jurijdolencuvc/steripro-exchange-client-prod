import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";

const ModalLib = () => {

	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.LIBRARY_HIDE_SUCCESS });
		window.location.reload(true);
	};

	return (
		<Modal 
		show={libraryState.modal.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{libraryState.modal.title} </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
			<div class= "form-modal" >
							<form  >


								<h6 >{libraryState.modal.message}</h6>

							</form>
						</div>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default ModalLib;
