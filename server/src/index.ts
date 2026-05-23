import app from "./App";
import connectDb from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
