import app from "./App";
import connectDb from "./config/db";

connectDb();

app.listen(3000, () => {
    console.log("Server is running on port localhost:3000");
});
