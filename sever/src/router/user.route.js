import express from "express";
import { body } from "express-validator";
import RequestHandler from "../handlers/Request.handler.js";
import usercontroller from "../controller/user.controller.js";

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("no match");
      } else {
        return true;
      }
    }),
  body("gmail")
    .exists()
    .withMessage("gmail is required")
    .isLength({ min: 8 })
    .withMessage("gmail minimum 8 characters"),
  RequestHandler.validator,
  usercontroller.signup
);

router.post(
  "/login",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("Username minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  RequestHandler.validator,
  usercontroller.login
);

router.post(
  "/changepass",
  body("newPass")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("New password minium 8 characters"),
  body("repeatNewPass").exists().withMessage("Repeat password is required"),
  RequestHandler.validator,
  usercontroller.ChangePass
);

router.post("/getuser", usercontroller.getUser);

router.post("/cancelmember", usercontroller.cancelmember)

router.post("/postavarta",upload.single('avatar'), usercontroller.postAvarta)

export default router;
