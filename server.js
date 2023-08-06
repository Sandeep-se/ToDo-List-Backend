const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const User=require('./model.js')
const app = express();
const cookieParser = require('cookie-parser');
const router=require('./Router.js')

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/',router)

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
