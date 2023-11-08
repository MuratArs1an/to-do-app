//implementains
const express=require('express');
//template engine 
const ejs=require('ejs');
//mongoose for mongoDb 
const mongoose=require('mongoose')

//local host port
const port=3000;
//to-do item 
const Task=require('./models/task');
const app=express();

//mongoDb connection
mongoose.connect('mongodb://127.0.0.1:27017/to-do-db')

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

//Routes
app.get('/', async(req,res)=>{
    const tasks=await Task.find({})
    res.render('index',{
        tasks
    })
})

app.post('/task', async(req,res)=>{
    await Task.create(req.body);
    res.redirect('/')
});

