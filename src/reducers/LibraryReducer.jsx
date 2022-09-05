
import { libraryConstants } from "../constants/LibraryConstants";
import i18next from "i18next";
var prodCpy = {};

export const libraryReducer = (state, action) => {

	switch (action.type) {

		case libraryConstants.SHOW_ADD_LIBRARY_MODAL:

			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					libraries: [],


					showModal: true,
				},
			};

			case libraryConstants.DISTRIBUTORS_GET_SUCCESS:

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
			case libraryConstants.DISTRIBUTORS_GET_FAILURE:
				return {
					...state,
					listDistributors: {
						showError: false,
						errorMessage: "",
						distributors: [],
						showModal: false,
					},
				};
		case libraryConstants.LIBRARY_REQUEST_REMOVE_REQUEST:
			return {
				...state,
				modalRequest: {
					showModal: true,
					file: action.oneFile
				},
			};

		case libraryConstants.HIDE_REQUEST_MODAL:
			return {
				...state,
				modalRequest: {
					showModal: false,
					file: null
				},
			};

		case libraryConstants.HIDE_ADD_LIBRARY_MODAL:
			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					libraries: [],


					showModal: false,
				},
			};


		case libraryConstants.SHOW_EDIT_LIBRARY_MODAL:

			prodCpy = { ...state };

			prodCpy.updateData.data.library = {};
			prodCpy.updateData.data.library.id = action.data._id;
			prodCpy.updateData.data.library.documentTitle = action.data.documentTitle;
			prodCpy.updateData.data.library.documentDescription = action.data.documentDescription;
			prodCpy.updateData.data.library.lastAccess = action.data.lastAccess;
			prodCpy.updateData.data.library.document = action.data.document;
			prodCpy.updateData.data.library.read = action.data.read;
			prodCpy.updateData.data.library.companyId = action.data.companyId;
			prodCpy.updateData.data.library.category = action.data.category;


			console.log(prodCpy.updateData.data.library)

			prodCpy.updateData.showModal = true;
			return prodCpy;




		case libraryConstants.HIDE_EDIT_LIBRARY_MODAL:
			return {
				...state,
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						library: {
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



		case libraryConstants.LIBRARY_SUBMIT_SUCCESS:

			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("addLibrarySuccess"),
					title: i18next.t("success")
				},
				listFiles: {
					showError: false,
					errorMessage: "",
					libraries: [],
					showModal: false,
				},
			};


		case libraryConstants.LIBRARY_HIDE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: false,
					message: "",
					title: ""
				},
			};
		case libraryConstants.LIBRARY_SUBMIT_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: action.error,
					title: i18next.t("success")
				},
				listFiles: {
					showError: false,
					errorMessage: "",
					libraries: [],
					showModal: false,
				},
			};


		case libraryConstants.LIBRARY_GET_SUCCESS:

			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					libraries: action.data.results,

					showModal: false,
				},
			};
		case libraryConstants.LIBRARY_GET_FAILURE:
			return {
				...state,
				listFiles: {
					showError: true,
					errorMessage: i18next.t("addDocumentError"),
					libraries: {

						documentId: "",
						about: "",
						read: "",
						lastAccess: "",
					},


					showModal: false,
				},
			};


		case libraryConstants.CATEGORIES_LIBRARY_GET_SUCCESS:

			return {
				...state,
				listCategories: {
					showError: false,
					errorMessage: "",
					categories: action.data.results,
					showModal: false,
				},
			};
		case libraryConstants.CATEGORIES_LIBRARY_GET_FAILURE:
			return {
				...state,
				listCategories: {
					showError: false,
					errorMessage: "",
					categories: [],
					showModal: false,
				},
			};
		case libraryConstants.LIBRARY_REMOVE_REQUEST:
			return {
				...state,
				listFiles: {
					showError: false,
					errorMessage: "",
					documents: [],
					showModal: false,
				},
			};
		case libraryConstants.LIBRARY_REMOVE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message:i18next.t("removeLibrarySuccess"),
					title: i18next.t("success")
				},

			};
		case libraryConstants.LIBRARY_REMOVE_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("removeLibraryError"),
					title: i18next.t("error")
				},
			};



		case libraryConstants.LIBRARY_SET_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("updateLibrarySuccess"),
					title:  i18next.t("success")
				},
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						library: {
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



		case libraryConstants.LIBRARY_SET_FAILURE:

			return {
				...state,
				modal: {
					showModal: true,
					message:  i18next.t("updateLibraryError"),
					title: i18next.t("error")
				},
				updateData: {
					showModal: false,
					showErrorMessage: false,
					errorMessage: "",
					data: {
						library: {
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
