const promisify = callback =>
    new Promise((resolve, reject) => {
        callback((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
module.exports = promisify;
