
import React, { useContext, useEffect, forwardRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { roleService } from "../../services/RoleService";
import { RoleContext } from "../../contexts/RoleContext";
import { roleConstants } from "../../constants/RoleConstants";


import MaterialTable from "material-table";
import GetAppIcon from '@material-ui/icons/GetApp';
import { MdEdit } from "react-icons/md";
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
import en from "../../locales/en.json";
import sl from "../../locales/sl.json";

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

const translations = {
	"Choose language": "Choose language",
	en,
	sl
};
const RequestRemoveRole = (props) => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);
	const { roleState, dispatch } = useContext(RoleContext);

	const [lang, setLang] = useState(`${localStorage.getItem("language")}`);

	const handleSubmitNo = (e) => {
		e.preventDefault();

		dispatch({ type: roleConstants.HIDE_REQUEST_MODAL });
		window.location.reload()
	};


	const handleSubmitYes = (e) => {
		roleService.remove(props.file, dispatch);

	};


	return (
		<React.Fragment>

			<div>
				<Paper square>
					<div className="container"  >

						<div className="row mt-5">

							<form id="contactForm" >

								<table style={{  marginBottom: "4rem" }}>
									<td width="500rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>{t("areYouSure")}</b></label>

											</div>
										</div>
										{!props.emptyArray &&<h6 >{props.message}</h6>}
										{!props.emptyArray && <MaterialTable
											stickyHeader

											style={{

											}}
											icons={tableIcons}
											columns={[
												{ title: t("email"), field: "email" },
											]}

											options={{
												search: false
											}}
											localization={{

											}}
											data={props.users}
											title=""
										/>}
										



										<div style={{ display: "flex", flexDirection: "row", marginLeft: "100px", marginTop: "30px" }}>



											<div className="form-group text-center" id="container">
												<button
													style={{ background: "#1977cc", marginTop: "15px",marginLeft:"4rem", marginRight: "55px" }}

													onClick={(e) => { handleSubmitYes(e) }}
													className="btn btn-primary btn-xl button1"
													id="button1"
													type="button"
												>
													{t("yes")}
												</button>
											</div>


											<div className="form-group text-center">
												<button
													style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

													onClick={(e) => { handleSubmitNo(e) }}
													className="btn btn-primary btn-xl button2"
													id="button2"
													type="button"
												>
													{t("no")}
												</button>
											</div>
										</div>


									</td>
								</table>



							</form>
						</div>


					</div>



				</Paper>
			</div>
		</React.Fragment>
	);
};

export default RequestRemoveRole;
