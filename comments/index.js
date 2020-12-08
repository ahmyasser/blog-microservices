const express = require('express');
const {randomBytes} = require('crypto');

const bodyParser =require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors());


const postComments= {};
app.get('/posts/:id/comments',(req,res)=>{
    
    res.status(201).send( postComments[req.params.id] || [] );

});
app.post('/posts/:id/comments',(req,res)=>{
    let comments= postComments[req.params.id] || [];
    
    let id = randomBytes(4).toString('hex');
    let {content} = req.body;
    
    let comment= {
        id,
        content
    }

    comments.push(comment);
    postComments[req.params.id]= comments;
    res.status(201).send(comments);

} );
app.get('/test',(req,res)=>{
    res.send('working');
})
const port=3001;

app.listen(port, ()=>{

    console.log('listening to port ', port);
})