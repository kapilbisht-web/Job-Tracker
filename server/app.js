import express from 'express';
import cors from 'cors';
const app = express();
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import testBcryptRoute from './routes/testBcrypt.js';


const PORT = process.env.PORT || 8000;


const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json()); // ✅ This is now correctly placed


app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.use('/api/auth', testBcryptRoute);

app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});


export {app};
