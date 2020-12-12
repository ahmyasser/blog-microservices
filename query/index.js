const express = require('express');

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
        let {id,content,postId} = req.body.data;
        posts[postId].comments.push({id, content});
    }
console.log(posts);
res.send({});
})

const port= 3002;

app.listen(port,()=>{

    console.log('listening to port ', port)

})