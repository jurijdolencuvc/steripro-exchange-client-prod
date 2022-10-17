import React, { useEffect, useState,useImperativeHandle, forwardRef, useContext } from "react";
import MaterialTable from "material-table";
import { TaskContext } from "../../contexts/TaskContext";
import TaskContextProvider from "../../contexts/TaskContext";
import { taskService } from "../../services/TaskService";
import { userService } from "../../services/UserService";
import { taskConstants } from "../../constants/TaskConstants";
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

import { GiPerson } from "react-icons/gi";
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { VscLibrary } from 'react-icons/vsc';

import { BsBuilding } from "react-icons/bs";
import { MdEdit } from 'react-icons/md';
import { authHeader } from "../../helpers/auth-header";
import Axios from "axios";import { LocaleContext } from "../../contexts/locale.context.js";
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";


const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
var url = process.env.REACT_APP_URL;

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
const TaskInfo = forwardRef((props, ref) => {
  var t = (s) => {
    let langCode = localStorage.getItem("language") || "en";
return translations[langCode][s] || s;
}
t = t.bind(this);
  const { taskState, dispatch } = useContext(TaskContext);
  const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
	const [role, setRole] = useState(false);
  const someFetchActionCreator = () => {

    const getTaskInfoHandler = async () => {
      await taskService.getTasks( dispatch);
    };
    getTaskInfoHandler();
  }

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



    someFetchActionCreator()
  }, [dispatch]);

  const handleLogout = (event) => {

     userService.logout();
  }

  

  return (
      <div class="wrapper">
       		<nav id="sidebar">
		<div class="sidebar-header">
		  <div class="image-div">
			<img src={process.env.PUBLIC_URL + 'assets/img/logo.png'}  alt="SteriPro" style={{ maxWidth: "150px", width: "100%" }}></img>
		  </div>
		</div>

		<nav class="">
		  <div class="nav_list"> <a href="#" class="nav_link active"> <i class='bx bx-grid-alt nav_icon'> <MdOutlineDashboard /></i> <span class="nav_name">{t('tasks')}</span> </a> 
      <a href="/#/exchangeDocuments" class="nav_link"> <i class='bx bx-user nav_icon'><BiCollection/></i> <span class="nav_name">{t('exchange_documents')}</span> </a>  </div>
      <a href="/#/exchangeLibraries" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><VscLibrary /></i> <span class="nav_name ">{t('library')}</span> </a>
      {role && <a
                href="/#/roles"
                style={{ marginTop: "20px" }}
                class="nav_link"
              >
                <i class="bx bx-log-out nav_icon">
                  <GiPerson />
                </i>
                <span class="nav_name ">{t("manageRoles")}</span>
              </a>
}
{role&&<a href="/#/companies" style={{ marginTop: "20px" }} class="nav_link"> <i class='bx bx-log-out nav_icon'><BsBuilding /></i> <span class="nav_name ">{t('exchangeCompanies')}</span> </a>}
 
     {props.role && <a href="/#/sendRegistrationMail" style={{marginTop : "20px"}} class="nav_link"> <i class='bx bx-log-out nav_icon'><AiOutlineUserAdd/></i> <span class="nav_name">{t('enroll')}</span> </a>}
		  <a onClick={handleLogout} style={{marginTop : "20px"}} class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">{t('signout')}</span> </a>
		</nav>

	  </nav>
        <TaskContextProvider>
          <div style={{ marginLeft: "250px" }}>  </div>      

          
      <MaterialTable stickyHeader
           style={{tableLayout: 'fixed', marginLeft: 288, marginRight: 38}}
            icons={tableIcons}
           
            columns={[
              { title: t("title"), field: "title" },
              { title: t("description"), field: "description" },

            ]}
           
            options={{
              
              //actionsColumnIndex: 0,
              //headerStyle: { position: 'sticky', top: 0 },
              //maxBodyHeight: 450,
            }}
         
           

            data={taskState.listTasks.tasks}

            title=""

          />


        </TaskContextProvider>
      </div>
  );
});

export default TaskInfo;