import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import cors from 'cors';
import userRouter from './Router/userRouter.js'
dotenv.config();
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
  origin: ["http://localhost:5173"],
    credentials: true,
  })
); // Adjust the origin as needed


const PORT = process.env.PORT;

app.use('/api/users', userRouter);


app.get('/', (req, res) => {
    res.send('Server is running...');
});

const startServer = async () => {
    try {
        await connectDB(); // Pehle DB connect karo
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server start failed:", error);
        process.exit(1);
    }
};

startServer();