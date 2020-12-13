import Axios from 'axios'
import {useState} from 'react'

function CommentCreate({postId}) {

    const [content, setContent] = useState('')
    
    const createComment= async (e)=>{
        e.preventDefault();
        if(content){
        await Axios.post(`http://localhost:3001/posts/${postId}/comments`,{content})

        setContent('');
        }
    }
    
    return (
      <div className="container">
        <form>
            <div className="form-group">
                <input value={content} onChange={ e => setContent(e.target.value)}
                 className="form-control" type="text"></input>
         </div>

        <button onClick={e=>createComment(e)} className="btn btn-primary">Submit</button>
       </form>
      </div>
    );
  }
  
  export default CommentCreate;
  