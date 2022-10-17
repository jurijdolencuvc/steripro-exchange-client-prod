import React, { createContext, useReducer } from "react";
import { taskReducer } from "../reducers/TaskReducer";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {

	const [taskState, dispatch] = useReducer(taskReducer, {

		listTasks: {
			showError: false,
			errorMessage: "",
			tasks: [],
		},
		modal: {
			showModal: false,
			message: "",
			title: ""
		},
		
		
	});

	return <TaskContext.Provider value={{ taskState, dispatch }}>{props.children}</TaskContext.Provider>;
};

export default TaskContextProvider;
