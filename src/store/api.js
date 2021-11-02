import axios from 'axios'
//import store from './index.js'

var call = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    //withCredentials: true
})
/*
call.interceptors.response.use((response) => {
    return response;
    }, (error) => {
        if (error.response.status !== 401 && (error.response.status !== 400 && error.response.data.message !== 'missing or malformed jwt')) {
            return new Promise((resolve, reject) => {
                console.log("first if", error.response.status, error.response.data.message)
                reject(error)
            });
        }
        if (error.config.url == '/v1/auth/refresh' ) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        return new Promise((resolve, reject) => 
            call.get('/v1/auth/refresh')
                .then((response) => {
                    if (response.status === 200) {
                        const config = error.config;
                        axios.request(config).then(response => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error)
                        })
                    }
                }).catch((error) => {
                    reject(error)
                })
        )
    })*/

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



export default class api {
    constructor () {
    }
    static get call() {
        return call
    }
    static parseJwt(token) {
        return parseJwt(token)
    }
}
