const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

//Home Route
app.get("/", (req, res) => {
  //(res,req)incorrect order (req,res) correct order
  res.send("API is running...");
});
// Middleware for CORS
// Use the cors middleware to allow requests from your frontend origin
app.use(
  cors({
    origin: "https://whispering-pages-admin-panel.vercel.app/", // Replace with your frontend URL
  })
);

app.use("/api/products", productRoutes);

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
