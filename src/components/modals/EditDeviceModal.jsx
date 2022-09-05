import { useContext, useState, useEffect,useRef, React } from "react";
import {  Modal } from "react-bootstrap";
import { deviceConstants } from "../../constants/DeviceConstants";
import { DeviceContext } from "../../contexts/DeviceContext";
import EditDeviceForm from "../EditDeviceForm";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

const EditDeviceModal = () => {

	const { deviceState, dispatch } = useContext(DeviceContext);
	const { t } = useTranslation(); 
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: deviceConstants.HIDE_EDIT_DEVICE_MODAL });
		window.location.reload(true)
	};

    useEffect(() => {
    
        i18next.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
          });
        
		
       
      }, [dispatch]);
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
