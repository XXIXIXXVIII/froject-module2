import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./src/router/index.js"

require('dotenv').config()
let app=express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/",routes)




let port = process.env.PORT || 6969

app.listen(port, console.log("Nodejs running PORT:"+port))
