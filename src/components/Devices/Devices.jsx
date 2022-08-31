import { useContext, useState, useEffect,useRef, React } from "react";
import DeviceInfo from "./DeviceInfo";
import { DeviceContext } from "../../contexts/DeviceContext";
import { modalConstants } from "../../constants/ModalConstants";

import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"
const TravelInformation = () => {

    const { deviceState, dispatch } = useContext(DeviceContext);

	const [role, setRole] = useState(false);
    const handleShowModal = (data) => {
        dispatch({ type: modalConstants.SHOW_EDIT_DATA_MODAL, data });
    };

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
                    handleShowModal={handleShowModal}
                    ref={childRef}
                    dispatch={dispatch}
                />
            </div>
        </div>
    );
};

export default TravelInformation;
