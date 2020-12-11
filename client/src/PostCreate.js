import Axios from 'axios'
import {useState} from 'react'

function PostCreate() {

    const [title, setTitle] = useState('')
    
    const createPost= async (e)=>{
        e.preventDefault()
        await Axios.post('http://localhost:3000/posts',{title})

        setTitle('');
    }
    
    return (
      <div className="container">
        <form>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={ e => setTitle(e.target.value)}
                 className="form-control" type="text"></input>
         </div>

        <button onClick={e=>createPost(e)} className="btn btn-primary">Submit</button>
       </form>
      </div>
    );
  }
  
  export default PostCreate;
  