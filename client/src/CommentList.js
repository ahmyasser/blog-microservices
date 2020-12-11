import Axios from 'axios'
import {useState, useEffect} from 'react'


function CommentList({postId}) {

    const [comments, setComments] = useState([])
    
    const fetchComments= async ()=>{
        const {data} = await Axios.get(`http://localhost:3001/posts/${postId}/comments`)
        setComments(data);
    }
    
    useEffect(() => {
         fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   const renderComments = Object.values(comments).map(comment =>{

   return <li key={comment.id}>  
            <h4>{comment.content}</h4>
            
        </li>
   })
    return (
      <div className="d-flex flex-wrap">
          <ul>
          {renderComments}
          </ul>
      </div>
    );
  }
  
  export default CommentList;
  