const express=require('express')
const User=require('./model.js')
const asynchandler=require('express-async-handler')

const del=asynchandler(async (req, res) => {
    const userId = req.cookies.userId;
  
    if (userId) {
      const itemId = req.params.itemId;
  
      try {
        const user = await User.findById(userId);
  
        if (!user) {
          return res.json({ message: 'Unauthorized.' });
        }
  
        const itemIndex = user.basket.findIndex((item) => item.id === itemId);
  
        if (itemIndex === -1) {
          return res.json({ message: 'Item not found in the basket.' });
        }
  
        user.basket.splice(itemIndex, 1);
        await user.save();
  
        return res.json({ message: 'deleted' });
      } 
      catch (err) {
        return res.json({ message: 'Error deleting' });
      }
    } 
    else {
      return res.json({ message: 'Unauthorized.' });
    }
  });

  
const update=asynchandler( async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const itemId = req.params.itemId;
  const { name, price, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const basketItem = user.basket.id(itemId);

    basketItem.name = name;
    basketItem.price = price;
    basketItem.quantity = quantity;

    await user.save();
    return res.json({ message: 'updated' });
  } catch (err) {
    return res.json({ message: 'Error' });
  }
});
  module.exports={del,update}