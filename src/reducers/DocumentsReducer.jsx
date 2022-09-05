
import { documentsConstants } from "../constants/DocumentsConstants";
import i18next from "i18next";
var prodCpy = {};

export const documentsReducer = (state, action) => {

	switch (action.type) {

		case documentsConstants.SHOW_ADD_DOCUMENT_MODAL:

			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					documents: [],


					showModal: true,
				},
			};

			case documentsConstants.DOCUMENTS_REQUEST_REMOVE_REQUEST:
				return {
					...state,
					modalRequest: {
						showModal: true,
						file: action.oneFile
					},
				};
	
			case documentsConstants.HIDE_REQUEST_MODAL:
				return {
					...state,
					modalRequest: {
						showModal: false,
						file: null
					},
				};

		case documentsConstants.HIDE_ADD_DOCUMENT_MODAL:
			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					documents: [],


					showModal: false,
				},
			};


			case documentsConstants.SHOW_EDIT_DOCUMENT_MODAL:
				prodCpy = { ...state };
				
					prodCpy.updateData.data.document = {};
					prodCpy.updateData.data.document.id =  action.data._id;
					prodCpy.updateData.data.document.documentTitle = action.data.documentTitle;
					prodCpy.updateData.data.document.documentDescription = action.data.documentDescription;
					prodCpy.updateData.data.document.lastAccess =  action.data.lastAccess;
					prodCpy.updateData.data.document.document = action.data.document;
					prodCpy.updateData.data.document.read = action.data.read;
					prodCpy.updateData.data.document.companyId = action.data.companyId;
					prodCpy.updateData.data.document.category = action.data.category;
				
				
					console.log(prodCpy.updateData.data.document)
	
				prodCpy.updateData.showModal = true;
				return prodCpy;
			
			


		case documentsConstants.HIDE_EDIT_DOCUMENT_MODAL:
			return {
				...state,
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						document: {
							id: "",
							documentTitle: "",
							documentDescription: "",
							lastAccess: "",
							document: null,
							read: 0,
							companyId: "",
						},
					
		
					},
				},
			};



		case documentsConstants.DOCUMENTS_SUBMIT_SUCCESS:
			
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("addDocumentSuccess"),
					title: i18next.t("success")
				},
				listFiles: {
					showError: false,
					errorMessage: "",
					documents: [],
					showModal: false,
				},
			};

			
		case documentsConstants.DOCUMENT_HIDE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: false,
					message: "",
					title: ""
				},
			};
		case documentsConstants.DOCUMENTS_SUBMIT_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: action.error,
					title: i18next.t("error")
				},
				listFiles: {
					showError: false,
					errorMessage: "",
					documents: [],
					showModal: false,
				},
			};


			case documentsConstants.DOCUMENTS_GET_SUCCESS:

				return {
					...state,
					listFiles: {
						showError: false,
						errorMessage: "",
						documents: action.data.results,
	
						showModal: false,
					},
				};
			case documentsConstants.DOCUMENTS_GET_FAILURE:
				return {
					...state,
					listFiles: {
						showError: true,
						errorMessage: i18next.t("addDocumentError") ,
						documents: {
	
							documentId: "",
							about: "",
							read: "",
							lastAccess: "",
						},
	
	
						showModal: false,
					},
				};

				
			case documentsConstants.CATEGORIES_GET_SUCCESS:

				return {
					...state,
					listCategories: {
						showError: false,
						errorMessage: "",
						categories: action.data.results,
						showModal: false,
					},
				};
			case documentsConstants.CATEGORIES_GET_FAILURE:
				return {
					...state,
					listCategories: {
						showError: false,
						errorMessage: "",
						categories: [],
						showModal: false,
					},
				};

				case documentsConstants.DISTRIBUTORS_GET_SUCCESS:

				console.log("aaaaaaa"+ action.data)
				return {
					...state,
					listDistributors: {
						showError: false,
						errorMessage: "",
						distributors: action.data.result,
						showModal: false,
					},
				};
			case documentsConstants.DISTRIBUTORS_GET_FAILURE:
				return {
					...state,
					listDistributors: {
						showError: false,
						errorMessage: "",
						distributors: [],
						showModal: false,
					},
				};
				case documentsConstants.DOCUMENT_REMOVE_REQUEST:
					return {
						...state,
						listFiles: {
							showError: false,
						errorMessage: "",
						documents: [],
						showModal: false,
						},
					};
				case documentsConstants.DOCUMENT_REMOVE_SUCCESS:
					return {
						...state,
						modal: {
							showModal: true,
							message: i18next.t("removeDocumentSuccess"),
							title: i18next.t("success")
						},
						
					};
				case documentsConstants.DOCUMENT_REMOVE_FAILURE:
					return {
						...state,
						modal: {
							showModal: true,
							message: i18next.t("removeDocumentError"),
							title: i18next.t("error")
						},
					};	

					

		case documentsConstants.DOCUMENT_SET_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("updateDocumentSuccess"),
					title: i18next.t("success")
				},
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						document: {
							id: "",
							documentTitle: "",
							documentDescription: "",
							lastAccess: "",
							document: null,
							read: 0,
							companyId: "",
						},
					
		
					},
				},
			};



		case documentsConstants.DOCUMENT_SET_FAILURE:
			
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("updateDocumentError"),
					title:i18next.t("error") 
				},
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						document: {
							id: "",
							documentTitle: "",
							documentDescription: "",
							lastAccess: "",
							document: null,
							read: 0,
							companyId: "",
						},
					
		
					},
				},
			
			};


		default:
			return state;
	}
};
