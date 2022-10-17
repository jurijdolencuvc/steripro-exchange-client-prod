
import { React, useEffect } from "react";

import ExchangeCompanies from "../components/ExchangeCompanies";
import CompanyContextProvider from "../contexts/CompanyContext";

import CompaniesModal from "../components/modals/CompaniesModal";
import ModalCompanies from "../components/modals/ModalCompanies";

import RequestDeleteCompanyModal from "../components/modals/RequestDeleteCompanyModal";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL;

const CompaniesPage = () => {

	
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
			<CompanyContextProvider>
				<CompaniesModal/>
				<ModalCompanies/>
				<RequestDeleteCompanyModal/>
				<ExchangeCompanies/>
			</CompanyContextProvider>
		</div>
	);
};

export default CompaniesPage;

