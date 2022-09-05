import { useContext, useState, useEffect,useRef, React } from "react";
import DeviceInfo from "./DeviceInfo";
import { DeviceContext } from "../../contexts/DeviceContext";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"
const Devices = () => {

    const { deviceState, dispatch } = useContext(DeviceContext);

   
	const [role, setRole] = useState(false);
    const { t } = useTranslation(); 
	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);


    useEffect(() => {
    
        i18next.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
          });
          

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

            <div style={{ display: "flex", flexDirection: "row", marginLeft: "300px", marginTop: "30px", marginBottom: "40px" }}><h1>Devices</h1></div>
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
