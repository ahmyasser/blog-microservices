const express = require('express');
const bodyParser =require('body-parser');

const axios= require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req,res)=>{
if(req.body.type === 'CommentCreated'){
    let {id, content,postId } = req.body.data;
    let status = content.includes('fuck')? 'rejected':'accepted';
    await axios.post('http://localhost:3005/events',{
        type:'CommentModerated',
        data:{
            id,
            postId,
            content,
            status
        }
    })
}
res.send({status:'OK'});


});




const port=3003;
app.listen(port,()=>{
    console.log('listening to port', port);
})
