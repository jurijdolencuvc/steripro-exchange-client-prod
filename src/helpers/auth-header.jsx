

export function authHeader() {

	return `${localStorage.getItem("accessToken")}`;
}



export function setAuthInLocalStorage(data) {

		localStorage.setItem("accessToken", data.token);


}



export function deleteLocalStorage() {

	localStorage.removeItem("accessToken");

}