const express = require('express');

const bodyPraser = require('body-parser');
const cors= require('cors');

const {randomBytes} = require('crypto');

const app = express();

app.use(bodyPraser.json());
app.use(cors());

const posts= {};

app.get('/posts', (req,res)=>{
    res.send(posts)
})

app.post('/posts', (req,res)=>{
    console.log(req.body)
    let id = randomBytes(4).toString('hex');
    
    let {title} = req.body;
    posts[id]= {
        id,
        title
    };

    res.status(201).send(posts[id]);

})
const port = 3000;
app.listen(port,()=>{
    console.log('listening to port ',port );
})