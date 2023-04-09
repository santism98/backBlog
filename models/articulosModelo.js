const {Schema,model } = require("mongoose");

const mongoosePaginate=require('mongoose-paginate-v2')

const EntrySchema=new Schema({
    title: {
        type:String,
        required:true,
    },
    stract:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
     },
     image:{
        type:String,
    }

})


EntrySchema.plugin(mongoosePaginate)

module.exports=model("entries",EntrySchema)