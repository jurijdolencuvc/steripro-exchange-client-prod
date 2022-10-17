import Axios from "axios";
import { taskConstants } from "../constants/TaskConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import { taskReducer } from "../reducers/TaskReducer";
import { constants } from "../consts/consts";
import { authHeader } from "../helpers/auth-header";
export const taskService = {
	getTasks,
};

var url = process.env.REACT_APP_URL;
async function getTasks(dispatch) {
	dispatch(request());

	var token = authHeader()
	await Axios.get(`${url}api/all_tasks` , { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
				dispatch(success(res.data));
			} else if(res.status === 401) {

				window.location = "#/login";

			}else{
				var error = constants("Error while fetching data")
				dispatch(failure(error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		});

	function request() {
		return { type: taskConstants.SET_TASK_REQUEST };
	}
	function success(data) {
		return { type: taskConstants.SET_TASK_SUCCESS, data: data.results };
	}
	function failure(message) {
		var message = constants(message)
		return { type: taskConstants.SET_TASK_FAILURE, errorMessage: message };
	}
}


