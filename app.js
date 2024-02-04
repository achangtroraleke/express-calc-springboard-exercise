const express = require('express');

const Calculator = require('./calclulator');
const ExpressError = require('./expressError');

const app = express();
app.use(express.json());


app.get('/mean', function(req,res, next){
    let params = req.query.nums;
    console.log(params)
    let numbs= new Calculator('mean',params)
    try{
        numbs.mean()
        return res.json(numbs)
    }catch(e){
        console.log(e)
        next(e)
    }
})

app.get('/median', function(req, res, next){
    let params = req.query.nums;
    let numbs= new Calculator('median',params)
    try{
        numbs.median()
        return res.json(numbs)
    }catch(e){
        console.log(e)
        next(e)
    }
})

app.get('/mode', function(req, res, next){
    let params = req.query.nums;
    let numbs= new Calculator('mode',params)
    try{
        numbs.mode()
        return res.json(numbs)
    }catch(e){
        console.log(e)
        next(e)
    }
})

app.use(function(req,res,next){
    const e = new ExpressError("Page Not Found", 404);
    next(e)
})

app.use((error, req, res, next)=>{
    console.log(error.msg);
    const status = error.status || 400
    res.status(status)
    res.send(`Nums not found ERROR: ${status}`)
})



app.listen(3000, function(){
    console.log("App is running on port 3000")
})