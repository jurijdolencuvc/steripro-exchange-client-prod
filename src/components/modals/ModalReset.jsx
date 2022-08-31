import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { userConstants } from "../../constants/UserConstants";
import { UserContext } from "../../contexts/UserContext";

const ModalReset = () => {

	const {userState, dispatch } = useContext(UserContext);

	const handleModalClose = () => {
		dispatch({ type: userConstants.HIDE_MODAL });
		window.location.reload(true);
	};

	return (
		<Modal 
		show={userState.sendResetPasswordError.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{userState.sendResetPasswordError.title} </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				
			<div class= "form-modal" >
							<form  >
								<h6 >{userState.sendResetPasswordError.message}</h6>
							</form>
						</div>
						
				
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default ModalReset;
