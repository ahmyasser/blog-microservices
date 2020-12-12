const express = require('express');
const axios =require('axios');

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

app.post('/posts', async (req,res)=>{
    console.log(req.body)
    let id = randomBytes(4).toString('hex');
    
    let {title} = req.body;
    posts[id]= {
        id,
        title
    };

    await axios.post('http://localhost:3005/events',{
        type:'PostCreated',
        data:{
            id, title
        }
    })
    res.status(201).send(posts[id]);

})


app.post('/events',(req,res)=>{
    console.log('Event Received ', req.body.type);

    res.send({})
})

const port = 3000;
app.listen(port,()=>{
    console.log('listening to port ',port );
})