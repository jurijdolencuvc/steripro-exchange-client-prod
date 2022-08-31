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

		
		modal: {
			showModal: false,
			message: "",
			title: ""
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
	});

	return <DocumentsContext.Provider value={{ documentsState, dispatch }}>{props.children}</DocumentsContext.Provider>;
};

export default DocumentsContextProvider;
