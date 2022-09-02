import React, { createContext, useReducer } from "react";
import { libraryReducer } from "../reducers/LibraryReducer";

export const LibraryContext = createContext();

const LibraryContextProvider = (props) => {

	const [libraryState, dispatch] = useReducer(libraryReducer, {

		listLibrary: {
			showError: false,
			errorMessage: "",
			libraryInfo: [],
		},

		listFiles: {
			showError: false,
			errorMessage: "",
			libraries: [],
			showModal: false,
		},

		listCategories: {
			showError: false,
			errorMessage: "",
			categories: [],
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
				library: {
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

	return <LibraryContext.Provider value={{ libraryState, dispatch }}>{props.children}</LibraryContext.Provider>;
};

export default LibraryContextProvider;
