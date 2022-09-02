import Axios from "axios";
import { documentsConstants } from "../constants/DocumentsConstants";

import { authHeader } from "../helpers/auth-header";
export const documentService = {
	addDocument,
	getDocuments,
	getFile,
	deleteDocument,
	editDocument,
	getCategories,
	getCategoriesLibrary,
	getDocumentsLibrary
};

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"
function addDocument( formData, dispatch) {
	
	console.log(formData)
	var token = authHeader()

	
	dispatch(request());
	Axios.post(`${url}uploadfile`, formData, {
		headers: {
		  "Content-Type": "multipart/form-data",Authorization: token 
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
			dispatch(failure("error"));
			console.log(err)
		})

	function request() {
		return { type: documentsConstants.DOCUMENTS_SUBMIT_REQUEST };
	}
	function success() {
		console.log("ckkcuk")
		return { type: documentsConstants.DOCUMENTS_SUBMIT_SUCCESS };
	}
	function failure(error) {
		console.log(error)
		return { type: documentsConstants.DOCUMENTS_SUBMIT_FAILURE, error };
	}
}



function editDocument( data, dispatch) {
	

	var token = authHeader()
	
	dispatch(request());
	Axios.post(`${url}editFile`, data, {
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
			console.log(err)
		})

		function request() {
			return { type: documentsConstants.DOCUMENT_SET_REQUEST };
		}
		function success(data) {
			return { type: documentsConstants.DOCUMENT_SET_SUCCESS, data: data };
		}
		function failure(message) {
			return { type: documentsConstants.DOCUMENT_SET_FAILURE, errorMessage: message };
		}
}





async function deleteDocument(documentId,dispatch) {

	dispatch(request());

	var token = authHeader()
	await Axios.delete(`${url}api/deleteDocument/${documentId}`, {
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
			dispatch(failure("Error"));
			console.log(err);
		});

		function request() {

			return { type: documentsConstants.DOCUMENT_REMOVE_REQUEST };
		}
		function success(data) {
			return { type: documentsConstants.DOCUMENT_REMOVE_SUCCESS, documents: data };

		}
		function failure(message) {
		
			return { type: documentsConstants.DOCUMENT_REMOVE_FAILURE, errorMessage : message };
		}
};


async function getDocuments(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/all_documents`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while fetching data"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: documentsConstants.DOCUMENTS_GET_REQUEST };
	}
	function success(data) {
		return { type: documentsConstants.DOCUMENTS_GET_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: documentsConstants.DOCUMENTS_GET_FAILURE, errorMessage: message };
	}
}



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
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: documentsConstants.LIBRARY_GET_REQUEST };
	}
	function success(data) {
		return { type: documentsConstants.LIBRARY_GET_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: documentsConstants.LIBRARY_GET_FAILURE, errorMessage: message };
	}
}




async function getCategories(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/getCategories`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while getting categories"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: documentsConstants.CATEGORIES_GET_REQUEST };
	}
	function success(data) {
		return { type: documentsConstants.CATEGORIES_GET_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: documentsConstants.CATEGORIES_GET_FAILURE, errorMessage: message };
	}
}



async function getCategoriesLibrary(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}api/getCategoriesLibrary`, { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				dispatch(failure("Error while getting categories"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: documentsConstants.CATEGORIES_LIBRARY_GET_REQUEST };
	}
	function success(data) {
		return { type: documentsConstants.CATEGORIES_LIBRARY_GET_SUCCESS, data: data };
	}
	function failure(message) {
		return { type: documentsConstants.CATEGORIES_LIBRARY_GET_FAILURE, errorMessage: message };
	}
}




async function getFile(_id, fileName, dispatch) {


	console.log(fileName + " " + _id)
	var list = fileName.split('/')
	const FileDownload = require("js-file-download");

	await Axios.get(`${url}api/getFile/ `+_id, { validateStatus: () => true,  responseType: 'blob'})
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




