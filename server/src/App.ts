import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routes/admin.route";


dotenv.config();
const app = express();
app.use(express.json());

//allow cross origin meaning we can access the backend from the frontend
const ALLOWED_CORS =  process.env.ALLOWED_CORS;
if(!ALLOWED_CORS){
    throw new Error("ALLOWED_CORS is not defined");
}
app.use(cors(
    {
        origin: ALLOWED_CORS,
        credentials: true
    }
));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//admin routes
app.use("/api", adminRouter);

export default app;