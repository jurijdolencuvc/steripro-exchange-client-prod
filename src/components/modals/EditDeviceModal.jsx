import { useContext } from "react";
import {  Modal } from "react-bootstrap";
import { deviceConstants } from "../../constants/DeviceConstants";
import { DeviceContext } from "../../contexts/DeviceContext";
import EditDeviceForm from "../EditDeviceForm";

const EditDeviceModal = () => {

	const { deviceState, dispatch } = useContext(DeviceContext);

	const handleModalClose = () => {
		dispatch({ type: deviceConstants.HIDE_EDIT_DEVICE_MODAL });
		window.location.reload(true)
	};

	return (
		<Modal 
		show={deviceState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Edit device</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<EditDeviceForm
				deviceState = {deviceState}
				dispatch = {dispatch}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default EditDeviceModal;
