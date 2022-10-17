import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import MaterialTable from "material-table";
import { CompanyContext } from "../contexts/CompanyContext";
import GetAppIcon from '@material-ui/icons/GetApp';
import { userService } from "../services/UserService";
import { MdEdit } from "react-icons/md";
import { companyService, documentsService } from "../services/CompanyService";
import { companyConstants } from "../constants/CompanyConstants";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { BsBuilding } from "react-icons/bs";
import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

import { GiPerson } from "react-icons/gi";
import { VscLibrary } from "react-icons/vsc";
import { MdOutlineDashboard } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineMail } from "react-icons/ai";

import en from "../locales/en.json";
import sl from "../locales/sl.json";


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
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const ExchangeCompanies = forwardRef((props, ref) => {
  var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";
		
	return translations[langCode][s] || s;
	
	}
	
	t = t.bind(this);
  const { companyState, dispatch } = useContext(CompanyContext);
  const [lang, setLang] = useState(`${localStorage.getItem("language")}`);
  const [role, setRole] = useState(false);
  const someFetchActionCreator = () => {
    const getCompanyInfoHandler = async () => {
      await companyService.getCompanies(dispatch);
    };
    getCompanyInfoHandler();
  };

  const handleLogout = (event) => {
    userService.logout();
    //dataService.getDecisionAsExel(travelReqID, dispatch);
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
              setRole(true);
            }
          }
        })
        .catch((err) => {});
    }
    someFetchActionCreator();
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch({ type: companyConstants.SHOW_ADD_COMPANY_MODAL });
  };

  const deleteCompany = (e, oneFile) => {
    companyService.deleteCompany(oneFile,dispatch)
  };

  return (
    
      <div style={{ height:"100%"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "30px",
            marginLeft: "288px",
          }}
        >
          <h1>{t("exchangeCompanies")}</h1>
          <button
            style={{ float: "right", marginBottom: 30, marginRight: "38px" }}
            type="button"
            onClick={handleShowModal}
            class="btn btn-primary btn-lg"
          >
            {t("addNewCompany")}
          </button>
        </div>{" "}
        <div class="wrapper">
          <nav id="sidebar">
            <div class="sidebar-header">
              <div class="image-div">
                <img
                  src={process.env.PUBLIC_URL + "assets/img/logo.png"}
                  alt="SteriPro"
                  style={{ maxWidth: "150px", width: "100%" }}
                ></img>
              </div>
            </div>

            <nav class="">
              <div class="nav_list">
                {" "}
                <a href="#" class="nav_link">
                  {" "}
                  <i class="bx bx-grid-alt nav_icon">
                    {" "}
                    <MdOutlineDashboard />
                  </i>{" "}
                  <span class="nav_name">{t("tasks")}</span>{" "}
                </a>
                <a href="/#/exchangeDocuments" class="nav_link">
                  {" "}
                  <i class="bx bx-user nav_icon">
                    <BiCollection />
                  </i>{" "}
                  <span class="nav_name">{t("exchange_documents")}</span>{" "}
                </a>{" "}
              </div>
              <a
                href="/#/exchangeLibraries"
                style={{ marginTop: "20px" }}
                class="nav_link"
              >
                {" "}
                <i class="bx bx-log-out nav_icon">
                  <VscLibrary />
                </i>{" "}
                <span class="nav_name ">{t("library")}</span>{" "}
              </a>
              {role && <a
                href="/#/roles"
                style={{ marginTop: "20px" }}
                class="nav_link "
              >
                {" "}
                <i class="bx bx-log-out nav_icon">
                  <GiPerson />
                </i>{" "}
                <span class="nav_name ">{t("manageRoles")}</span>{" "}
              </a>
}
{role&&<a href="/#/companies" style={{ marginTop: "20px" }} class="nav_link active"> <i class='bx bx-log-out nav_icon'><BsBuilding /></i> <span class="nav_name ">{t('exchangeCompanies')}</span> </a>}
   
              {role && (
                <a
                  href="/#/sendRegistrationMail"
                  style={{ marginTop: "20px" }}
                  class="nav_link"
                >
                  {" "}
                  <i class="bx bx-log-out nav_icon">
                    <AiOutlineUserAdd />
                  </i>{" "}
                  <span class="nav_name">{t("enroll")}</span>{" "}
                </a>
              )}
              <a
                onClick={handleLogout}
                style={{ marginTop: "20px" }}
                class="nav_link"
              >
                {" "}
                <i class="bx bx-log-out nav_icon"></i>{" "}
                <span class="nav_name">{t("signout")}</span>{" "}
              </a>
            </nav>
          </nav>

          
         (
            <MaterialTable
              stickyHeader
              
              style={{
                tableLayout: "fixed",
                marginLeft: 288,
                marginRight: 38,
                //width: "100%",
                //height:"100%",  
              }}
              icons={tableIcons}
              columns={[
                { title: t("companyName"), field: "title" },
               
              ]}
              actions={[
    
                {
                  icon: () => <DeleteOutline />,
                  title: t("deleteCompany"),
                  onClick: (event, rowData) =>
                    deleteCompany(event, rowData._id),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                headerStyle: {top:0, bottom:0},
                maxBodyHeight: "70vh",  
              }}
              localization={{
                header: {
                  actions: t("deleteCompany"),
                },
              }}
              data={companyState.listCompanies.companies}
              title=""
            />
          )
        </div>
      </div>
  );
});

export default ExchangeCompanies;
