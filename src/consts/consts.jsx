

import en from "../locales/en.json";
import sl from "../locales/sl.json";


const translations = {
    "Choose language": "Choose language",
    en,
    sl
};

var prodCpy = {};
export function constants(type) {

    var t = (s) => {

        let langCode = localStorage.getItem("language") || "en";

        return translations[langCode][s] || s;

    }

    t = t.bind(this);

    switch (type) {

        case "Email already exists.":
            return t("emailExists");

        case "The passwords do not match.":
            return t("passwordsDoNotMatch");

        case "Name already exists.":
            return t("nameAlreadyExists");

        case "Invalid email form provided.":
            return t("invalidEmailForm");

        case "Password too short.":
            return t("passwordTooShort");

        case "New password too short.":
            return t("newPasswordTooShort");

        case "Unable to authenticate.":
            return t("unableToAuth");

        case "Invalid updates!":
            return t("invalidUpdated");

        case "Incorrect current password.":
            return t("incorrectCurrentPass");

        case "No query/pagination result.":
            return t("noQueryPaginationResult");

        case "That Task does not exist on the server.":
            return t("taskDoesNotExistOnServer");

        case "That User does not exist.":
            return t("userDoesNotExist");

        case "You are not able to register user.":
            return t("notAbleToRegister");

        case "Unable to make a new account. Admin already exists!":
            return t("adminAlreadyExists");

        case "Unable to make changes. Logged in user is not admin.":
            return t("notAdmin");

        case "You do not have the right to register.":
            return t("noRightToRegister");

        case "You have already sent an email for registration.":
            return t("alreadySentEmail");

        case "Please fill all fields.":
            return t("pleaseFillAllFields");

        case "Please authenticate.":
            return t("auth");

        case "The link for registration has expired.":
            return t("linkExpired");

        case "You do not have the right to change the password. Please contact administrator.":
            return t("noRightToChangePassword");

        case "Internal server error. Please try again.":
            return t("internalServerError");

        case "User information update success.":
            return t("userUpdateSuccess");

        case "Document created successfully.":
            return t("documentCreateSuccess");

        case "User password update success.":
            return t("userPassUpdateSuccess");


        case "You are not able to register user.":
            return t("notAbleToRegister");

        case "Unknown error, please try again later.":
            return t("unknownError");

        case "Error while fetching data":
            return t("errorWhileFetchingData");

            
        case "You are not able to remove Admin or Guest role.":
            return t("notAbleToRemoveThatRole");

        default:

            return t("noTranslation");
    }
};
