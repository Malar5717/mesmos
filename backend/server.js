// entry point of backend 

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user_router = require('./routes/UserRoutes');
const pola_router = require('./routes/PolaRoutes');
const cookieparser = require('cookie-parser');

// express is the web framework
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieparser());

// connect is a Promise, connect then listen - "connected?"
const mongoDB = process.env.MONGODB_URL; 
mongoose.connect(mongoDB).then(()=> {
    app.listen(3000,()=>{
        console.log("connected to DB");
    });
});

// parent route for all 
app.use('/user',user_router);
app.use('/pola',pola_router);
app.get('/',(req, res)=>{
    res.json({msg:"hello"})
})

