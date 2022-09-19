import Axios from "axios";
import { deviceConstants } from "../constants/DeviceConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import { deviceReducer } from "../reducers/DeviceReducer";
import { constants } from "../consts/consts";
import { authHeader } from "../helpers/auth-header";
export const deviceService = {
	getDevices,
	editDevice,
};

var url = process.env.URL;
async function getDevices(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`getDevices` , { headers: { Authorization: token }}, { validateStatus: () => true })
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
		return { type: deviceConstants.SET_DEVICES_REQUEST };
	}
	function success(data) {
		return { type: deviceConstants.SET_DEVICES_SUCCESS, data: data.data };
	}
	function failure(message) {
		var message = constants(message)
		return { type: deviceConstants.SET_DEVICES_FAILURE, errorMessage: message };
	}
}


function editDevice(data, dispatch) {
	
	var token = authHeader()
	dispatch(request());
	Axios.post(`editDevice`, data, {
		headers: {
		  Authorization: token 
	}})
		.then((res) => {
			if (res.status === 201) {
				dispatch(success());
			
			}  else if (res.status === 412) {
				
				dispatch(failure(res.data.error));
			}else {
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) => {
			var error = constants("Unknown error, please try again later.")
				dispatch(failure(error));
		})

		function request() {
			return { type: deviceConstants.DEVICE_SET_REQUEST };
		}
		function success(data) {
			return { type: deviceConstants.DEVICE_SET_SUCCESS };
		}
		function failure(message) {
			var message = constants(message)
			return { type: deviceConstants.DEVICE_SET_FAILURE, errorMessage: message };
		}
}
