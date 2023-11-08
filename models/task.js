//mongoose dependencies implement
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creating a schema
const TaskSchema=new Schema({
    name:String,
    status:String
})

//schema adding to mongoose model 
const Task=mongoose.model('task',TaskSchema);

//model export
module.exports=Task;