const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
const cors = require("cors");

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://love-calculator-xi-nine.vercel.app",
      "http://localhost:3000"
    ];

    // Allow requests with no origin (e.g., mobile apps, Postman, or similar)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the incoming origin is allowed
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or auth headers if needed
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://iparwez351412:0sFaWZZIzF67gixh@lovecalculator.krhww.mongodb.net/lovecalculator",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const LoveResultSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  percentage: String,
});

const LoveResult = mongoose.model("LoveResult", LoveResultSchema);

// Routes
app.post("/calculate", async (req, res) => {
  const { name1, name2 } = req.body;

  if (!name1 || !name2) {
    return res.status(400).json({ message: "Both names are required!" });
  }

  const lovePercentage = Math.floor(Math.random() * 100) + 1 + "%";

  const loveResult = new LoveResult({
    name1,
    name2,
    percentage: lovePercentage,
  });

  try {
    await loveResult.save();
    res.status(200).json({ message: `Your love percentage is ${lovePercentage}!` });
  } catch (error) {
    res.status(500).json({ message: "Error saving result." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
