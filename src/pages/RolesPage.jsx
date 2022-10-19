
import { React, useEffect } from "react";

import ExchangeRoles from "../components/ExchangeRoles";
import RoleContextProvider from "../contexts/RoleContext";

import RolesModal from "../components/modals/RolesModal";
import ModalRoles from "../components/modals/ModalRoles";

import RequestDeleteRoleModal from "../components/modals/RequestDeleteRoleModal";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

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
		<div style={{ height:"100%"}}>
			<RoleContextProvider>
				<RolesModal/>
				<ModalRoles/>
				<RequestDeleteRoleModal/>
				<ExchangeRoles/>
			</RoleContextProvider>
		</div>
	);
};

export default HomePage;

