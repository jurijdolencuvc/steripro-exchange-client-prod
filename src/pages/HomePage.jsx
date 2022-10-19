
import { React, useEffect } from "react";

import Tasks from "../components/Tasks/Tasks";
import TaskContextProvider from "../contexts/TaskContext";
import { authHeader } from "../helpers/auth-header";

import Axios from "axios";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";


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
			<TaskContextProvider>
				<Tasks />
			</TaskContextProvider>
		</div>
	);
};

export default HomePage;

