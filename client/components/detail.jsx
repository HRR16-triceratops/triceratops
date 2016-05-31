import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, History } from "react-router";

console.log('detail page loaded!');

var DetailComponent = React.createClass({
      render: function() {
          return (
            <div>
              <div className="detail">
                <h1>This is a new detail</h1>
              </div>
            </div>
          );
        }
      });

export default DetailComponent;
