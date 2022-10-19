import Axios from "axios";
import { roleConstants } from "../constants/RoleConstants";
import { constants } from "../consts/consts";
import { authHeader } from "../helpers/auth-header";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const roleService = {
	getRoles,
	deleteRole,
	add,
	remove
};


async function deleteRole(documentId,dispatch) {
	dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/checkUsersOfRole/${documentId}`, {
		headers: {
		  Authorization: token 
		}}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			}else if(res.status === 201) {
				dispatch(successArray(res.data));
			}else{

				var error = constants("Error while fetching data")
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

		function request() {

			return { type: roleConstants.ROLES_REMOVE_REQUEST };
		}
		function successArray(data) {
			return{
				type: roleConstants.ROLE_REQUEST_REMOVE_REQUEST,
				oneFile: documentId,
				users: data
			  };
		}

		function success(data) {
			return{
				type: roleConstants.ROLE_REQUEST_REMOVE_REQUEST,
				oneFile: documentId,users: data
			  };

		}
		function failure(message) {
		
			var message = constants(message)
			return { type: roleConstants.ROLES_REMOVE_FAILURE, errorMessage : message };
		}
};


async function remove(documentId,dispatch) {
	dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/deleteRole/${documentId}`, {
		headers: {
		  Authorization: token 
		}}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			}else{

				var error = constants("Error while fetching data")
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

		function request() {

			return { type: roleConstants.ROLES_REMOVE_REQUEST };
		}
		function success(data) {
			return{
				type: roleConstants.ROLES_REMOVE_SUCCESS
			  };
		}

	
		function failure(message) {
		
			var message = constants(message)
			return { type: roleConstants.ROLES_REMOVE_FAILURE, errorMessage : message };
		}
};


function add(roleTitle, dispatch) {
	dispatch(request());
	var token = authHeader()
	Axios.get(`${url}api/role/${roleTitle}`, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{	
			
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
			})

	function request() {
		
		return { type: roleConstants.ROLE_SUBMIT_REQUEST };
	}
	function success() {
		return { type: roleConstants.ROLE_SUBMIT_SUCCESS };
	}
	function failure(error) {
		
		var error = constants(error)
		return { type: roleConstants.ROLE_SUBMIT_FAILURE, error };
	}
}


async function getRoles(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/roles`, { headers: { Authorization: token }}, { validateStatus: () => true })
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
		return { type: roleConstants.ROLES_GET_REQUEST };
	}
	function success(data) {
		return { type: roleConstants.ROLES_GET_SUCCESS, data: data };
	}
	function failure(message) {

		var message = constants(message)
		return { type: roleConstants.ROLES_GET_FAILURE, errorMessage: message };
	}
}



