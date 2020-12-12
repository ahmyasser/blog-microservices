import Axios from 'axios'
import {useState, useEffect} from 'react'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

function PostList() {

    const [posts, setPosts] = useState([])
    
    const fetchPosts= async ()=>{
        const {data} = await Axios.get('http://localhost:3002/posts')
        setPosts(data);
     }
    
    useEffect(() => {
         fetchPosts();
         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   const renderPosts = Object.values(posts).map(post =>{

   return <div 
   className="card"
   style={{width:'33%', marginTop:'30PX' }}
    key={post.id} >
        <div className="card-body"> 
            
            <h1>{post.title}</h1>
            <CommentList comments={post.comments}/>
            <CommentCreate postId={post.id}/>
        </div>
    </div>
   })
    return (
      <div className="d-flex flex-row flex-wrap justify-content-between">
          {renderPosts}
      </div>
    );
  }
  
  export default PostList;
  