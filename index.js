const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const schema=require('./expertSchema');
const model = mongoose.model('expert', schema);

const app = express();
app.use(express.json())
app.use(cors())

// MongoDB connection
// mongoose.connect('mongodb://mongodb:27017/hello')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

mongoose.connect('mongodb://localhost:27017/hello')


// Express API
app.get('/', (req, res) => {
  res.send('Hello from Express.js API!');
});

app.get('/view',async(req,res)=>{
    const all = await model.find()
    res.status(200).json(all)
})

app.get('/:id',async(req,res)=>{
    const data=await model.findById(id=req.params.id)
    res.json(data)
})

app.get('/skill/:expert',async(req,res)=>{
    const data=await model.findOne({expert:req.params.expert})
    res.json(data)
})

app.put('/',async(req,res)=>{
    //const data=await model.findOneAndUpdate(id=req.body._id,req.body,{new:true})
    console.log(req.body)
    const data=await model.updateOne({_id:req.body._id},req.body,{upsert: true})
    res.json(data)
})

app.delete('/:id',async(req,res)=>{
    const data=await model.findById(id=req.params.id)
    await model.findByIdAndDelete(id=req.params.id)
    res.json(data.fullname+" has deleted");
})

app.delete('/del/:name',async(req,res)=>{
    const data=await model.findOne({fullname:req.params.name})
    await model.findOneAndDelete({fullname:req.params.name})
    res.json(data.fullname+" has deleted");
})


app.post('/new',async(req,res)=>{
    const tec=new model({
        fullname:req.body.fullname,
        contact:req.body.contact,
        expert:req.body.expert,
        experience:req.body.experience,
        commercials:req.body.commercials
    })
    const data=await tec.save()
    res.json(data)
})

app.listen(1000, () => {
  console.log(`Express app listening at 1000`);
});
