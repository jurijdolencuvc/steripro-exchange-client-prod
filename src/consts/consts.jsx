
import i18next from "i18next";
var prodCpy = {};
export function constants(type) {


    console.log("ksjnksddnksnfjk")
    switch (type) {

        case "Email already exists.":
            console.log("kjfdhfkjdhfkjjdsf")
            return i18next.t("emailExists");

        case "The passwords do not match.":
            return i18next.t("passwordsDoNotMatch");

        case "Name already exists.":
            return i18next.t("nameAlreadyExists");

        case "Invalid email form provided.":
            return i18next.t("invalidEmailForm");

        case "Password too short.":
            return i18next.t("passwordTooShort");

        case "New password too short.":
            return i18next.t("newPasswordTooShort");

        case "Unable to authenticate.":
            return i18next.t("unableToAuth");

        case "Invalid updates!":
            return i18next.t("invalidUpdated");

        case "Incorrect current password.":
            return i18next.t("incorrectCurrentPass");

        case "No query/pagination result.":
            return i18next.t("noQueryPaginationResult");

        case "That Task does not exist on the server.":
            return i18next.t("taskDoesNotExistOnServer");

        case "That User does not exist.":
            return i18next.t("userDoesNotExist");

        case "You are not able to register user.":
            return i18next.t("notAbleToRegister");

        case "Unable to make a new account. Admin already exists!":
            return i18next.t("adminAlreadyExists");

        case "Unable to make changes. Logged in user is not admin.":
            return i18next.t("notAdmin");

        case "You do not have the right to register.":
            return i18next.t("noRightToRegister");

        case "You have already sent an email for registration.":
            return i18next.t("alreadySentEmail");

        case "Please fill all fields.":
            return i18next.t("pleaseFillAllFields");

        case "Please authenticate.":
            return i18next.t("auth");

        case "The link for registration has expired.":
            return i18next.t("linkExpired");

        case "You do not have the right to change the password. Please contact administrator.":
            return i18next.t("noRightToChangePassword");

        case "Internal server error. Please try again.":
            return i18next.t("internalServerError");

        case "User information update success.":
            return i18next.t("userUpdateSuccess");

        case "Document created successfully.":
            return i18next.t("documentCreateSuccess");

        case "User password update success.":
            return i18next.t("userPassUpdateSuccess");


        case "You are not able to register user.":
            return i18next.t("notAbleToRegister");

        case "Unknown error, please try again later.":
            return i18next.t("unknownError");

            case "Error while fetching data":
                return i18next.t("errorWhileFetchingData");
        default:
            
            console.log("kjfdhfkjdhfkjjdsf")
            return i18next.t("noTranslation");
    }
};
