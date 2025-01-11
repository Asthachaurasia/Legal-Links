const jwt = require('jsonwebtoken');  
const dotenv = require('dotenv');  
dotenv.config();  


// Middleware to authenticate and authorize users based on their roles
const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
         
        const token = req.headers.authorization?.split(" ")[1];

        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

         
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            req.user = decoded;

             
            if (!requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            }

             
            next();
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    };
};

module.exports = { authorizeRoles };
