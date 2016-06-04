import React from 'react';
import NavBar from '../containers/NavBarContainer';
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

export default CoreLayout; 
