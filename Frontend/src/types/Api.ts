export interface APIresponse<T> {
    status : "success" | "error"
    data : T
    error : any
}

