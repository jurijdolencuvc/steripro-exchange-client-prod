
import { React, useEffect } from "react";

import ExchangeLibrary from "../components/ExchangeLibrary";
import LibraryContextProvider from "../contexts/LibraryContext";

import DocumentsContextProvider from "../contexts/DocumentsContext";
import LibraryModal from "../components/modals/LibraryModal";
import AddNewLibraryForm from "../components/AddNewLibraryForm";
import EditLibraryModal from "../components/modals/EditLibraryModal";
import ModalLib from "../components/modals/ModalLib";
import RequestDeleteModal from "../components/modals/RequestDeleteModal";
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
			<LibraryContextProvider>
				<LibraryModal/>
				<EditLibraryModal/>
				<ModalLib/>
				<RequestDeleteModal/>
				<ExchangeLibrary/>
			</LibraryContextProvider>
		</div>
	);
};

export default HomePage;

