import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
import connection from "./config/database.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

//MogoDB Connection
connection();

app.use(
  cors({
    origin: [
      "https://auth-123.netlify.app",
      "http://localhost:3000",
      // Add more origins as needed
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (if needed)
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log("Listing to", PORT);
});

app.get("/", (req, res) => {
  res.send("Hello");
});
