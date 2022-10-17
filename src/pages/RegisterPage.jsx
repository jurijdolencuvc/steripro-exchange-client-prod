import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import SendRegistrationMailForm from "../components/SendRegistrationMailForm";
import RegisterForm from "../components/RegisterForm";
import UserContextProvider from "../contexts/UserContext";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

import ModalReset from "../components/modals/ModalReset";
var url = process.env.REACT_APP_URL;


const RegisterPage = () => {


	return (
	
		<div style={{ background: "#387499", backgroundSize:"cover", height:"100%"}}>
		<section className="login-clean">
			<UserContextProvider>
				
			<ModalReset/>
				<RegisterForm />
			</UserContextProvider>
		</section>
	</div>

		
	);
};

export default RegisterPage;
