const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Middleware for CORS - must be before routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://whispering-pages-admin-panel.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Home Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

//User Routes
app.get("/api/user", userRoutes);

//Auth Routes
app.use("/api/auth", authRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  });
