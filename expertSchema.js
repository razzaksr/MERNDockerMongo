const mongoose=require('mongoose')

const expertSchema= new mongoose.Schema({
    fullname:{
        type:String
    },
    experience:{
        type:Number
    },
    commercials:{
        type:Number
    },
    expert:{
        type:String
    },
    contact:{
        type:Number
    }
});

// const expert=mongoose.model('expert',expertSchema)
module.exports=expertSchema;