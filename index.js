const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const router = require('./router');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/',router);


connectDB().then(() => {
    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
})
