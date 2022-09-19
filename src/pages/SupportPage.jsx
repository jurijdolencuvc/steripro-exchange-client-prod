import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import SupportForm from "../components/SupportForm";
import UserContextProvider from "../contexts/UserContext";


import ModalReset from "../components/modals/ModalReset";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.URL;

const SupportPage = () => {

	

	useEffect(() => {

		
	
		var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Distributor" == res.data || "User" == res.data) {
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
						<SupportForm />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default SupportPage;
