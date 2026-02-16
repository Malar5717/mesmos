require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user_router = require('./routes/UserRoutes');
const pola_router = require('./routes/PolaRoutes');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(helmet());
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

const mongoDB = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(mongoDB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log("Connected to MongoDB");
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    });

app.use('/user', user_router);
app.use('/pola', pola_router);

app.get('/', (req, res) => {
    res.json({ msg: "running" });
});

app.use((req, res) => {
    res.status(404).json({ msg: "route not found" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Server error. Please try again." });
});

