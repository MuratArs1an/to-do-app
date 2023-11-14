//implementains
const express=require('express');
//template engine 
const ejs=require('ejs');
//mongoose for mongoDb 
const mongoose=require('mongoose')
//methodOverride implement for unsupport put and delete request browser
const methodOverride=require('method-override')
//controller import
const taskController=require('./controllers/taskController')

/**
 * @param port -Dinlenecek port
 */
const port=3000;
const app=express();

//mongoDb connection
//mongoose.connect('mongodb://127.0.0.1:27017/to-do-db')

//Template engine
app.set('view engine','ejs');

//connection test
app.listen(port,()=>{
    console.log(`sunucu ${port} portunda baslatıldı`);
})

//MIDDLEWARES
app.use(express.static('public')); //static dosyalarımız tanımladık
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

//Routes
app.get('/',taskController.getAllTasks );
app.post('/task', taskController.createTask);
app.get('/task/edit/:id', taskController.getTask);
app.put('/task/:id', taskController.updateTask);
app.delete('/task/:id', taskController.deleteTask);

module.exports=app;