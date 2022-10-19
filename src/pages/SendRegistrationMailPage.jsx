import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import SendRegistrationMailForm from "../components/SendRegistrationMailForm";
import GetDataForReg from "../components/GetDataForReg";
import UserContextProvider from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

import ModalReset from "../components/modals/ModalReset";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";


const SendRegistrationMailPage = () => {


	
	
	useEffect(() => {

		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`${url}api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Admin" == res.data ) {
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
				<section className="login-clean">
					<UserContextProvider>
					<ModalReset/>
					<SendRegistrationMailForm />
					<GetDataForReg/>
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default SendRegistrationMailPage;
