const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Result =require('./modules/result')
const cors = require('cors');
const Question=require('./modules/Question.js');
const logindata =require('./modules/logindata.js');
const studentlogindata =require('./modules/studentdata');

const qs = require('qs');


mongoose.connect('mongodb+srv://kaushal:kaushalpatel@cluster0.2dz2gyb.mongodb.net/hotelbookinginfo').then(()=>{
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
 

app.get('/logindatas',async (req,res)=>{
    const datas = await logindata.find();
    res.send(datas);
});

app.get('/paneluser', async (req, res) => {
    const datas = await logindata.find({ $or: [{ user: "admin" }, { user: "superadmin" }] });
    res.send(datas);
});
app.get('/paneluser/:userid', async (req, res) => {
    const { userid } = req.params;
    const datas = await logindata.findOne({_id:userid});
    res.send(datas);
});

app.get('/logindata/:name/:password',async (req,res)=>{
    const { name, password } = req.params;
    const datas = await logindata.findOne({ name, password});
    res.send(datas);
});
app.get('/logindatanamecheck/:name',async (req,res)=>{
    const { name } = req.params;
    const datas = await logindata.find({ name });
    res.send(datas);
});

app.post('/logindata', async (req, res) => {
    const datas = new logindata();
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.password=req.body.password;
    datas.user = req.body.user;

    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
    
});


app.put('/logindata/:id', async (req, res) => {
    const datas = await logindata.findOne({ _id: req.params.id });
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.password=req.body.password;
    datas.user = req.body.user;
    await datas.save(); // Fix the variable name here
    res.send(datas);
});


app.delete('/logindata/:id',async (req,res)=>{
    const datas = await logindata.deleteOne({_id:req.params.id});
    res.send(datas);
});

app.get('/api/questions', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
    console.log(questions);

});

app.delete('/api/questions/:id',async (req,res)=>{
    const datas = await Question.deleteOne({_id:req.params.id});
    res.send(datas);
});

app.get('/api/questions/:language', async (req, res) => {
      const questions = await Question.find({ language: req.params.language });
      res.json(questions);
      console.log(questions);
  
  });



//student login data

app.get('/studentlogindata/:name/:password',async (req,res)=>{
    const { name, password } = req.params;
    const datas = await studentlogindata.findOne({ name, password});
    res.send(datas);
});

app.get('/studentlogindatanamecheck/:name',async (req,res)=>{
    const { name } = req.params;
    const datas = await studentlogindata.find({ name });
    res.send(datas);
});
app.get('/userdetals',async (req,res)=>{
    const datas = await studentlogindata.find();
    res.send(datas);
});


app.post('/studentlogindata', async (req, res) => {
    const datas = new studentlogindata();
    datas.name = req.body.name;
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    datas.password=req.body.password;


    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
    
});
app.put('/studentlogindata/:username', async (req, res) => {
    const datas = await studentlogindata.findOne({ name: req.params.username });
    datas.phone = req.body.phone;
    datas.email = req.body.email;
    await datas.save(); // Fix the variable name here
    res.send(datas);
});







  app.get('/results', async (req, res) => {
    const questions = await Result.find();
    res.json(questions);
    console.log(questions);

});
app.get('/results/:name', async (req, res) => {
    const questions = await Result.find({name:req.params.name});
    res.json(questions);
    console.log(questions);

});
  
app.post('/result', async (req, res) => {
    const datas = new Result();
    datas.name = req.body.name;
    datas.language = req.body.language;
    datas.total = req.body.total;
    datas.correct=req.body.correct;
    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);
    
});
app.post('/api/Add-quiz', async (req, res) => {
       // Parse the query string to get the data sent from the client
      
       console.log('Received request body:', req.body);

       const { language, question } = req.body;
       languagee = language.toLowerCase();
       const answers = [];
       for (let i = 0; i < 4; i++) {
         const text = req.body[`answers[${i}][text]`];
         const isCorrect = req.body[`answers[${i}][isCorrect]`] === 'true'; // Convert string to boolean
         if (isCorrect) {
           answers.push({ text, isCorrect });
         }
         else{
            answers.push({ text });
         }
       }
     
       console.log('Language:', language);
       console.log('Question:', question);
       console.log('Answers:', answers);
   
    const datas = new Question({
        question:req.body.question,
        answers: answers,
        language:languagee
      });
    const registered = await datas.save(); // Fix the variable name here
    res.send(registered);

 
    console.log(req.body.answers)
});


app.listen(8081,()=>{
    console.log("Server started at @ 8081");
});
})