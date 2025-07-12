import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";

import authRoutes from "./routes/auth.js";
import booksRoutes from "./routes/books.js";
import myBooksRoutes from "./routes/myBooks.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/mybooks", myBooksRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
