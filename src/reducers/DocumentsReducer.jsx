import { modalConstants } from "../constants/ModalConstants";
import { documentsConstants } from "../constants/DocumentsConstants";

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
					message: "You have successfully added new document",
					title: "SUCCESS"
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
					title: "Error"
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
						errorMessage: "Error while adding new document",
						documents: {
	
							documentId: "",
							about: "",
							read: "",
							lastAccess: "",
						},
	
	
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
							message: "You have successfully removed document",
							title: "Success"
						},
						
					};
				case documentsConstants.DOCUMENT_REMOVE_FAILURE:
					return {
						...state,
						modal: {
							showModal: true,
							message: "There was an error while deleting the document",
							title: "Error"
						},
					};	

					

		case documentsConstants.DOCUMENT_SET_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: "You have successfully updated the document",
					title: "Success"
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
					message: "There has been an error while editing the document. Try again later.",
					title: "Error"
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
