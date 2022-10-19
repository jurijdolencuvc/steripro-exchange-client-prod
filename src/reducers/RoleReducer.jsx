
import { roleConstants } from "../constants/RoleConstants";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var prodCpy = {};

export const roleReducer = (state, action) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);
	switch (action.type) {

		case roleConstants.SHOW_ADD_ROLE_MODAL:

			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],


					showModal: true,
				},
			};

		case roleConstants.ROLE_REQUEST_REMOVE_REQUEST:
			
			return {
				...state,
				modalRequest: {
					showModal: true,
					file: action.oneFile,
					message: t("requestUsers"),
					title: "?",
					users: action.users.users,
					message2: t("areYouSureUsers")
				},
			};

		case roleConstants.HIDE_REQUEST_MODAL:
			return {
				...state,
				modalRequest: {
					showModal: false,
					file: null
				},
			};

		case roleConstants.HIDE_ADD_ROLE_MODAL:
			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],
					showModal: false,
				},
			};

			case roleConstants.ROLE_SUBMIT_REQUEST:

				return {
					...state,
					
				};
	
		case roleConstants.ROLE_SUBMIT_SUCCESS:

			return {
				...state,
				modal: {
					showModal: true,
					message: t("addRoleSuccess"),
					title: t("success")
				},
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],
					showModal: false,
				},
			};


		case roleConstants.ROLE_HIDE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: false,
					message: "",
					title: ""
				},
			};
		case roleConstants.ROLE_SUBMIT_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: action.error,
					title: t("error")
				},
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],
					showModal: false,
				},
			};


		case roleConstants.ROLES_GET_SUCCESS:
			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: action.data.roles,
					showModal: false,
				},
			};
		case roleConstants.ROLES_GET_FAILURE:
			return {
				...state,
				listRoles: {
					showError: true,
					errorMessage: t("addDocumentError"),
					roles: {

					},
					showModal: false,
				},
			};


		case roleConstants.ROLES_REMOVE_REQUEST:
			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],
					showModal: false,
				},
			};
		case roleConstants.ROLES_REMOVE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: t("removeRoleSuccess"),
					title: t("success")
				},

			};
		case roleConstants.ROLES_REMOVE_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: t("removeRoleError"),
					title: t("error")
				},
			};

			
			case roleConstants.ROLES_REMOVE_REQUEST_ARRAY:
				return {
					...state,
					modal: {
						showModal: true,
						message: t("requestUsers"),
						title: "?",
						users: action.users.users,
						message2: t("areYouSureUsers")
					},
				};

		default:
			return state;
	}
};
