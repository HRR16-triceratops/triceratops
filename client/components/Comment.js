import React, { Component } from 'react';

export default (props) => {
  return (
    <div className="commentBody">
      <h3 className="commentUser">{props.comment.author}</h3>
      <p className="userComment">{props.comment.content}</p>
      <p className="commentDate">{props.comment.date.toString().slice(0,10)}</p>
    </div>
  );
};
