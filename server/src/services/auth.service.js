const jwt = require("jsonwebtoken");

const VerifyToken = (req,res,next) => {

    console.log("Verify Token >>>>>>")

    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    console.log(token);

    if (!token)
    {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET || 'WeAre!nTh!$fuck!ngCov!dT!me');
        req.authToken = decode;
        

    } catch (error) {
        console.log(error);
        return res.status(401).send("The given token is Invalid!");
    }

    return next();

}

module.exports = VerifyToken;