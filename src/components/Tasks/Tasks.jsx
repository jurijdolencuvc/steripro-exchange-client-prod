import { useContext, useState, useEffect,useRef, React } from "react";
import TaskInfo from "./TaskInfo";
import { TaskContext } from "../../contexts/TaskContext";
import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";

import { LocaleContext } from "../../contexts/locale.context.js";
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

var url = process.env.REACT_APP_URL;
const Tasks = () => {
    var t = (s) => {

        let langCode = localStorage.getItem("language") || "en";
        
		return translations[langCode][s] || s;
	
	}
	

	t = t.bind(this);


    const { taskState, dispatch } = useContext(TaskContext);

   
	const [role, setRole] = useState(false);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);


    useEffect(() => {
          

       var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`${url}api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 201) {
						if ("Admin" == res.data) {

              setRole(true)
						}
					} 
				})
				.catch((err) => {
					
				})
		}
       
      }, [dispatch]);
    
    const childRef = useRef();
    return (
        <div >

            <div >

            <div style={{ display: "flex", flexDirection: "row", marginLeft: "300px", marginTop: "30px", marginBottom: "40px" }}><h1>{t('tasks')}</h1></div>
                <TaskInfo
                    role = {role}
                  
                    ref={childRef}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
};

export default Tasks;
