import { WifiTetheringErrorRoundedTwoTone } from "@mui/icons-material";
import Axios from "axios";
import { userConstants } from "../constants/UserConstants";
import { constants } from "../consts/consts";

import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { authHeader } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL;
export const userService = {
	login,
	logout,
	changePassword,
	resetPassword,
	contact,
	getRoles,
	getCompanies,
	register
};

function login(loginRequest, dispatch) {
	console.log(url)
	dispatch(request());
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



function register(sendRequest, dispatch) {
	dispatch(request());
	Axios.post(`api/users/register`, sendRequest, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success());
			} else if (res.status === 412) {
				dispatch(failure(res.data.error));
			} 
		})
		.catch((err) =>{
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
			})

	function request() {
		return { type: userConstants.REGISTER_REQUEST };
	}
	function success() {
		return { type: userConstants.REGISTER_SUCCESS };
	}
	function failure(error) {
		
		var error = constants(error)
		return { type: userConstants.REGISTER_FAILURE, error };
	}
}



function changePassword(sendEmailRequest, dispatch) {
	dispatch(request());
	Axios.post(`api/users/passwordresetExchange`, sendEmailRequest, { validateStatus: () => true })
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
	var token = authHeader()
	dispatch(request());
	Axios.post(`api/users`, sendRequest, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			
			console.log(res)
			if (res.status === 201) {
				dispatch(success());
			
			}  else if (res.status === 215) {
				dispatch(failure(res.data.response));
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

async function getRoles(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`api/roles`, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				
				var error = constants("Error while fetching data")
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

	function request() {
		return { type: userConstants.ROLES_GET_REQUEST };
	}
	function success(data) {
		return { type: userConstants.ROLES_GET_SUCCESS, data: data };
	}
	function failure(message) {
		
		var message = constants(message)
		return { type: userConstants.ROLES_GET_FAILURE, errorMessage: message };
	}
}


async function getCompanies(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`api/getAllCompanies`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				
				var error = constants("Error while fetching data")
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

	function request() {
		return { type: userConstants.COMPANIES_GET_REQUEST };
	}
	function success(data) {
		return { type: userConstants.COMPANIES_GET_SUCCESS, data: data };
	}
	function failure(message) {
		
		var message = constants(message)
		return { type: userConstants.COMPANIES_GET_FAILURE, errorMessage: message };
	}
}



function logout() {
	deleteLocalStorage();
	window.location = "#/login";
}

