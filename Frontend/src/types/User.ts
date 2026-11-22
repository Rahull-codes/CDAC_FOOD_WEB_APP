export interface User{
    name : string
    email : string
    mobile: string
}

export interface UserSignup extends User{
    password : string
    
}

export interface UserSignin{
    name : string 
    email : string
    mobile : string
    token : string
}

