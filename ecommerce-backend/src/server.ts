import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import swaggerSpec from "./config/swagger";
import connectDB from "./config/database";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "E-commerce API is running",
  });
});

// Product routes
app.use("/api/products", productRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const startServer = async (): Promise<void> => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();