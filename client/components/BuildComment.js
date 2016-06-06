import React from 'react';
import { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class BuildComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
  }

  handleTextChange(e){
    this.setState({
      text: e.target.value
    }); 
  }

  handleSubmit(e){
    e.preventDefault();
    var commentText = this.state.text; 
    this.props.postComment(this.props.user.displayName, new Date(), commentText, this.props.productId); 
    this.setState({
      text: ''
    }); 
  }

  render(){
    return (
      <div className="commentBody">
        <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          floatingLabelText="Comment"
          multiLine={true}
          rows={2}
          value={this.state.text} 
          onChange={this.handleTextChange.bind(this)} 
        />
        <RaisedButton type="submit" label="Comment" />
        <br />
        </form>
      </div>
    ); 
  }

}

export default BuildComment;


