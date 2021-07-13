const jwt = require("jsonwebtoken");

//this helper, create json web token
//instart data in jwt
const createJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    console.log(`${uid}, ${name}`);

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  createJWT,
};
