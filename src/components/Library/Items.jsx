import { useContext, useState, useEffect,useRef, React } from "react";
import DeviceInfo from "./DeviceInfo";
import { DeviceContext } from "../../contexts/DeviceContext";

import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"
const Items = () => {

    const { deviceState, dispatch } = useContext(DeviceContext);

	const [role, setRole] = useState(false);
 

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

                <div style={{ display: "flex", flexDirection: "row", marginLeft: "300px", marginTop: "30px", marginBottom: "30px" }}><h1>Devices</h1></div>
                <DeviceInfo
                    role = {role}
                   
                    ref={childRef}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
};

export default Items;
