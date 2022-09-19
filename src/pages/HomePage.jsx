
import { React, useEffect } from "react";

import Devices from "../components/Devices/Devices";
import DeviceContextProvider from "../contexts/DeviceContext";

import EditDeviceModal from "../components/modals/EditDeviceModal";
import ModalDevice from "../components/modals/ModalDevice";
import { authHeader } from "../helpers/auth-header";

import Axios from "axios";
var url = process.env.REACT_APP_URL;


const HomePage = () => {

	useEffect(() => {


		var token = authHeader()
		if (token == "null") {

			window.location = "#/login";
		} else {

			Axios.get(`api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Admin" == res.data || "Distributor" == res.data || "User" == res.data) {
						}
						else {
							window.location = "#/login";
						}
					} else {
						window.location = "#/login";
					}
				})
				.catch((err) => {
					window.location = "#/login";
				})
		}

	});

	return (
		<div>
			<DeviceContextProvider>
				<ModalDevice />
				<Devices />

				<EditDeviceModal />
			</DeviceContextProvider>
		</div>
	);
};

export default HomePage;

