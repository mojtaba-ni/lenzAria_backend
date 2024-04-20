import {strings} from "../public/strings.js";



export const SuccesResponse = (data= null) => {
    return ({
        statusCode : 200,
        isSuccess : true,
        message : strings.succesMessage,
        data
    })
    
}