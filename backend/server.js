//npm packages
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

//related files for api call
import notesRoute from './routes/notesRoute.js';  // Importing the notes route
import { sql } from './config/db.js'; //Import sql details

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(helmet({
  contentSecurityPolicy:false,
})); // Security middleware Helmet used to set various HTTP headers for security
app.use(morgan('dev')); // Logging middleware to log HTTP requests with response
app.use(cors()); // Enable CORS for all routes

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

app.use("/api/notebook", notesRoute); // Use the notes route for all requests to /notebook);

if(process.env.NODE_ENV==="production"){
  app.get("/*splat",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

async function initializeDb() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS notebook (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          notes TEXT,
          created_by VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `; 
    console.log("DB Initialized sucessfully");
  } catch (error) {
    console.log(`Error in initialing db with error= ${error}`);
    
  }
}

initializeDb().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
 