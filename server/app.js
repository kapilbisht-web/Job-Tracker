import express from 'express';
import cors from 'cors';
const app = express();
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import testBcryptRoute from './routes/testBcrypt.js';


const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.use('/api/auth', testBcryptRoute);

app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});


export {app};
