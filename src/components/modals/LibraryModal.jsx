import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import {  Modal } from "react-bootstrap";
import { libraryConstants } from "../../constants/LibraryConstants";
import { LibraryContext } from "../../contexts/LibraryContext";
import AddNewLibraryForm from "../AddNewLibraryForm";

import { DocumentsContext } from "../../contexts/DocumentsContext";


import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";


import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var url = process.env.URL;
const LibraryModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	const [token, setToken] = useState("");
	const [role, setRole] = useState(false);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const { libraryState, dispatch } = useContext(LibraryContext);

	const handleModalClose = () => {
		dispatch({ type: libraryConstants.HIDE_ADD_LIBRARY_MODAL });
		window.location.reload()
	};




	useEffect(() => {

	
	
		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {
			setToken(token)
			Axios.get(`api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Admin" == res.data) {

              setRole(true)
						}
					} 
				})
				.catch((err) => {
					
				})
		}

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
				distributors = {libraryState.listDistributors.distributors}
				role = {role}
				token = {token}/>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default LibraryModal;
