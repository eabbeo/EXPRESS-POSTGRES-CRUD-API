import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use("/api", userRoutes);

//Error handling
app.use(errorHandling)

//Create tables before starting server
createUserTable();

//Testing posgress connection
app.get("/", async(req, res)  => {
    console.log("start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`);
})

//Server running
app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
})

