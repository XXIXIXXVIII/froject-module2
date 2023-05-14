import express from "express"
import likeController from "../controller/like.controller.js"

const router = express.Router()

router.post("/post",likeController.postLike)

router.post("/get",likeController.getLike)

router.post("/remove",likeController.removeLike)


export default router