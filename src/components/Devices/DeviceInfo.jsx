import React, { useEffect, useState,useImperativeHandle, forwardRef, useContext } from "react";
import MaterialTable from "material-table";
import { DeviceContext } from "../../contexts/DeviceContext";
import i18next from 'i18next';
import { useTranslation } from 'react-i18next'
import DeviceContextProvider from "../../contexts/DeviceContext";
import { deviceService } from "../../services/DeviceService";
import { userService } from "../../services/UserService";
import GetAppIcon from '@material-ui/icons/GetApp';
import BackupIcon from '@material-ui/icons/Backup';
import IconButton from "@material-ui/core/IconButton";
import { deviceConstants } from "../../constants/DeviceConstants";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';

import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { VscLibrary } from 'react-icons/vsc';

import { MdEdit } from 'react-icons/md';
import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";

var url = "https://api.exchange.uvcsolutions.com/"
//var url = "http://localhost:3000/"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const DeviceInfo = forwardRef((props, ref) => {
  const { deviceState, dispatch } = useContext(DeviceContext);
  const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const [role, setRole] = useState(false);
  const { t } = useTranslation(); 
  const someFetchActionCreator = () => {

    const getDevicesInfoHandler = async () => {
      await deviceService.getDevices( dispatch);
    };
    getDevicesInfoHandler();
  }

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



    someFetchActionCreator()
  }, [dispatch]);

  const handleLogout = (event) => {

     userService.logout();
  }

  const showEditDevice = (e, data) => {
    dispatch({ type: deviceConstants.SHOW_EDIT_DEVICE_MODAL, data });
  };

  return (
      <div class="wrapper">
       		<nav id="sidebar">
		<div class="sidebar-header">
		  <div class="image-div">
			<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
		  </div>
		</div>

		<nav class="">
		  <div class="nav_list"> <a href="#" class="nav_link active"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">{t('devices')}</span> </a> 
      <a href="/#/exchangeDocuments" class="nav_link"> <i class='bx bx-user nav_icon'><BiCollection/></i> <span class="nav_name">{t('exchange_documents')}</span> </a>  </div>
      <a href="/#/exchangeLibraries" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><VscLibrary /></i> <span class="nav_name ">{t('library')}</span> </a>
     
      {!props.role && <a href="/#/contact" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><AiOutlineMail /></i> <span class="nav_name ">{t('support')}</span> </a>}
      {props.role && <a href="/#/sendRegistrationMail" style={{marginTop : "20px"}} class="nav_link"> <i class='bx bx-log-out nav_icon'><AiOutlineUserAdd/></i> <span class="nav_name">{t('enroll')}</span> </a>}
		  <a onClick={handleLogout} style={{marginTop : "20px"}} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">{t('signout')}</span> </a>
		</nav>

	  </nav>
        <DeviceContextProvider>
          <div style={{ marginLeft: "250px" }}>  </div>      

          
       {role &&   <MaterialTable stickyHeader
           style={{tableLayout: 'fixed', marginLeft: 38, marginRight: 48, width:"80%"}}
            icons={tableIcons}
            actions={[
              {
                icon: () => <MdEdit/>,
                title: 'Edit',
                onClick: (event, rowData) => showEditDevice(event, rowData)
              },
            

            ]}
            columns={[
              { title: t("motherboardId"), field: "serialNumber" },
              { title: t("deviceName"), field: "name" },
              { title: t("tabletIMEI"), field: "tabletIdentifier" },
              { title: t("customer"), field: "customerName", type: 'string' },
              { title: t("distributor"), field: "distributorName", type: 'string' },
              { title: t("deployDate"), field: "deployDate", type: 'date' },
              { title: t("lastLegularServiceData"), field: "lastRegularServiceDate", type: 'date' },
              { title: t("nextService"), field: "countdown" },
              { title: t("notificationEmail"), field: "notificationEmails", type: 'string' },

            ]}
           
            options={{
              
              actionsColumnIndex: 0,
              headerStyle: { position: 'sticky', top: 0 },
              maxBodyHeight: 450,
            }}
         
            localization={{
              header: {
                actions:  t("edit"),
              },

            }}

            data={deviceState.listDevices.devices}

            title=""
            onRowClick={(event, rowData) => { props.handleShowModal(rowData) }}

          />
}


          
{!role &&   <MaterialTable stickyHeader
           style={{tableLayout: 'fixed', marginLeft: 38, marginRight: 38, width:"100%"}}
            icons={tableIcons}
            columns={[
              { title: t("motherboardId"), field: "serialNumber" },
              { title: t("deviceName"), field: "name" },
              { title: t("tabletIMEI"), field: "tabletIdentifier" },
              { title: t("customer"), field: "customerName", type: 'string' },
              { title: t("distributor"), field: "distributorName", type: 'string' },
              { title: t("deployDate"), field: "deployDate", type: 'date' },
              { title: t("lastLegularServiceData"), field: "lastRegularServiceDate", type: 'date' },
              { title: t("nextService"), field: "countdown" },
              { title: t("notificationEmail"), field: "notificationEmails", type: 'string' },

            ]}
           
            options={{
              actionsColumnIndex: -1,
              headerStyle: { position: 'sticky', top: 0 },
              maxBodyHeight: 450,
            }}
         
            


            data={deviceState.listDevices.devices}

            title=""
            onRowClick={(event, rowData) => { props.handleShowModal(rowData) }}

          />
}


        </DeviceContextProvider>
      </div>
  );
});

export default DeviceInfo;