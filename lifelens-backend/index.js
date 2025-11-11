const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/config");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Milestone 1: JWT + Hashed Password Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
