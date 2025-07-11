import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/books", bookRoutes);

export default app;
