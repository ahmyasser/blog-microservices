const express = require('express');
const util = require('util');

const cors= require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const posts = {}
app.get('/posts',(_,res)=>{

res.send(posts);
})

app.post('/events',(req,res)=>{
    if(req.body.type === 'PostCreated'){
        let {id, title} = req.body.data;
        posts[id]={id,title, comments:[]};
    }
    if(req.body.type === 'CommentCreated'){
        let {id,content,postId,status} = req.body.data;
        posts[postId].comments.push({id, content, status});
    }
    if(req.body.type === 'CommentUpdated'){
        let {id,content,postId,status} = req.body.data;
        let comment = posts[postId].comments.find((comment)=>{
            return comment.id === id;
        })
        comment.status=status;
        comment.content=content;
        console.log(posts[postId]);
    }
//console.log(posts);
console.log(util.inspect(posts, false, null, true /* enable colors */))
res.send({});
})

const port= 3002;

app.listen(port,()=>{

    console.log('listening to port ', port)

})