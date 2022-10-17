import React, { createContext, useReducer } from "react";
import { companyReducer } from "../reducers/CompanyReducer";

export const CompanyContext = createContext();

const CompanyContextProvider = (props) => {

	const [companyState, dispatch] = useReducer(companyReducer, {

		listCompanies: {
			showError: false,
			errorMessage: "",
			companies: [],
		},

	

		modal: {
			showModal: false,
			message: "",
			title: "",
			companies: [],
			message2: ""
		},
		
		modalRequest: {
			showModal: false,
			file: null,
			message: "",
			title: "",
			companies: [],
			message2: ""
		},
		
	
	});

	return <CompanyContext.Provider value={{ companyState, dispatch }}>{props.children}</CompanyContext.Provider>;
};

export default CompanyContextProvider;
