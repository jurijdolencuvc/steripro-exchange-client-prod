import React, { createContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
	const [userState, dispatch] = useReducer(userReducer, {
		loginError: {
			showError: false,
			errorMessage: "",
		},
		
		registerError: {
			showError: false,
			errorMessage: "",
		},

		sendRegistrationMailError: {
			showError: false,
			errorMessage: "",
		},

		sendResetPasswordError: {
			showModal: false,
			message: "",
			title: ""
		},

		listRoles: {
			showError: false,
			errorMessage: "",
			roles: [],
		},
		
	});

	return <UserContext.Provider value={{ userState, dispatch }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
