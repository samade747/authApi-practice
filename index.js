import  express, { json }  from "express";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./db/dbConnection.js";
configDotenv()

import userRouter from "./api/routers/user.router.js";
import ExpressMongoSanitize from "express-mongo-sanitize";

const port  = process.env.PORT;

const app = express()

app.use(ExpressMongoSanitize())
app.use(json());

connectToMongoDB()

app.use("/api/user", userRouter)

// app.get("/", async (req, res)=>{
//     res.send("Server Running")
// })

app.listen(port, () => {console.log(`App running on port ${port}`);})