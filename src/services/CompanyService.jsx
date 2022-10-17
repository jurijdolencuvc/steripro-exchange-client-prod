import Axios from "axios";
import { companyConstants } from "../constants/CompanyConstants";
import { constants } from "../consts/consts";
import { authHeader } from "../helpers/auth-header";

var url = process.env.REACT_APP_URL;

export const companyService = {
	getCompanies,
	deleteCompany,
	add,
	remove
};


async function deleteCompany(id,dispatch) {
	dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/checkCompanies/${id}`, {
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

			return { type: companyConstants.COMPANIES_REMOVE_REQUEST };
		}
		function successArray(data) {
			return{
				type: companyConstants.COMPANY_REQUEST_REMOVE_REQUEST,
				oneFile: id,
				users: data
			  };

			//return { type: roleConstants.ROLES_REMOVE_SUCCESS, users: data };

		}

		function success(data) {
			return{
				type: companyConstants.COMPANY_REQUEST_REMOVE_REQUEST,
				oneFile: id,users: data
			  };

		}
		function failure(message) {
		
			var message = constants(message)
			return { type: companyConstants.COMPANIES_REMOVE_FAILURE, errorMessage : message };
		}
};


async function remove(documentId,dispatch) {
	dispatch(request());
	var token = authHeader()
	await Axios.get(`${url}api/deleteCompany/${documentId}`, {
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

			return { type: companyConstants.COMPANIES_REMOVE_REQUEST };
		}
		function success(data) {
			return{
				type: companyConstants.COMPANIES_REMOVE_SUCCESS
			  };

			//return { type: roleConstants.ROLES_REMOVE_SUCCESS, users: data };

		}

	
		function failure(message) {
		
			var message = constants(message)
			return { type: companyConstants.COMPANIES_REMOVE_FAILURE, errorMessage : message };
		}
};


function add(companyName, dispatch) {
	dispatch(request());
	var token = authHeader()
	Axios.get(`${url}api/company/${companyName}`, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 215) {
				console.log(res.data.response)
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
		
		return { type: companyConstants.COMPANY_SUBMIT_REQUEST };
	}
	function success() {
		return { type: companyConstants.COMPANY_SUBMIT_SUCCESS };
	}
	function failure(error) {
		
		var error = constants(error)
		return { type: companyConstants.COMPANY_SUBMIT_FAILURE, error };
	}
}


async function getCompanies(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/getAllCompanies`, { headers: { Authorization: token }}, { validateStatus: () => true })
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
		return { type: companyConstants.COMPANIES_GET_REQUEST };
	}
	function success(data) {
		return { type: companyConstants.COMPANIES_GET_SUCCESS, data: data };
	}
	function failure(message) {

		var message = constants(message)
		return { type: companyConstants.COMPANIES_GET_FAILURE, errorMessage: message };
	}
}



