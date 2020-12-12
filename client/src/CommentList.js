

function CommentList({comments}) {


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
  