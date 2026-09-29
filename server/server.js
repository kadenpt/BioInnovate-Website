import "./loadEnv.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import upload from "./routes/upload.js";
import blogs from "./routes/blogs.js";
import events from "./routes/events.js";
import emails from "./routes/emails.js";
import auth from "./routes/auth.js";
import requireBearerToken from "./middleware/requireBearerToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is not set");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api", requireBearerToken);
app.use("/upload", requireBearerToken);

app.use("/upload", upload);
app.use("/api/blogs", blogs);
app.use("/api/events", events);
app.use("/api/emails", emails);
app.use("/api/auth", auth);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'uploads')}`);
});