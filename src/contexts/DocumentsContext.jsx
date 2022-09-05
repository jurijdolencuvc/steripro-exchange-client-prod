import React, { createContext, useReducer } from "react";
import { documentsReducer } from "../reducers/DocumentsReducer";

export const DocumentsContext = createContext();

const DocumentsContextProvider = (props) => {

	const [documentsState, dispatch] = useReducer(documentsReducer, {

		listDocuments: {
			showError: false,
			errorMessage: "",
			documentsInfo: [],
		},

		listFiles: {
			showError: false,
			errorMessage: "",
			documents: [],
			showModal: false,
		},

		listCategories: {
			showError: false,
			errorMessage: "",
			categories: [],
			showModal: false,
		},

		listDistributors: {
			showError: false,
			errorMessage: "",
			distributors: [],
			showModal: false,
		},

		modal: {
			showModal: false,
			message: "",
			title: ""
		},
		
		modalRequest: {
			showModal: false,
			file: null
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
					category: "",
				},
			

			},
		},
	});

	return <DocumentsContext.Provider value={{ documentsState, dispatch }}>{props.children}</DocumentsContext.Provider>;
};

export default DocumentsContextProvider;
