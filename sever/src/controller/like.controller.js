import ResponseHandler from "../handlers/Response.handler";
import db from "../models/index.js";

const postLike = async (req, res) => {
  try {
    const { mediaType, mediaId, username, mediaImg } = req.body;
    const check = await db.like.findAll({
      where: {
        username: username,
        mediaType: mediaType,
        movieId: mediaId,
        mediaImg: mediaImg,
      },
    });

    if (check.length > 0) {

      return ResponseHandler.badRequest(res, "already exist");
    } else {

      db.like.create({
        username: username,
        mediaType: mediaType,
        movieId: mediaId,
        mediaImg: mediaImg,
      });
    }
  } catch (error) {
    ResponseHandler.error(res);
  }
};

const getLike = async (req, res) => {
  const { username } = req.body;
  try {
    const likeList = await db.like.findAll({ where: { username: username } });
    if (likeList) {
      return ResponseHandler.ok(res, likeList);
    } else {
      return ResponseHandler.badRequest(res, "already in my list");
    }
  } catch (error) {
    ResponseHandler.error(res);
  }
};

const removeLike = async (req,res)=>{
  const {username,mediaId} = req.body
  try {
    await db.like.destroy({where:{username:username, movieId:mediaId}})
    .then(()=>{
      ResponseHandler.ok(res)
    })
    .catch(()=>{
      ResponseHandler.badRequest(res,"remove failed")
    })
  } catch (error) {
    ResponseHandler.badRequest(res,"remove failed")
  }
}

export default { postLike, getLike, removeLike };
