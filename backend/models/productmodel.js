const mongoose =require('mongoose');
// creating product schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxLength:[8,"price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"please Enter product category"],
        
    },
    stock:{
        type:String,
        required:[true,"please Enter product stock"],
        maxLength:[3,"stock cannot exceed more than 999"],
        default:1
        
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
        
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})
// exporting to controller
module.exports=new mongoose.model('product',productSchema);