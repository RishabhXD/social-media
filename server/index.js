// Packages Import
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

// Default Packages Import
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import { registerController } from "./controller/auth.js";
import authRoutes from "./routes/auth.js";
import { userRoutes } from "./routes/user.js";
import { postRoutes } from "./routes/post.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controller/post.js";

// Configs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.post("/auth/register", upload.single("picture"), registerController);
app.post("/post", verifyToken, upload.single("picture"), createPost);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
// DB Connection
connectDB();

// Dummy
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listening on port :" + PORT);
});
