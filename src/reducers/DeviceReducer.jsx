import { deviceConstants } from "../constants/DeviceConstants";
import i18next from "i18next";
var prodCpy = {};
export const deviceReducer = (state, action) => {

	switch (action.type) {

		case deviceConstants.SET_DEVICES_REQUEST:
			return {
				...state,
				listDevices: {
					showError: false,
					errorMessage: "",
					devices: [],
				},
			};

		case deviceConstants.SET_DEVICES_FAILURE:
			return {
				...state,
				listDevices: {
					showError: true,
					errorMessage: i18next.t("error"),
					devices: [],
				},
			};

		case deviceConstants.SET_DEVICES_SUCCESS:

			return {
				...state,
				listDevices: {
					showError: false,
					errorMessage: "",
					devices: action.data,
				},
			};

			

			case deviceConstants.SHOW_EDIT_DEVICE_MODAL:
				prodCpy = { ...state };
				
					prodCpy.updateData.data.device = {};
					prodCpy.updateData.data.device.id =  action.data._id;
					prodCpy.updateData.data.device.deployDate =  action.data.deployDate;
					prodCpy.updateData.data.device.lastRegularServiceDate =  action.data.lastRegularServiceDate;
					
				
				
					console.log(prodCpy.updateData.data.device)
	
				prodCpy.updateData.showModal = true;
				return prodCpy;
			
			
	
				case deviceConstants.DOCUMENT_HIDE_MODAL:
					return {
						...state,
						modal: {
							showModal: false,
							message: "",
							title: ""
						},
					};

		case deviceConstants.HIDE_EDIT_DEVICE_MODAL:
			return {
				...state,
				updateData: {
					showModal: false,
					
				},
			};

	
			case deviceConstants.DEVICE_SET_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("successUpdateDevice"),
					title: i18next.t("success")
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
			};



		case deviceConstants.DEVICE_SET_FAILURE:
			
			return {
				...state,
				modal: {
					showModal: true,
					message: i18next.t("editDeviceError"),
					title: i18next.t("error")
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
			
			};

		default:
			return state;
	}
};
