import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import EditLibraryForm from "../EditLibraryForm";

import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const EditLibraryModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const { libraryState, dispatch } = useContext(LibraryContext);

	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_EDIT_LIBRARY_MODAL });
	};


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
