const express = require('express');
const axios =require('axios');
const {randomBytes} = require('crypto');

const bodyParser =require('body-parser');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors());


const postComments= {};
app.get('/posts/:id/comments',(req,res)=>{
    console.log('get',req.params.id,postComments[req.params.id])
    res.status(201).send( postComments[req.params.id] || [] );
});
app.post('/posts/:id/comments',async (req,res)=>{
    let comments= postComments[req.params.id] || [];
    
    let id = randomBytes(4).toString('hex');
    let {content} = req.body;
    
    let comment= {
        id,
        content,
        status:'pending'
    }

    comments.push(comment);
    postComments[req.params.id]= comments;
    
    await axios.post('http://localhost:3005/events',{
        type:'CommentCreated',
        data:{
        id,
        content,
        postId:req.params.id,
        status:'pending'
    }}
    ) 
    res.status(201).send(comments);

} );

app.post('/events', async (req,res)=>{
    console.log('Event Received ', req.body.type);

    if(req.body.type === 'CommentModerated'){
        let{id, postId, content, status} = req.body.data;
      
        let comment = postComments[postId].find((comment)=>{
            return comment.id === id
        })

        comment.status=status;
            
        await axios.post('http://localhost:3005/events', {
        type:'CommentUpdated',
        data:{                id,
            postId,
            content,
            status
        }        })

    }

    res.send({})
})

const port=3001;

app.listen(port, ()=>{

    console.log('listening to port ', port);
})