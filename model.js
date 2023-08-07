const mongoose=require('mongoose')

const productSchema=mongoose.Schema(
    {
        username: String,
        password: String,
        basket: [
          {
            name: String,
            price: Number,
            quantity: Number,
          },  
        ],
    }
)
const Items=mongoose.model('Items',productSchema)

module.exports=Items