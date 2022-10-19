import { userConstants } from "../constants/UserConstants";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
export const userReducer = (state, action) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);
	switch (action.type) {

		case userConstants.LOGIN_FAILURE:
			return {
				loginError: {
					showError: true,
					errorMessage: t("incorrectEmailAndPass"),
				},
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loginError: {
					showError: false,
					errorMessage: "",
				},
			};

		case userConstants.SEND_REGISTRATION_MAIL_FAILURE:

			return {
				sendRegistrationMailError: {
					showError: true,
					errorMessage: action.error,
				},
			};

		case userConstants.SEND_REGISTRATION_MAIL_SUCCESS:

			return {
				...state,
				sendRegistrationMailError: {
					showError: false,
					errorMessage: t("success"),
				},
			};

		case userConstants.SEND_RESET_PASSWORD_MAIL_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: t("error"),
				},
			};

		case userConstants.REGISTER_SUCCESS:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: t("registerSuccess"),
					title: t("success"),
				
				},
			};

		case userConstants.REGISTER_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: t("error"),
				},
			};

		case userConstants.HIDE_MODAL:

			return {
				...state,
				sendResetPasswordError: {
					showModal: false,
					message: "",
					title: ""
				},
			};


		case userConstants.SEND_RESET_PASSWORD_MAIL_SUCCESS:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: t("linkSuccess"),
					title: t("success"),
				},
			};


		case userConstants.PASSWORD_RESET_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: t("error"),
				},
			};


		case userConstants.CONTACT_SUCCESS:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: t("messageSuccess"),
					title: t("success"),
				},
			};


		case userConstants.CONTACT_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: t("messageError"),
					title: t("error"),
				},
			};

		case userConstants.HIDE_MODAL:

			return {
				...state,
				sendResetPasswordError: {
					showModal: false,
					message: "",
					title: ""
				},
			};


		case userConstants.PASSWORD_RESET_SUCCESS:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: t("passChangeSuccess"),
					title: t("success")
				},
			};


		case userConstants.ROLES_FAILURE:

			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: action.errorMessage,
					roles: [],
				},

			};

		case userConstants.ROLES_SUCCESS:

			var role = []
			action.roles.roles.forEach(element => {
				role.push(element.title.toString())
			});

			return {

				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: role,
				},

			};




		case userConstants.ROLES_GET_SUCCESS:

			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: action.data.roles,
					showModal: false,
				},
			};
		case userConstants.ROLES_GET_FAILURE:
			return {
				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: [],
					showModal: false,
				},
			};


		case userConstants.COMPANIES_GET_SUCCESS:

			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: action.data.companies,
					showModal: false,
				},
			};
		case userConstants.COMPANIES_GET_FAILURE:
			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],
					showModal: false,
				},
			};

		default:
			return state;
	}
};
