import jwt from "jsonwebtoken";

//userChecking
export const userCheck = (req, res, next) => {

  const token = req.headers.authorization;
  const decoded = jwt.decode(token, 'token');

  if (decoded) {
    req.id = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  } else {
    return res.status(401).json({ message: 'you are not authorized' })
  }


}

//adminChecking
export const adminCheck = (req, res, next) => {

  if (req.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: 'you are not authorized' });
  }

}