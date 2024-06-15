const jwt = require('jsonwebtoken');
const JWT_SECRET = "Hritik@#123";
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Aunthenticate using a valid details" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "Aunthenticate using a valid details" });
    }
}

module.exports = fetchuser;