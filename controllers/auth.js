const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const addUser = async (req, res = resonse) => {
  // const { name, email, password } = req.body;

  const { name, email, password } = req.body;

  try {
    let userCheck = await User.findOne({ email: email });

    if (userCheck) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    console.log(userCheck);
    user = new User(req.body);

    //encrpyt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "hubo un error, habla con el administrador",
    });
  }

  res.status(201).json({
    ok: true,
    uid: user.id,
    name: user.name,
    msg: "Registro existo",
  });
};

const loginUser = async (req, res = resonse) => {
  const { password, email } = req.body;

  try {
    let userFind = await User.findOne({ email });

    console.log("El userFind es igual a:");
    console.log(userFind);

    if (!userFind) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña no existe o no es correcto",
      });
    }
    // Genera nuestro JWT

    res.json({
      ok: true,
      uid: userFind.id,
      name: userFind.name,
    });

    const validPassword = bcrypt.compareSync(password, userFind.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña no existe o no es correcto",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hubo un error, habla con el administrador",
    });
  }
};

const validateToken = (req, res = resonse) => {
  res.json({
    ok: true,
    msg: "token",
  });
};

module.exports = {
  addUser,
  loginUser,
  validateToken,
};
