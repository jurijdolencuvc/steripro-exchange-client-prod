import { useContext, useState, useEffect,useRef, React } from "react";
import DeviceInfo from "./DeviceInfo";
import { DeviceContext } from "../../contexts/DeviceContext";
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

var url = process.env.URL;
const Devices = () => {
    var t = (s) => {

        let langCode = localStorage.getItem("language") || "en";
        
		return translations[langCode][s] || s;
	
	}
	

	t = t.bind(this);


    const { deviceState, dispatch } = useContext(DeviceContext);

   
	const [role, setRole] = useState(false);
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);


    useEffect(() => {
          

       var token = authHeader()
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

			Axios.get(`api/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
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

            <div style={{ display: "flex", flexDirection: "row", marginLeft: "300px", marginTop: "30px", marginBottom: "40px" }}><h1>{t('devices')}</h1></div>
                <DeviceInfo
                    role = {role}
                  
                    ref={childRef}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
};

export default Devices;
