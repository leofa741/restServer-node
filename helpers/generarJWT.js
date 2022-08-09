

const jwt = require('jsonwebtoken');




const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
      const payload = {
        uid,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
        jwt.sign(payload, process.env.SECRET0RPRIVATEKEY, (err, token) => {
            if(err) reject(err);
            resolve(token);
        }
        );
    }
    );






}

module.exports = {
    generarJWT
}
