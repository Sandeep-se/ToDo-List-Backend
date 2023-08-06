const express=require('express')
const User=require('./model.js')
const asynchandler=require('express-async-handler') 

const add=asynchandler(async (req, res) => {
    const { name, price, quantity } = req.body;
   
    const userId =req.cookies.userId;  
    if (!userId) {
      return res.json({ message: 'Unauthorized.' });
    }
   
    try {
      const user = await User.findById(userId);
      user.basket.push({ name, price, quantity });
      await user.save();
      return res.json({ message: 'added ' });
    } 
    catch (err) {
      return res.json({ message: 'Error' });
    }
  });

  const get=asynchandler(async (req, res) => {
    const { username } = req.query;
    // console.log(username)
    try {
      const user = await User.findOne({ username }); 
      if (!user) {
        return res.json({ message: 'User not found.' });
      }
  
      const basket = user.basket;
      return res.json({ basket });
    } catch (err) {
      return res.json({ message: 'Error ' });
    }
  });
  module.exports={add,get}