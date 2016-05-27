import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

console.log('new share loaded!');

var CreateShareComponent = React.createClass({
        render: function() {
          return (
            <div>
            <div className="newShare">
              <h1>This is a new share</h1>
              
            </div>
            </div>
          );
        }
      });

export default CreateShareComponent; 
