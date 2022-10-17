import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
//import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound.jsx";
import { ProtectedRoute } from "./router/ProtectedRouter.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import ExchangeDocumentsPage from "./pages/ExchangeDocumentsPage.jsx";
import ExchangeLibraryPage from "./pages/ExchangeLibraryPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import CompaniesPage from "./pages/CompaniesPage.jsx";


import SendRegistrationMail from "./pages/SendRegistrationMailPage.jsx";

				//<Route exact path="/register" component={RegisterPage} />
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/sendRegistrationMail" component={SendRegistrationMail} />
				<Route  path="/login" component={LoginPage} />
				<Route  path="/roles" component={RolesPage} />
				<Route  path="/companies" component={CompaniesPage} />
				<Route path="/unauthorized" component={UnauthorizedPage} />
				<Route exact path="/exchangeDocuments" component={ExchangeDocumentsPage} />
				<Route exact path="/register" component={RegisterPage} />
				<Route exact path="/exchangeLibraries" component={ExchangeLibraryPage} />
				<Route exact path="/resetPassword/:email/:token" component={ResetPasswordPage} />



				<Route path="/404" component={PageNotFound} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}

export default App;
