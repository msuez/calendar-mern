
//const baseURL = `http://localhost:4000/api`;
const baseURL = process.env.REACT_APP_API_URL;

const fetchHTTP = (endpoint, data, method = 'GET') => {

    try {
        
        const url = `${baseURL}/${endpoint}`;

        if( method === 'GET' ) {
            return fetch(url);
        } else {
            return fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
                body : JSON.stringify(data)
            });
        }
        
    } catch (error) {
        throw error;
    }

}

const fetchWithToken = (endpoint, data, method = 'GET') => {

    try {

        const url = `${baseURL}/${endpoint}`;
        const token = localStorage.getItem('token') || '';
        
        if( method === 'GET' ) {
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
            });
        } else {
            return fetch( url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                body : JSON.stringify(data)
            });
        }

    } catch (error) {
        throw error;
    }


}

module.exports = {
    fetchHTTP,
    fetchWithToken
}