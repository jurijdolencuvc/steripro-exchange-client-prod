import Axios from "axios";
import { deviceConstants } from "../constants/DeviceConstants";
import { deleteLocalStorage, setAuthInLocalStorage } from "../helpers/auth-header";
import { deviceReducer } from "../reducers/DeviceReducer";

import { authHeader } from "../helpers/auth-header";
export const deviceService = {
	getDevices,
	editDevice,
};

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"
async function getDevices(dispatch) {
	dispatch(request());

	var token = authHeader()
	
	await Axios.get(`${url}getDevices` , { headers: { Authorization: token }}, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
				dispatch(success(res.data));
			} else if(res.status === 401) {

				window.location = "#/login";

			}else{
				dispatch(failure("Error while fetching data"));
			}
		})
		.catch((err) => {
			console.log(err);
			dispatch(failure("Error"));
		});

	function request() {
		return { type: deviceConstants.SET_DEVICES_REQUEST };
	}
	function success(data) {
		return { type: deviceConstants.SET_DEVICES_SUCCESS, data: data.data };
	}
	function failure(message) {
		return { type: deviceConstants.SET_DEVICES_FAILURE, errorMessage: message };
	}
}


function editDevice(data, dispatch) {
	
	var token = authHeader()
	dispatch(request());
	Axios.post(`${url}editDevice`, data, {
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
			console.log(err)
		})

		function request() {
			return { type: deviceConstants.DEVICE_SET_REQUEST };
		}
		function success(data) {
			return { type: deviceConstants.DEVICE_SET_SUCCESS };
		}
		function failure(message) {
			return { type: deviceConstants.DEVICE_SET_FAILURE, errorMessage: message };
		}
}
