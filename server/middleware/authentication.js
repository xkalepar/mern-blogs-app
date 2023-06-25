import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ msg: 'Authorizataion Error ' })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            _id: payload.id,
            username: payload.username
        }
        next()
    } catch (error) {
     res.status(500).json({msg: 'internal server error'})
    }

};
export default authentication;