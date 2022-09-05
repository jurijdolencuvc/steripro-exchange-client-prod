import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import EditLibraryForm from "../EditLibraryForm";

import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
const EditLibraryModal = () => {

	const { libraryState, dispatch } = useContext(LibraryContext);

	const { t } = useTranslation();
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_EDIT_LIBRARY_MODAL });
	};

	useEffect(() => {


		i18next.changeLanguage(lang, (err, t) => {
		  if (err) return console.log('something went wrong loading', err);
		  t('key'); // -> same as i18next.t
		});
		
	  }, [dispatch]);
	
	return (
		<Modal 
		show={libraryState.updateData.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t("edit")}</big>
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
