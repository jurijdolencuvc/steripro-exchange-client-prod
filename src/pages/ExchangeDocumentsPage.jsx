
import { React, useEffect } from "react";

import ExchangeDocuments from "../components/ExchangeDocuments";
import DocumentsContextProvider from "../contexts/DocumentsContext";

import DocumentsModal from "../components/modals/DocumentsModal";
import AddNewDocumentForm from "../components/AddNewDocumentForm";
import EditDocumentModal from "../components/modals/EditDocumentModal";
import Modal from "../components/modals/Modal";

import RequestDeleteDocumentModal from "../components/modals/RequestDeleteDocumentModal";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL;

const HomePage = () => {

	
	useEffect(() => {
		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Admin" == res.data || "Distributor" == res.data || "User" == res.data) {
						}
						else {
							window.location = "#/unauthorized";
						}
					} else {
						window.location = "#/unauthorized";
					}
				})
				.catch((err) => {
					window.location = "#/unauthorized";
				})
		}

	});

	return (
		<div style={{ height:"100%"}}>
			<DocumentsContextProvider>
				<DocumentsModal/>
				<EditDocumentModal/>
				<Modal/>
				<RequestDeleteDocumentModal/>
				<ExchangeDocuments/>
			</DocumentsContextProvider>
		</div>
	);
};

export default HomePage;

