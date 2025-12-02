const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/config");
const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const tagRoutes = require("./routes/tagRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
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

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
