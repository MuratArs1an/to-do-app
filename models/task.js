//mongoose dependencies implement
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

/**
 * @param TaskSchema -mongose ile oluşturulan database şeması
 * @param Task - şemaya uygun olarak oluşturan modelimiz
 */

//creating a schema
const TaskSchema=new Schema({
    name:String,
    status:String
})

//schema adding to mongoose model 
const Task=mongoose.model('task',TaskSchema);

//model export
module.exports=Task;