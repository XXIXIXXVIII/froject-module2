import ResponseHandler from "../handlers/Response.handler";
import db from "../models/index";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res) => {
  try {
    const { username, password, gmail } = req.body;
    const hashPassword = bcrypt.hashSync(password, salt);
    console.log("da vao signup");
    const checkUser = await db.User.findOne({ where: { username } });
    console.log(checkUser);
    if (checkUser) {
      console.log("checkUser");
      return ResponseHandler.badRequest(res, "same username");
    } else {
      await db.User.create({
        username: username,
        password: hashPassword,
        gmail: gmail,
      });
      return ResponseHandler.ok(res, { username });
    }
  } catch (error) {
    console.log("error");
    ResponseHandler.error(res);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({
    where: { username: username },
  });
  if (!user) {
    return ResponseHandler.badRequest(res, "Account not found");
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return ResponseHandler.badRequest(res, "Wrong password");
  }
  let usernamee = user.username
  let avarta = user.avarta
  let result = {usernamee, avarta}
  console.log(result)
  return ResponseHandler.ok(res, result);
};

const getUser = async (req, res) => {
  const { username } = req.body;
  const user = await db.User.findOne({ where: { username: username } });
  try {
    if (user) {
      ResponseHandler.ok(res, { user });
    } else {
      ResponseHandler.badRequest(res, "fail");
    }
  } catch (error) {
    ResponseHandler.error(res);
  }
};

const ChangePass = async (req, res) => {
  const { oldPass, newPass, repeatNewPass, username } = req.body;
  // console.log(oldPass,newPass,repeatNewPass, username)
  let user = await db.User.findOne({ where: { username: username } });
  if (!user) {
    return ResponseHandler.badRequest(res, "some thing wrong");
  }
  let check = bcrypt.compareSync(oldPass, user.password);
  console.log(check);
  if (!check) {
    return ResponseHandler.badRequest(res, "Old Password wrong");
  }
  if (oldPass === newPass) {
    return ResponseHandler.badRequest(
      res,
      "Old and new password must be different"
    );
  }
  if (newPass !== repeatNewPass) {
    return ResponseHandler.badRequest(
      res,
      "New and repeat password must be different"
    );
  } else {
    let hashPassword = bcrypt.hashSync(newPass, salt);
    user.password = hashPassword;
    await user.save();
    return ResponseHandler.ok(res, { username });
  }
};

const postAvarta = async(req, res) => {
  try {
    let {urlImg, username} = req.body
    if(urlImg, username){
      let user = await db.User.findOne({where:{username:username}})
      if(user){
        user.avarta = urlImg
        await user.save()
        return ResponseHandler.ok(res, urlImg)
      }else{return ResponseHandler.error}
    }
  } catch (error) {
    return ResponseHandler.error
  }
};

const cancelmember = async(req,res)=>{
  const {pass, username} = req.body
  try {
    const user = await db.User.findOne({where:{username:username}})
    if(user){
      const check = bcrypt.compareSync(pass, user.password)
      if(check){
        db.User.destroy({where:{username:user.username}})
        console.log("thanh cong")
        return ResponseHandler.ok(res)
      }else{
        return ResponseHandler.badRequest(res, "password Wrong")
      }
    }else{ResponseHandler.error(res)}
  } catch (error) {
    ResponseHandler.error(res)
  }
}

export default { signup, login, getUser, ChangePass,cancelmember,postAvarta };
