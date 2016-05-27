import React from 'react';
import ReactDOM from 'react-dom'; 
import NavComponent from './nav.jsx';

console.log('detail page loaded!');

var DetailComponent = React.createClass({
        render: function() {
          return (
            <div>
               {/*<NavComponent  />*/}
            <div className="detail">
              <h1>This is a new detail</h1>
            </div>
            </div>
          );
        }
      });

export default DetailComponent; 