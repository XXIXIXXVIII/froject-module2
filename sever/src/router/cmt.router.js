import express from "express"
import cmtController from "../controller/cmt.controller"

const router = express.Router()

router.post("/post/",cmtController.postCmt )

router.get("/getcmt/:mediaId",cmtController.getCmt)

export default router