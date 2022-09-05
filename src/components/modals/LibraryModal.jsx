import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import AddNewLibraryForm from "../AddNewLibraryForm";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'

import { DocumentsContext } from "../../contexts/DocumentsContext";

const LibraryModal = () => {

	const { t } = useTranslation();
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_ADD_LIBRARY_MODAL });
	};

	useEffect(() => {


		console.log("distr")
		console.log(libraryState.listDistributors)
		i18next.changeLanguage(lang, (err, t) => {
		  if (err) return console.log('something went wrong loading', err);
		  t('key'); // -> same as i18next.t
		});
	
		
	  }, [dispatch]);
	
	
	return (
		<Modal 
		show={libraryState.listFiles.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{t("addNewLibrary")}</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddNewLibraryForm
				categories = {libraryState.listCategories.categories}
				distributors = {libraryState.listDistributors.distributors}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default LibraryModal;
