exports.sendError = (res,error,statusCode = 401) => {
    return res.status(statusCode).json({error : error});
}


const crypto = require('crypto');
exports.generateRandomByte = () => {
    return new Promise( (resolve,reject) => {
        
        crypto.randomBytes(30, (error , bufferedData) => {
            if(error){
                reject(error);
            }
            const bufferString = bufferedData.toString('hex');
            console.log(bufferString);
            resolve(bufferString);
        });

    });
};



exports.handleNotFound = (req,res) => {
    return res.status(404).json({error : 'Not Found'});
}