export class appERROR extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}