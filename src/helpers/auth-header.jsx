

export function authHeader() {

	return `${localStorage.getItem("accessToken")}`;
}



export function setAuthInLocalStorage(data) {

		localStorage.setItem("accessToken", data.token);
		localStorage.setItem("language", data.lang);


}



export function deleteLocalStorage() {

	localStorage.removeItem("accessToken");

}