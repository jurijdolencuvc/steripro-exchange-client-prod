import { WifiTetheringErrorRoundedTwoTone } from "@mui/icons-material";
import Axios from "axios";
import { userConstants } from "../constants/UserConstants";
import { constants } from "../consts/consts";

import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { authHeader } from "../helpers/auth-header";
var url = process.env.URL;
export const userService = {
	login,
	logout,
	changePassword,
	resetPassword,
	contact,
	setNewPassword,
};

function login(loginRequest, dispatch) {
	
	dispatch(request());
	console.log("Halo halo");
	console.log(url);
	Axios.post(`api/users/login`, loginRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				setAuthInLocalStorage(res.data);
				dispatch(success());
			
				//dispatch(failure(res.data.error));
				window.location.href="/#"
							
			} else if (res.status === 412) {
				dispatch(failure(res.data.error));
			} else {
				dispatch({ type: userConstants.LOGIN_FAILURE });
			}
		})
		.catch((err) =>{
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function success() {
		return { type: userConstants.LOGIN_SUCCESS };
	}
	function failure(error) {
		
		var error = constants(error)
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}


function changePassword(sendEmailRequest, dispatch) {
	dispatch(request());
	Axios.post(`api/users/passwordreset`, sendEmailRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				//setAuthInLocalStorage(res.data);
				dispatch(success());
				//window.location = "#/";
			
			}  else if (res.status === 412) {
				console.log(res.data.error)
				dispatch(failure(res.data.error));
			}else {
				console.log(res.data)
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			
		var error = constants("Unknown error, please try again later.")
			dispatch(failure(error));
		})


		function request() {
			return { type: userConstants.PASSWORD_RESET_REQUEST };
		}
		function success() {
			return { type: userConstants.PASSWORD_RESET_SUCCESS };
		}
		function failure(error) {
			
		var error = constants(error)
			return { type: userConstants.PASSWORD_RESET_FAILURE, error };
		}
}

function contact(formData, dispatch) {

	console.log(formData)
	var token = authHeader()
	dispatch(request());
	Axios.post(`api/contact`, formData, {
		headers: {
		  "Content-Type": "multipart/form-data", Authorization: token 
		}})
		.then((res) => {
			if (res.status === 201) {
				//setAuthInLocalStorage(res.data);
				dispatch(success());
				//window.location = "#/";
			
			}  else if (res.status === 412) {
				dispatch(failure(res.data.error));
			}else {
				console.log(res.data)
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
			dispatch(failure(error));
		})
		function request() {
			return { type: userConstants.CONTACT_REQUEST };
		}
		function success() {
			return { type: userConstants.CONTACT_SUCCESS };
		}
		function failure(error) {
			
		var error = constants(error)
			return { type: userConstants.CONTACT_FAILURE, error };
		}
}


function resetPassword(sendRequest, dispatch) {
	dispatch(request());
	Axios.post(`api/users/reg`, sendRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				//setAuthInLocalStorage(res.data);
				dispatch(success());
				//window.location = "#/";
			
			}  else if (res.status === 412) {
				dispatch(failure(res.data.error));
			}else {
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, try again later.")
			dispatch(failure(error));
		})

	function request() {
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_REQUEST };
	}
	function success() {
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_SUCCESS };
	}
	function failure(error) {

		var error = constants(error)
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_FAILURE, error };
	}
}


function setNewPassword(sendRequest, dispatch) {
	dispatch(request());
	Axios.post(`api/users/reg`, sendRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				//setAuthInLocalStorage(res.data);
				//dispatch(success());
				window.location = "#/";
			
			}  else if (res.status === 412) {
				//dispatch(failure(res.data.error));
			}else {
				//dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
			dispatch(failure(error));
		})

	function request() {
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_REQUEST };
	}
	function success() {
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_SUCCESS };
	}
	function failure(error) {
		var error = constants(error)
		return { type: userConstants.SEND_RESET_PASSWORD_MAIL_FAILURE, error };
	}
}




function logout() {
	deleteLocalStorage();
	window.location = "#/login";
}

