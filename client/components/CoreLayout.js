import React from 'react';
import NavBar from '../containers/NavBar'; 

// import classes from './CoreLayout.scss'
// import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    
    <NavBar />
    {children}
    
  </div>
);

// CoreLayout.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

export default CoreLayout; 
