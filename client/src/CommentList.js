
function CommentList({comments}) {

  
   const renderComments = Object.values(comments).map(comment =>{
    let content;
    switch(comment.status) {
      case 'pending':
        content='Content is being reviewed';
        break;
      case 'rejected':
        content='Contented Rejected';
        break;
      case 'accepted':
        content=comment.content
        break;
      default:
        content='';
    }

   return <li key={comment.id}>  
            <h4>{content}</h4>
            
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
  