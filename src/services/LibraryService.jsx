import Axios from "axios";
import { libraryConstants } from "../constants/LibraryConstants";
import { constants } from "../consts/consts";
import { authHeader } from "../helpers/auth-header";

var url = process.env.REACT_APP_URL;
export const libraryService = {
	addLibrary,
	getFileLibrary,
	deleteLibrary,
	editLibrary,
	getCategoriesLibrary,
	getDocumentsLibrary,
	getDistributors
};

async function getDistributors(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/getDistributors`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
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
		return { type: libraryConstants.DISTRIBUTORS_GET_REQUEST };
	}
	function success(data) {
		console.log("tuuu")
		return { type: libraryConstants.DISTRIBUTORS_GET_SUCCESS, data: data };
	}
	function failure(message) {
		
		var message = constants(message)
		return { type: libraryConstants.DISTRIBUTORS_GET_FAILURE, errorMessage: message };
	}
}


function addLibrary( tf, dispatch) {
	
	if(tf){
		dispatch(success());
			
	}else{
		dispatch(failure("Error while uploading library"));
	}
	
	function success() {
		
		return { type: libraryConstants.LIBRARY_SUBMIT_SUCCESS };
	}
	function failure(error) {
		var error = constants(error)
		return { type: libraryConstants.LIBRARY_SUBMIT_FAILURE, error };
	}
}



function editLibrary( data, dispatch) {
	

	var token = authHeader()
	
	dispatch(request());
	Axios.post(`${url}api/editFileLibrary`, data, {
		headers: {
		  Authorization: token 
		}})
		.then((res) => {
			if (res.status === 201) {
			
				//setAuthInLocalStorage(res.data);
				dispatch(success());
			
			}  else if (res.status === 412) {
				
				dispatch(failure(res.data.error));
			}else {
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
			dispatch(failure(error));
		})

		function request() {
			return { type: libraryConstants.LIBRARY_SET_REQUEST };
		}
		function success(data) {
			return { type: libraryConstants.LIBRARY_SET_SUCCESS, data: data };
		}
		function failure(message) {
			var message = constants(message)
			return { type: libraryConstants.LIBRARY_SET_FAILURE, errorMessage: message };
		}
}


async function deleteLibrary(documentId,dispatch) {

	dispatch(request());

	var token = authHeader()
	await Axios.delete(`api/deleteLibrary/${documentId}`, {
		headers: {
		  Authorization: token 
		}}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			}else {
				dispatch(failure("Error while fetching data"));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
			
		});

		function request() {

			return { type: libraryConstants.LIBRARY_REMOVE_REQUEST };
		}
		function success(data) {
			return { type: libraryConstants.LIBRARY_REMOVE_SUCCESS, documents: data };

		}
		function failure(message) {
			var message = constants(message)
			return { type: libraryConstants.LIBRARY_REMOVE_FAILURE, errorMessage : message };
		}
};


async function getDocumentsLibrary(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/all_library`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while fetching data"));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

	function request() {
		return { type: libraryConstants.LIBRARY_GET_REQUEST };
	}
	function success(data) {
		return { type: libraryConstants.LIBRARY_GET_SUCCESS, data: data };
	}
	function failure(message) {
		var message = constants(message)
		return { type: libraryConstants.LIBRARY_GET_FAILURE, errorMessage: message };
	}
}




async function getCategoriesLibrary(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/getCategoriesLibrary`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 201) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while getting categories"));
			}
		})
		.catch((err) => {	
			var error = constants("Unknown error, please try again later.")
		dispatch(failure(error));
		});

	function request() {
		return { type: libraryConstants.CATEGORIES_LIBRARY_GET_REQUEST };
	}
	function success(data) {
		return { type: libraryConstants.CATEGORIES_LIBRARY_GET_SUCCESS, data: data };
	}
	function failure(message) {
		var message = constants(message)
		return { type: libraryConstants.CATEGORIES_LIBRARY_GET_FAILURE, errorMessage: message };
	}
}




async function getFileLibrary(_id, fileName, dispatch) {

	console.log(fileName + " " + _id)
	var list = fileName.split('/')
	const FileDownload = require("js-file-download");

	await Axios.get(`${url}api/getFileLibrary/ `+_id, { validateStatus: () => true,  responseType: 'blob'})
		.then((res) => {
			if (res.status === 201) {
				FileDownload(res.data, fileName);
				window.location.reload(true);
			}
		})
		.catch((err) => {
			console.log(err);

		});

}




