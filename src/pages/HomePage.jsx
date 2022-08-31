
import { React, useEffect } from "react";

import TravelInformation from "../components/Devices/Devices";
import DeviceContextProvider from "../contexts/DeviceContext";

import EditDeviceModal from "../components/modals/EditDeviceModal";
import ModalDevice from "../components/modals/ModalDevice";
import { authHeader } from "../helpers/auth-header";

import Axios from "axios";

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"


const HomePage = () => {

	useEffect(() => {


		var token = authHeader()
		if (token == "null") {

			window.location = "#/login";
		} else {

			Axios.get(`${url}api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
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
				<TravelInformation />

				<EditDeviceModal />
			</DeviceContextProvider>
		</div>
	);
};

export default HomePage;

