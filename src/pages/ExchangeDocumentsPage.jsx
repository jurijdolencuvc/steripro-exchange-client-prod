
import { React, useEffect } from "react";

import ExchangeDocuments from "../components/ExchangeDocuments";
import DocumentsContextProvider from "../contexts/DocumentsContext";

import DocumentsModal from "../components/modals/DocumentsModal";
import EditDocumentModal from "../components/modals/EditDocumentModal";
import Modal from "../components/modals/Modal";

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";


var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"

const HomePage = () => {
	useEffect(() => {
		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`${url}api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
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
		<div>
			<DocumentsContextProvider>
				<DocumentsModal/>
				<EditDocumentModal/>
				<Modal/>
					<ExchangeDocuments/>
			</DocumentsContextProvider>
		</div>
	);
};

export default HomePage;

