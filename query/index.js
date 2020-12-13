const express = require('express');

const axios = require('axios');
const util = require('util');

const cors= require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const handleEvent = (type, data)=>{
    if(type === 'PostCreated'){
        let {id, title} = data;
        posts[id]={id,title, comments:[]};
    }
    if(type === 'CommentCreated'){
        let {id,content,postId,status} = data;
        posts[postId].comments.push({id, content, status});
    }
    if(type === 'CommentUpdated'){
        let {id,content,postId,status} = data;
        let comment = posts[postId].comments.find((comment)=>{
            return comment.id === id;
        })
        comment.status=status;
        comment.content=content;
        console.log(posts[postId]);
    }
}

const posts = {}
app.get('/posts',(_,res)=>{

res.send(posts);
})


app.post('/events',(req,res)=>{
   handleEvent(req.body.type, req.body.data);
//console.log(posts);
console.log(util.inspect(posts, false, null, true /* enable colors */))
res.send({});
})

const port= 3002;

app.listen(port, async ()=>{
    console.log('listening to port ', port)

    const {data} = await axios.get('http://localhost:3005/events');

    for(let event of data){
        console.log('event received: ', event.type);
        handleEvent(event.type, event.data);
    }
    
})