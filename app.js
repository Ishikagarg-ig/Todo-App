const { request } = require('express');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
const Item = require('./models/items.js');
const mongodb = 'mongodb+srv://todo-app:todoapp23@cluster0.trtqd.mongodb.net/item-database?retryWrites=true&w=majority'

mongoose.connect(mongodb, { useNewUrlParser: true ,useUnifiedTopology: true }).then(()=>{
    console.log('connected')
    app.listen(3000);
}).catch(err => console.log(err))

app.set('view engine','ejs');

// app.get('/create-item',(req,res)=>{
//     const item = new Item({
//         name: 'computer',
//         price: 20000
//     });
//     item.save().then(result=> res.send(result)).catch(err => console.log(err))
// })

// app.get('/get-items',(req,res)=>{
//     Item.find().then(result=> res.send(result)).catch(err => console.log(err))
// })

// app.get('/get-item',(req,res)=>{
//     Item.findById('60ab6c3d5459a737e03781d4').then(result=> res.send(result)).catch(err => console.log(err))
// })

app.get('/',(req,res)=>{
    res.redirect('/get-items')
})

app.get('/get-items',(req,res)=>{
    Item.find().then(result=> {
        res.render('index',{items:result});
    }).catch(err => console.log(err))
})

app.get('/add-item',(req,res)=>{
    // res.sendFile('./views/add-item.html',{root:__dirname})
    res.render('add-item')
})

app.post('/items',(req,res)=>{
    console.log(req.body);
    const item = Item(req.body);
    item.save().then(()=>{
        res.redirect('/get-items')
    }).catch(err => console.log(err))
})

app.get('/items/:id',(req,res)=>{
    const id=req.params.id;
    Item.findById(id).then(result=>{
        console.log(result);
        res.render('item-detail',{item:result})
    })
})
app.use((req,res)=>{
    // res.sendFile('./views/error.html',{root:__dirname})
    res.render('error');
})
