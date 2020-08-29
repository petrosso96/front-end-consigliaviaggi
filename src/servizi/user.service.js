import axios from 'axios'

export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json',
                    'Authorization': "Basic "+window.btoa(username + ':' + password),
    
        },
        //body: JSON.stringify({ username, password })
    };

    console.log(requestOptions)

    return axios.post('http://localhost:8080/user/autenticazioneUtente',requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ' ' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}



function handleResponse(response) {
    return response.text().then(text => {
        console.log(text)
        const data = text //&& JSON.parse(text);
        if (!response.ok) {
            if(response.status === 401){
                logout();
            }
        
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}