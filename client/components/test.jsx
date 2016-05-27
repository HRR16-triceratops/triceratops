import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, IndexRoute, Link, History } from "react-router";

var TestComponent = React.createClass({
        render: function() {
          return (
            <div>
              <h1>Test component</h1>
              <h1>{this.props.location.pathname}</h1>
            </div>
          );
        }
     });

export default TestComponent; 





