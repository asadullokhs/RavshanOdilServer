const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET;

const userCtrl = {
  register: async (req, res) => {
    const { username } = req.body;

    try {
      const user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({
            message:
              "Bu username dagi foydalanuvchi allaqachon ro'yhatdan o'tgan",
          });
      }

      const hashdedPassword = await bcrypt.hash(req.body.password, 10);

      req.body.password = hashdedPassword;

      const newUser = await User.create(req.body);

      const { password, ...otherDetails } = newUser._doc;

      const token = JWT.sign(otherDetails, JWT_SECRET_KEY, { expiresIn: "1h" });

      res.status(201).json({
        message: "Muvafiqiyatli qoshildi!",
        user: otherDetails,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(503).json(error.message);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;    
    try {
      if (username && password) {
        const oldUser = await User.findOne({ username });
        
        if (!oldUser) {
          return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          oldUser.password
        );
        if (!isPasswordCorrect) {
          return res
            .status(400)
            .json({ message: "Username yoki parolda hatolik bor" });
        }

        const token = JWT.sign(
          { userName: oldUser.username, _id: oldUser._id, role: oldUser.role },
          JWT_SECRET_KEY
        );

        const { password, ...otherDetails } = oldUser._doc;
        res
          .status(200)
          .send({
            message: "Muvafaqiyatli  topildi",
            user: otherDetails,
            token,
          });
      } else {
        res.status(403).send({ message: "Hamma joyni toldiring" });
      }
    } catch (error) {
      res.status(503).send({ message: error.message });
      console.log(error);
    }
  },
};

module.exports = userCtrl;
