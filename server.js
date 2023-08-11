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
app.use(cookieParser({cookieDomain: 'playful-truffle-ca2aa1.netlify.app' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://playful-truffle-ca2aa1.netlify.app',
  credentials: true,
}));


app.use('/',router)

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 8000');
});
