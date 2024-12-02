
import path from 'path'
const supportedExits = ['.png', '.jpg', '.webp', '.gif', '.jpeg']
export const fileCheck = (req, res, next) => {

  ///fileAuth
  const file = req.files?.image;
  if (!file) return res.status(400).json({ message: "Please provide an image" })

  //typeChecking
  const type = path.extname(file.name);
  if (!supportedExits.includes(type)) return res.status(200).json({ message: "invalid image" })


  file.mv(`./Image/${file.name}`, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    req.image = file.name;
    next();

  });


}