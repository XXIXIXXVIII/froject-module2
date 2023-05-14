import ResponseHandler from "../handlers/Response.handler"
import db from "../models/index"
import comment from "../models/comment"

const postCmt = async (req,res) =>{
  try {
    let {username, content, mediaId, time, avarta} = req.body
    console.log(req.body)
    if(!username){
      ResponseHandler.badRequest(res, "not username")
    }
    if(!content){
      ResponseHandler.badRequest(res, "not comment")
    }
    console.log("2")
    db.comment.create({
      username: username,
      avarta:avarta,
      mediaId: mediaId,
      content: content,
      time: time
    })
    return ResponseHandler.ok(res, postCmt)
  } catch (error) {
    return ResponseHandler.error(res)
  }
}

const getCmt = async(req,res) =>{
  try {
    let mediaId1 = req.params.mediaId
    let allCmt = await db.comment.findAll({where:{mediaId:mediaId1}})
    if(!allCmt){ResponseHandler.badRequest(res,"không tìm thấy cmt")}else{
      ResponseHandler.ok(res, allCmt)
    }
  } catch (error) {
    ResponseHandler.error(res)
  }
    
  
}

export default {postCmt, getCmt}