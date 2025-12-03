const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/config");
const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const tagRoutes = require("./routes/tagRoutes");
const aiRoutes = require("./routes/aiRoutes");
const profileRoutes = require("./routes/profileRoutes");
const heatmapRoutes = require("./routes/heatmapRoutes");
const highlightRoutes = require("./routes/highlightRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/highlights", highlightRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
