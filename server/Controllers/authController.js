import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt from 'bcrypt'


//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });


    if (isExist) {
      //checking password and bcrypt it
      const pass = bcrypt.compareSync(password, isExist.password);
      if (!pass) return res.status(401).json({ message: 'invalid password' });

      //making token number
      const token = jwt.sign({
        id: isExist._id,
        isAdmin: isExist.isAdmin
      }, 'token');

      res.cookie(
        'jwt',
        token,
        {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, //
          sameSite: 'none',
          secure: true
        }
      )

      const cook = req.cookies;
      console.log(cook);

      return res.status(200).json({
        token,

        fullname: isExist.fullname,
        email: isExist.email,
        isAdmin: isExist.isAdmin,
        message: "Login succesfull"

      })
    } else {
      return res.status(401).json({ message: "invalid crendential" })
    }

  } catch (error) {
    return res.status(400).json({ message: "Invalid email or password" })

  }
}


//signUp
export const signup = async (req, res) => {

  const { fullname, email, password } = req.body;

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) return res.status(409).json({ message: "User already exist" });

    const hash = bcrypt.hashSync(password, 10);

    await User.create({
      fullname,
      email,
      password: hash
    });
    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    return res.status(201).json({ message: `errors occures ${error}` })


  }

}


//userProfile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select('fullname email   ');
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user)

  } catch (error) {
    return res.status(400).json({ message: `${error}` })

  }
}

//updateUserProfile
export const updateUserProfile = async (req, res) => {

  const { fullname, password, email } = req.body;
  try {
    const isExist = await User.findById(id);
    if (!isExist) return res.status(404).json({ message: "User not found" });

    if (isExist) {
      isExist.fullname == fullname || isExist.fullname;
      isExist.email == email || isExist.email;
      isExist.password == password || isExist.password;

      await isExist.save();
      return res.status(200).json({ message: 'successfully updated' });
    } else {
      return res.status(404).json({ message: "User not found" });

    }
  } catch (error) {
    return res.status(400).json({ message: `${error}` })
  }

}
//