
import { companyConstants } from "../constants/CompanyConstants";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var prodCpy = {};

export const companyReducer = (state, action) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);
	switch (action.type) {

		case companyConstants.SHOW_ADD_COMPANY_MODAL:

			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],


					showModal: true,
				},
			};

		case companyConstants.COMPANY_REQUEST_REMOVE_REQUEST:

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

		case companyConstants.HIDE_REQUEST_MODAL:
			return {
				...state,
				modalRequest: {
					showModal: false,
					file: null
				},
			};

		case companyConstants.HIDE_ADD_COMPANY_MODAL:
			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],


					showModal: false,
				},
			};



		case companyConstants.COMPANY_SUBMIT_REQUEST:

			return {
				...state,

			};

		case companyConstants.COMPANY_SUBMIT_SUCCESS:

			return {
				...state,
				modal: {
					showModal: true,
					message: t("addCompanySuccess"),
					title: t("success")
				},
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],
					showModal: false,
				},
			};


		case companyConstants.COMPANY_HIDE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: false,
					message: "",
					title: ""
				},
			};
		case companyConstants.COMPANY_SUBMIT_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: action.error,
					title: t("error")
				},
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],
					showModal: false,
				},
			};


		case companyConstants.COMPANIES_GET_SUCCESS:

			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: action.data.companies,
					showModal: false,
				},
			};
		case companyConstants.COMPANIES_GET_FAILURE:
			return {
				...state,
				listCompanies: {
					showError: true,
					errorMessage: t("addDocumentError"),
					companies: {

					},


					showModal: false,
				},
			};


		case companyConstants.COMPANIES_REMOVE_REQUEST:
			return {
				...state,
				listCompanies: {
					showError: false,
					errorMessage: "",
					companies: [],
					showModal: false,
				},
			};
		case companyConstants.COMPANIES_REMOVE_SUCCESS:
			return {
				...state,
				modal: {
					showModal: true,
					message: t("removeCompanySuccess"),
					title: t("success")
				},

			};
		case companyConstants.COMPANIES_REMOVE_FAILURE:
			return {
				...state,
				modal: {
					showModal: true,
					message: t("removeCompanyError"),
					title: t("error")
				},
			};


		case companyConstants.COMPANIES_REMOVE_REQUEST_ARRAY:
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
