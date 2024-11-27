let express = require("express")
let app = express();
let cors = require("cors")
app.use(cors())
app.use(express.json())

///////for mongose/////
const mongoose = require('mongoose')
let dbURL = "mongodb://127.0.0.1:27017/todoApp";
mongoose.connect(dbURL)
.then(()=>{
    console.log("connecteed.....")
})
.catch((error)=>{
    console.log(error)
})


const Schema = mongoose.Schema
const myNewSchema = new Schema({
    task:String,
    duedate:{ type: Date, default: Date.now },
    compdate:String,
    status:{ type: String, default: 'Pending' }
})

const myModal = mongoose.model('myModal', myNewSchema, 'tasks')
///////////////



app.get('/task',(req, res)=>{
    myModal.find({})           
    .then((result)=>{
        res.send(result)
    })
    .catch((error)=>{
        res.send(error)
    })
})

app.post('/task',async(req, res)=>{
    try{
    let newTask = req.body
    let data = await myModal.create(newTask)
    res.send(data)
    }
    catch(error){
        res.send(error)
    }
}) 

app.delete('/task/:_id',async(req, res)=>{
    try{
    let newTask = req.params._id
    let data = await myModal.deleteOne({_id:newTask})
    res.send(data)
    }
    catch(error){
        res.send(error)
    }
}) 

app.put('/task/:_id',async(req, res)=>{
    try{
        let id = req.params._id
    let newTask = req.body
    let data = await myModal.findOneAndUpdate({_id:id},
        newTask, {new:true})
    res.send(data)
    }
    catch(error){
        res.send(error)
    }
}) 


app.listen(5000, ()=>{
    console.log('server is running 🐇')
})