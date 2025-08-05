import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import records from "./routes/record.js";
import upload from "./routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/record", records);
app.use("/upload", upload);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});