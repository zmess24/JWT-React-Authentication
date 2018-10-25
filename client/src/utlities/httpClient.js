import axios from 'axios';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create();

httpClient.setToken = function(token) {
    localStorage.setItem('token', token);
    return token;
};

httpClient.getToken = function(token) {
    return localStorage.getItem('token')
};

httpClient.getCurrentUser = function() {
    const token = this.getToken(); // Fetch token from local storage.
    console.log(token); 
    if (token) return jwtDecode(token); // If token exists, decode the decoded token
    return null // Otherwise, return null.
}

httpClient.authenticate = async function(credentials, url) {
    // 'this' refers to the instance of axios instantiated above.
    let res = await this({ method: "post", url, data: credentials });
    // Grab the token from the data
    const token = res.data.token;

    if (token) { 
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token); 
    } else { 
        return false;
    }
};

httpClient.logOut = function() {
    localStorage.removeItem('token'); // Delete token from localStorage.
    delete this.defaults.headers.common.token; // Remove the token from the default header.
    return true; 
}

// During initial app load, attempt to set a localStorage stored token
// as a default header for all api requests.
httpClient.defaults.headers.common.token = httpClient.getToken();
export default httpClient;