import express from "express"
import useRouter from "./user.route.js"
import mediaRoute from "./media.router.js"
import cmtRoute from "./cmt.router.js"
import likeRouter from "./Like.router.js"


const router = express.Router()

router.use("/user",useRouter)

router.use("/cmt", cmtRoute)

router.use("/like", likeRouter)

router.use("/:mediaType", mediaRoute)

router.use("/discover", mediaRoute)




export default router