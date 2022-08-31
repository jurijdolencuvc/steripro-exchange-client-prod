import React, { createContext, useReducer } from "react";
import { deviceReducer } from "../reducers/DeviceReducer";

export const DeviceContext = createContext();

const DeviceContextProvider = (props) => {

	const [deviceState, dispatch] = useReducer(deviceReducer, {

		listDevices: {
			showError: false,
			errorMessage: "",
			devices: [],
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
				device: {
					id: "",
					idField: "",
					app_version: "",
					status: "",
					createTime: "",
					updateTime: "",
					deployDate: null,
					lastRegularServiceDate: null,
					name: "",
					tabletIdentifier: "",
					serialNumber: "",
					app_id: "",
					customer_id: "",
					customerName: "",
					distributor_id: "",
					distributorName: "",
					serviceTime: "",
					distributor: "",
					customer: "",
					hasDisinfections: true,
					extract_allowed: false,
					demo_device: "",
					notificationEmails: [],
					disinfectionsAverageCount: 0,
					disinfectionsAverageDuration: 0,
					disinfectionsLastMonth: 0,
					disinfectionsTotalCount: 0,
				},
			

			},
		},
		
	});

	return <DeviceContext.Provider value={{ deviceState, dispatch }}>{props.children}</DeviceContext.Provider>;
};

export default DeviceContextProvider;
