import axios, { type AxiosResponse } from "axios";
import { Config } from "../utils/config";
import type { APIresponse } from './../types/Api';
import type { Food } from "../types/Food";

export function getFoodMenu() : Promise<AxiosResponse<APIresponse<Food[]>>> {
    const url = Config.URL + '/food'
    return axios.get(url)
}