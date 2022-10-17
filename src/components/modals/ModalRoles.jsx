import { useContext ,
	forwardRef,} from "react";
import { Modal } from "react-bootstrap";
import { roleConstants } from "../../constants/RoleConstants";
import { RoleContext } from "../../contexts/RoleContext";

import MaterialTable from "material-table";

import en from "../../locales/en.json";
import sl from "../../locales/sl.json";

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
const translations = {
	"Choose language": "Choose language",
	en,
	sl
};

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
const DocModal = () => {
	var t = (s) => {

		let langCode = localStorage.getItem("language") || "en";

		return translations[langCode][s] || s;

	}

	t = t.bind(this);
	const { roleState, dispatch } = useContext(RoleContext);

	const handleModalClose = () => {
		
		dispatch({ type: roleConstants.ROLE_HIDE_SUCCESS });
		window.location.reload(true);
	};

	return (
		<Modal
			show={roleState.modal.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose} size="md">

			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>{roleState.modal.title} </big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<div class="form-modal" >
					<form  >

						<h6 >{roleState.modal.message}</h6>

						
					
					</form>
				</div>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>
	);
};

export default DocModal;
