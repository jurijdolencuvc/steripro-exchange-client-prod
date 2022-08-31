import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { deviceConstants } from "../../constants/DeviceConstants";
import { DeviceContext } from "../../contexts/DeviceContext";

const DocModal = () => {

	const { deviceState, dispatch } = useContext(DeviceContext);

	const handleModalClose = () => {
		dispatch({ type: deviceConstants.DOCUMENT_HIDE_MODAL });
		window.location.reload(true);
	};

	return (
		<Modal 
		show={deviceState.modal.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{deviceState.modal.title} </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
			<div class= "form-modal" >
							<form  >


								<h6 >{deviceState.modal.message}</h6>

							</form>
						</div>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocModal;
