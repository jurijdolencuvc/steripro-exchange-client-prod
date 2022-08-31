import { React, useEffect } from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import UserContextProvider from "../contexts/UserContext";

import ModalReset from "../components/modals/ModalReset";


const ResetPasswordPage = () => {


	useEffect(() => {
		
	});
	

	return (
	
			<div>
				<section className="login-clean">
					<UserContextProvider>
						
					<ModalReset/>
						<ResetPasswordForm />
					</UserContextProvider>
				</section>
			</div>


		
	);
};

export default ResetPasswordPage;
