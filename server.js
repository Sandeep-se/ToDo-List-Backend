const express = require('express');
const connectDB = require('./db.js');
const cors = require('cors');
const User=require('./model.js')
const app = express();
const cookieParser = require('cookie-parser');
const router=require('./Router.js')
require('dotenv').config()

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://todo-list-mern-phi.vercel.app/',
  credentials: true,
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'application/json, text/plain, */*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use('/',router)

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 8000');
});
