import React from 'react';
import { Component } from 'react';
import Comment from './Comment';
import BuildComment from './BuildComment';

class CommentList extends Component {
  constructor(props){
    super(props);
    this.state = {
      commentsLoading: false
    };
  }

  renderComments(user, comments) {
    if (typeof comments === 'undefined' || comments.length === 0) {
      return <h3>Add Comments!</h3>;
    }
    return comments.map((comment, ind) => {
      return <Comment key={ind} comment={comment}/>;
    });
  }


  renderLoadingSpinner(){
    return (
      <div>Loading...</div>
    );
  }

  render(){
    const { user, postComment, item} = this.props;
    return(
      <div className="comments">
        <h2>Comments:</h2>
        <BuildComment user={user} postComment={postComment} productId={this.props.productId}/>
        {this.state.commentsLoading ? this.renderLoadingSpinner(): this.renderComments(user, item.comments)}
      </div>
    )
  }
};

export default CommentList;
