import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../actions/index';

// import the actionCreator/thunk
// dispatch it from Login (once hooked up to redux store)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var username = this.state.username.trim();
        var password = this.state.password;
            // checks/validation. Then dispatch thunk. 
        this.props.dispatch(attemptLogin(username, password));
        // did order matter? 
                this.setState({
                username: '',
                password: ''
            })
    }

    render() {
        return (
        <div>
					<div>Login component here</div>
					<form onSubmit={this.handleSubmit.bind(this)}>
						 <input type="text" placeholder="Your username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
						 <input type="text" placeholder="Your password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
						 <input type='submit' value='Post'/>
					 </form>
				</div>
        )
    }
}

Login = connect()(Login);
export default Login;
