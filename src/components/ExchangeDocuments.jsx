import React, { useEffect, useState, useImperativeHandle, forwardRef, useContext } from "react";
import MaterialTable from "material-table";
import { DocumentsContext } from "../contexts/DocumentsContext";
import GetAppIcon from '@material-ui/icons/GetApp';

import { userService } from "../services/UserService";
import { MdEdit } from 'react-icons/md';
import { documentService, documentsService } from "../services/DocumentService";
import BackupIcon from '@material-ui/icons/Backup';
import IconButton from "@material-ui/core/IconButton";
import { modalConstants } from "../constants/ModalConstants";
import { documentsConstants } from "../constants/DocumentsConstants";
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
import ViewColumn from '@material-ui/icons/ViewColumn';

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';


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
const ExchangeDocuments = forwardRef((props, ref) => {
  const { documentsState, dispatch } = useContext(DocumentsContext);

	const [role, setRole] = useState(false);
  const someFetchActionCreator = () => {

    const getDocumentsInfoHandler = async () => {
      await documentService.getDocuments(dispatch);
    };
    getDocumentsInfoHandler();
  }

  const handleLogout = (event) => {

    userService.logout();
   //dataService.getDecisionAsExel(travelReqID, dispatch);
 }

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
    someFetchActionCreator()
  }, [dispatch]);

  const handleOpenUploadFilesModal = (event, travelReqID) => {
    event.stopPropagation();
    dispatch({ type: modalConstants.SHOW_UPLOAD_FILES_MODAL, travelReqID });
  }


  const handleShowModal = () => {
    dispatch({ type: documentsConstants.SHOW_ADD_DOCUMENT_MODAL });
  };

  const showEditDocument = (e, data) => {
    dispatch({ type: documentsConstants.SHOW_EDIT_DOCUMENT_MODAL, data });
  };

  const fileClicked = (e, oneFile, name) => {
    console.log(oneFile + " " + name)
    documentService.getFile(oneFile, name, dispatch);
  }



  const deleteDocument = (e, oneFile) => {
    documentService.deleteDocument(oneFile, dispatch);
  }

  return (
    <div >
      <div >

        <div style={{ display: "flex", flexDirection: "row", marginLeft: "300px", marginTop: "30px" }}><h1>Exchange documents</h1>
          <button style={{ marginLeft: "500px", marginBottom: "30px" }} type="button" onClick={handleShowModal} class="btn btn-primary btn-lg">+ Add new document</button></div>

          <div class="wrapper">
            <nav id="sidebar">
              <div class="sidebar-header">
                <div class="image-div">
                  <img src={process.env.PUBLIC_URL + 'assets/img/logo.png'} alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
                </div>
              </div>

              <nav class="">
                <div class="nav_list"> <a href="#" class="nav_link"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">Devices</span> </a> <a href="/#/exchangeDocuments" class="nav_link active"> <i class='bx bx-user nav_icon'><BiCollection /></i> <span class="nav_name">Exchange documents</span> </a>  </div>
               {role && <a href="/#/sendRegistrationMail" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><AiOutlineUserAdd /></i> <span class="nav_name ">Enroll</span> </a>}
               {!role && <a href="/#/contact" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><AiOutlineMail /></i> <span class="nav_name ">Support</span> </a>}
                <a onClick={handleLogout} style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
              </nav>

            </nav>
          

            <div style={{ marginLeft: "250px" }}>


            </div>

{role &&

            <MaterialTable stickyHeader
              style={{tableLayout: 'fixed', marginLeft: 38, marginRight: 38, width:"100%" }}
              icons={tableIcons}
              columns={[
                { title: "Document ID", field: "_id", },
                { title: "Document title", field: "documentTitle", },
                { title: "Document description", field: "documentDescription", },
                { title: "Read", field: "read" },
                { title: "Last access", field: "lastAccess", type: 'string' },

              ]}
             
              actions={[
                {
                  icon: () => <GetAppIcon />,
                  title: 'Download document',
                  onClick: (event, rowData) => fileClicked(event, rowData._id, rowData.document)
                },
                {
                  icon: () => <MdEdit />,
                  title: 'Edit document',
                  onClick: (event, rowData) => showEditDocument(event, rowData)
                },
                {
                  icon: () => <DeleteOutline />,
                  title: 'Delete document',
                  onClick: (event, rowData) => deleteDocument(event, rowData._id)
                },

              ]}
            
              options={{
                actionsColumnIndex: -1,
                headerStyle: { position: 'sticky', top: 0 },
                maxBodyHeight: 500,
              }}

              localization={{
                header: {
                  actions: 'Download / edit / delete document',
                },

              }}

              data={documentsState.listFiles.documents}

              title=""

            />
}
{!role &&
<MaterialTable stickyHeader
              style={{ tableLayout: 'fixed', marginLeft: 38, marginRight: 38, width:"100%"  }}
              icons={tableIcons}
              columns={[
                { title: "Document ID", field: "_id", },
                { title: "Document title", field: "documentTitle", },
                { title: "Document description", field: "documentDescription", },
                { title: "Read", field: "read" },
                { title: "Last access", field: "lastAccess", type: 'string' },

              ]}
             
              actions={[
                {
                  icon: () => <GetAppIcon />,
                  title: 'Download document',
                  onClick: (event, rowData) => fileClicked(event, rowData._id, rowData.document)
                },
              

              ]}
            
              options={{
                actionsColumnIndex: -1,
                headerStyle: { position: 'sticky', top: 0 },
                maxBodyHeight: 500,
              }}

              localization={{
                header: {
                  actions: 'Download / edit / delete document',
                },

              }}

              data={documentsState.listFiles.documents}

              title=""

            />
}
        </div>
      </div>
    </div>
  );
});

export default ExchangeDocuments;