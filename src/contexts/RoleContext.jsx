import React, { createContext, useReducer } from "react";
import { roleReducer } from "../reducers/RoleReducer";

export const RoleContext = createContext();

const RoleContextProvider = (props) => {

	const [roleState, dispatch] = useReducer(roleReducer, {

		listRoles: {
			showError: false,
			errorMessage: "",
			roles: [],
		},

	

		modal: {
			showModal: false,
			message: "",
			title: "",
			users: [],
			message2: ""
		},
		
		modalRequest: {
			showModal: false,
			file: null,
			message: "",
			title: "",
			users: [],
			message2: ""
		},
		
	
	});

	return <RoleContext.Provider value={{ roleState, dispatch }}>{props.children}</RoleContext.Provider>;
};

export default RoleContextProvider;
