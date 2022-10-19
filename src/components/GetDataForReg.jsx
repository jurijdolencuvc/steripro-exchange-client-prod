import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import SendRegistrationMailForm from "./SendRegistrationMailForm";

import { userService } from "../services/UserService";

import UserContextProvider from "../contexts/UserContext";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const GetDataForReg = () => {
	
	const [token, setToken] = useState("");
	const [role, setRole] = useState(false);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const { userState, dispatch } = useContext(UserContext);




	const someFetchActionCreator = () => {
		const getDocumentsInfoHandler = async () => {
		 await userService.getRoles(dispatch);
		 await userService.getCompanies(dispatch);
		};

		getDocumentsInfoHandler();
	  }
	useEffect(() => {
		someFetchActionCreator()
	  }, [dispatch]);
	
	return (
		<UserContextProvider>
				<SendRegistrationMailForm/>
				</UserContextProvider>
			
	);
};

export default GetDataForReg;
