import React from 'react';
import NavBar from '../containers/NavBar'; 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const CoreLayout = ({ children }) => (
  <div>
    
    <NavBar />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {children}
    </MuiThemeProvider>
    
  </div>
);

// CoreLayout.propTypes = {
//   children: React.PropTypes.element.isRequired
// }

export default CoreLayout; 
