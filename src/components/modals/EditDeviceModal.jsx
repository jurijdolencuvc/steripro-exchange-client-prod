import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { deviceConstants } from "../../constants/DeviceConstants";
import { DeviceContext } from "../../contexts/DeviceContext";
import EditDeviceForm from "../EditDeviceForm";
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const EditDeviceModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const { deviceState, dispatch } = useContext(DeviceContext);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: deviceConstants.HIDE_EDIT_DEVICE_MODAL });
		window.location.reload(true)
	};

  
	return (
		<Modal 
		show={deviceState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t('editDevice')}</big>
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
