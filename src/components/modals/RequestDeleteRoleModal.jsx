import { useContext ,useState,useEffect, } from "react";
import {  Modal } from "react-bootstrap";
import { roleConstants } from "../../constants/RoleConstants";
import { RoleContext } from "../../contexts/RoleContext";
import RequestRemoveRole from "./RequestRemoveRole";

const RequestDeleteRoleModal = () => {

	const { roleState, dispatch } = useContext(RoleContext);

	const [emptyArray, setEmptyArray] = useState(true);

	const handleModalClose = () => {
		dispatch({ type: roleConstants.HIDE_REQUEST_MODAL });
	};

	useEffect(() => {
		

		if(roleState.modalRequest.users.length>0){

			setEmptyArray(false)
		}
	});

	return (
		<Modal 
		show={roleState.modalRequest.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>?</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<RequestRemoveRole
				emptyArray = {emptyArray}
				roleState = {roleState}
				dispatch = {dispatch}
				users = {roleState.modalRequest.users}
				message = {roleState.modalRequest.message}
				message2 = {roleState.modalRequest.message2}
				file = {roleState.modalRequest.file}
				/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default RequestDeleteRoleModal;
