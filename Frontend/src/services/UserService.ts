import axios, { type AxiosPromise } from 'axios'
import type  {APIresponse} from '../types/Api'
import type { User, UserSignin , UserSignup} from '../types/User'
import { Config } from '../utils/config'


export function userSignin(email : string , password : string) : Promise<AxiosPromise<APIresponse<UserSignin>>>  {
    const body = {email , password}
    const url = Config.URL + '/user/signin'
    return axios.post(url , body)
}

export function userSignup(body : UserSignup ) : Promise<AxiosPromise<APIresponse<any>>> {
    const url = Config.URL  + '/user/signup'
    return axios.post(url , body)
}

export function userProfile() : Promise<AxiosPromise<APIresponse<User>>>{
    const url = Config.URL + '/user'
    return axios.get(url , {
        headers : {token : sessionStorage.getItem('token')}
    })
}

export function updateProfile(mobile : string) : Promise<AxiosPromise<APIresponse<any>>>{
    const url = Config.URL + '/user'
    const body = {mobile}
    const headers = { token : sessionStorage.getItem(Config.TOKEN)}
    return axios.put(url , body , { headers } )
}