import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import issueRoute from '../backend/routes/issueRoute.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/issues", issueRoute);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
