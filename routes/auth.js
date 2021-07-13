/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { fieldValidate } = require("../middlewares/fieldsValidate");

const { addUser, loginUser, revalidateToken } = require("../controllers/auth");

const { validateJWT } = require("../middlewares/revalidar-jwt");

router.post(
  "/adduser",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El mail es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidate,
  ],
  addUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "Por favor escriba un password").isLength({ min: 6 }),
  ],
  loginUser
);

router.get("/renew", [validateJWT], revalidateToken);

module.exports = router;
