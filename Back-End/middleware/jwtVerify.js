import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()


const verify = (req, res, next) => {  //CUSTOME MIDDLEWARE FOR TO VERIFY THE TOKEN ,IF THE TOKEN PRESENT IT WILL CONVERTED AND PUT IT TO THE REQ.TOKEN
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'undefined') {
        const tokenArray = authHeader.split(' ');
        if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
            return res.status(400).json({ message: "Invalid token format" });
        }
        const token = tokenArray[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized", relogin: true });
            }
            req.token = decodedToken;
            next();
        });
    } else {
        return res.status(403).json({ message: "Authorization header not found" });
    }
};

export default verify;