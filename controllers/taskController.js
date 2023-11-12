//to-do item 
const Task=require('../models/task');

/**
 * @function getAllTasks -Butun to-do itemleri getirir
 * @function createTask -Yeni bir to-do itemleri olusturma
 * @function getTask -id ye göre to-do item getirir
 * @function updateTask -id ye göre seçilen to-do itemi güncelleme
 * @function deleteTask -id ye göre seçili to-do itemı siler
 */

exports.getAllTasks=async(req,res)=>{
    const tasks=await Task.find({})
    res.render('index',{
        tasks
    })
};

exports.createTask=async(req,res)=>{
    await Task.create(req.body);
    res.redirect('/')
};

exports.getTask=async(req,res)=>{
    const task=await Task.findOne({_id:req.params.id})
    res.render('edit',{
        task
    })
};

exports.updateTask=async(req,res)=>{
    try {
        const task = await Task.findOne({ _id: req.params.id });

        if (!task) {
            return res.status(404).send("Task not found");
        }
        task.name = req.body.name;
        task.status = req.body.status;
        await task.save();

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteTask=async(req,res)=>{
    await Task.deleteOne({_id:req.params.id})
    console.log(req.params.id);
    res.redirect('/')
};
