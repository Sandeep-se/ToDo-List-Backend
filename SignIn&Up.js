const express=require('express')
const User=require('./model.js')
const asynchandler=require('express-async-handler')
const cors=require('cors');



const signIn=(async(req, res) => {
  const {username,password}=req.body;
  try {
    const check = await User.findOne({ username: username });
    if (check) {
      if(check.password===password)
      {
        res.cookie('userId', check._id.toString(), { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json("login sucess")
      }
      else{
        res.json('password is incorrect')
      }
    } else {  
      res.json('not exist'); 
    }
  } catch (e) {
    res.json('the id is not valid');
  }
});

const signUp=(async(req, res) => {
  const { username, password } = req.body;
  try {
    const check = await User.findOne({ username: username });
    if (check) {
      res.json('exist');
    } 
    else {
      const newUser = await User.create({ username, password });
      console.log('New user created:', newUser);
      res.json(newUser)
    }
  } catch (e) {
    res.json('notexist');
  }
});

module.exports={signUp,signIn}