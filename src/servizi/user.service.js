import axios from "axios";



export const userService = {
    login,
    logout
};

function login(username, password) {

    var autenticazioneInBase64 = window.btoa(username + ':' + password);
    

    var body = JSON.stringify({ username, password });
    

    return axios.post(`http://localhost:8080/user/autenticazioneUtente`, body, { headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+autenticazioneInBase64}})
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');
}



function handleResponse(response) {

    if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
    }

    return response.data;
    
}