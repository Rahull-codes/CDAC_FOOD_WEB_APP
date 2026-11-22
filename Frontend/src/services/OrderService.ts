import axios, { type AxiosPromise } from "axios";
import type { Food } from "../types/Food";
import { Config } from "../utils/config";
import type { APIresponse } from "../types/Api";

export function placeOrder(total_amount :number , foodItems  : Food[] ) : AxiosPromise<APIresponse<any>> {

    const token = window.sessionStorage.getItem(Config.TOKEN)
    const headers = {token}
    const url = Config.URL + '/order'

    return axios.post(url , { total_amount , foodItems } , {headers} )
}

export function orderHistory( ) : AxiosPromise<APIresponse<any>> {

    const token = window.sessionStorage.getItem(Config.TOKEN)
    const headers = {token}
    const url = Config.URL + '/order'

    return axios.get(url ,  {headers} )
}