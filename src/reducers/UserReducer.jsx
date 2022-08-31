import { userConstants } from "../constants/UserConstants";

export const userReducer = (state, action) => {
	switch (action.type) {

		case userConstants.LOGIN_FAILURE:
			return {
				loginError: {
					showError: true,
					errorMessage: "Sorry, your email or password was incorrect. Please try again.",
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
					errorMessage: "success",
				},
			};

		case userConstants.SEND_RESET_PASSWORD_MAIL_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: "Error"
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
					message: "You have successfully sent a link.",
					title: "Success"
				},
			};


			case userConstants.PASSWORD_RESET_FAILURE:

			return {
				...state,
				sendResetPasswordError: {
					showModal: true,
					message: action.error,
					title: "Error"
				},
			};


			case userConstants.CONTACT_SUCCESS:

				return {
					...state,
					sendResetPasswordError: {
						showModal: true,
						message: "You have successfully sent a message.",
						title: "Success"
					},
				};
	
	
				case userConstants.CONTACT_FAILURE:
	
				return {
					...state,
					sendResetPasswordError: {
						showModal: true,
						message: "Error while trying to send a message. Please try again.",
						title: "Error"
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
					message: "You have successfully changed the password.",
					title: "Success"
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
