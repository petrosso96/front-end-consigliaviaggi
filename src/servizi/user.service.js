import axios from "axios";



export const userService = {
    login,
    logout,
    loginAdmin,
    logoutAdmin
};

function login(username, password) {

    var autenticazioneInBase64 = window.btoa(username + ':' + password);
    

    var body = JSON.stringify({ username, password });
    

    return axios.post(`https://consigliaviaggi.herokuapp.com/user/autenticazioneUtente`, body, { headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+autenticazioneInBase64}})
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = autenticazioneInBase64;

                sessionStorage.setItem('user',JSON.stringify(user));
            }

            return user;
        });
}

function loginAdmin(username, password) {

    var autenticazioneInBase64 = window.btoa(username + ':' + password);
    

    var body = JSON.stringify({ username, password });
    

    return axios.post(`https://consigliaviaggi.herokuapp.com/admin/autenticazione`, body, { headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+autenticazioneInBase64}})
        .then(handleResponse)
        .then(admin => {
            // login successful if there's a user in the response
            if (admin) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                admin.authdata = autenticazioneInBase64;

                sessionStorage.setItem('admin',JSON.stringify(admin));
            }

            return admin;
        });
}

function logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('user');

}

function logoutAdmin() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('admin');

}


function handleResponse(response) {

    if (response.status === 401) {
        // auto logout if 401 response returned from api

        logout();
        window.location.reload(true);
    }

    return response.data;
    
}

function handleResponseAdmin(response) {

    if (response.status === 401) {
        // auto logout if 401 response returned from api
        
        logoutAdmin();
        window.location.reload(true);
    }

    return response.data;
    
}