import express from "express"
import mediaController from "../controller/media.controller.js"


const router = express.Router({ mergeParams: true})

router.get("/detail/:mediaId", mediaController.getDetail);

router.get("/genre", mediaController.getListGenres)

router.get("/search",mediaController.getDataSearch)

router.get("/:mediaCategory", mediaController.getList)

router.get("/:mediaId/:mediaOption", mediaController.getOption)

router.get("/:mediaType", mediaController.getLitMediaType)



export default router