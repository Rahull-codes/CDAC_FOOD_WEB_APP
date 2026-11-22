function Result(data , error){
    if(data){
        successResult(data)
    }else{
        errorResult(error)
    }
}

function successResult(data){
    return {'status' : 'success' , data}
}

function errorResult(error){
    return {'status' : 'error' ,  error}
}

module.exports = {Result , successResult , errorResult}