import { userConstants } from "../constants/UserConstants";
import i18next from "i18next";
export const userReducer = (state, action) => {
	switch (action.type) {

		case userConstants.LOGIN_FAILURE:
			return {
				loginError: {
					showError: true,
					errorMessage:  i18next.t("incorrectEmailAndPass"),
				},
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loginError: {
					showError: false,
					errorMessage: "",
				},
			};

		case userConstants.REGISTER_FAILURE:
			return {
				registerError: {
					showError: true,
					errorMessage: action.error,
				},
			};

		case userConstants.REGISTER_SUCCESS:
			return {
				registerError: {
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
					errorMessage: i18next.t("success"),
				},
			};

		case userConstants.SEND_RESET_PASSWORD_MAIL_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: i18next.t("error"),
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
					message: i18next.t("linkSuccess"),
					title: i18next.t("success"),
				},
			};


			case userConstants.PASSWORD_RESET_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: i18next.t("error"),
				},
			};


			case userConstants.CONTACT_SUCCESS:

				return {
					...state,
					sendResetPasswordError: {
						showModal: true,
						message: i18next.t("messageSuccess"),
						title: i18next.t("success"),
					},
				};
	
	
				case userConstants.CONTACT_FAILURE:
	
				return {
					...state,
					sendResetPasswordError: {
						showModal: true,
						message: i18next.t("messageError"),
						title:  i18next.t("error"),
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
					message: i18next.t("passChangeSuccess"),
					title: i18next.t("success")
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
			console.log(role)

			return {

				...state,
				listRoles: {
					showError: false,
					errorMessage: "",
					roles: role,
				},

			};
		default:
			return state;
	}
};
