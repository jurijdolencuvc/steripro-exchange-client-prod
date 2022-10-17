import { taskConstants } from "../constants/TaskConstants";
import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

var prodCpy = {};
export const taskReducer = (state, action) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
	switch (action.type) {

		case taskConstants.SET_TASK_REQUEST:
			return {
				...state,
				listTasks: {
					showError: false,
					errorMessage: "",
					tasks: [],
				},
			};

		case taskConstants.SET_TASK_FAILURE:
			return {
				...state,
				listTasks: {
					showError: true,
					errorMessage: t("error"),
					tasks: [],
				},
			};

		case taskConstants.SET_TASK_SUCCESS:

			return {
				...state,
				listTasks: {
					showError: false,
					errorMessage: "",
					tasks: action.data,
				},
			};

			
		default:
			return state;
	}
};
