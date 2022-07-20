/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { default: axios } = require("axios");

class Http {
    constructor(){
        this.instance = axios.create({
            baseURL:'',
            timeout:10000,
            headers:{
                'Content-Type':'application/json',
                // token:'token'
            } 
        })
        this.instance.interceptors.response.use(response => {
            const result = {data:response.data, status:response.status}
            return result
        }),
        ({respone}) => {
            const result = {data: respone.data,status:respone.staus}
            return Promise.reject(result)
        }
    }
}
