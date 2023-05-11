const mongoose = require('mongoose')

//now every product has schema
const productschema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter youe product name"],
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
    }
    /*
    image:{
        type:String,
        required:false,
    }
    */
},
{
    timestamps:true
}
)

const eshasProduct = mongoose.model('Product', productschema);
//here Product is the name of the collection by which the data is to be stored in the database

//eshasProduct is a model.
module.exports = eshasProduct;