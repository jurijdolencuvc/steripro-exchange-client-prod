import { useContext ,useState,useEffect, } from "react";
import {  Modal } from "react-bootstrap";
import { companyConstants } from "../../constants/CompanyConstants";
import { CompanyContext } from "../../contexts/CompanyContext";
import RequestRemoveCompany from "./RequestRemoveCompany";

const RequestDeleteCompanyModal = () => {

	const { companyState, dispatch } = useContext(CompanyContext);
	const [emptyArray, setEmptyArray] = useState(true);
	const handleModalClose = () => {
		dispatch({ type: companyConstants.HIDE_REQUEST_MODAL });
	};
	useEffect(() => {
		

		console.log(companyState.modalRequest.companies)
		if(companyState.modalRequest.companies!= null && companyState.modalRequest.companies.length>0){

			setEmptyArray(false)
		}
	});
	return (
		<Modal 
		show={companyState.modalRequest.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="md">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>?</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<RequestRemoveCompany
				emptyArray = {emptyArray}
				companyState = {companyState}
				dispatch = {dispatch}
				users = {companyState.modalRequest.users}
				message = {companyState.modalRequest.message}
				message2 = {companyState.modalRequest.message2}
				file = {companyState.modalRequest.file}
				/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default RequestDeleteCompanyModal;
