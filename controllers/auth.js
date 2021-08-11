const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createJWT } = require('../helpers/jwt');

const addUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let userCheck = await User.findOne({ email: email });

    if (userCheck) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe',
      });
    }

    user = new User(req.body);

    //encrpyt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // create JWT

    const token = await createJWT(user.uid, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: 'registro existoso',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'hubo un error, habla con el administrador',
    });
  }
};

const loginUser = async (req, res = resonse) => {
  const { password, email } = req.body;

  try {
    let userFind = await User.findOne({ email });

    console.log('El userFind es igual a:');
    console.log(userFind);

    if (!userFind) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña no existe o no es correcto',
      });
    }
    // create JWT us
    const token = await createJWT(userFind._id, userFind.name);

    res.json({
      ok: true,
      uid: userFind._id,
      name: userFind.name,
      token,
    });

    const validPassword = bcrypt.compareSync(password, userFind.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña no existe o no es correcto',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hubo un error, habla con el administrador',
    });
  }
};

const revalidateToken = async (req, res = resonse) => {
  const { uid, name } = req;
  const token = await createJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  addUser,
  loginUser,
  revalidateToken,
};
