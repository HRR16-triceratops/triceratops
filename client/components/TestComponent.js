import React, { Component } from 'react';
import { connect } from 'react-redux';

class PreTestComponent extends Component {
		constructor(props){
			super(props);
		}
    render() {
        return (
            <div>
							<div>Test Component is here! Whole redux store state is below.</div>
							<button onClick={()=>{this.props.dispatch({type: 'LOGIN_SUCCESS', payload: {
								username: 'roger',
								displayName: 'Roger S',
								email: 'rs@gmail.com',
								token: 2719284918222
							}})}}>Click here to simulate successful login request!</button>
							<button onClick={()=>{this.props.dispatch({type: 'LOGOUT'})}}>Click here to simulate a logout request!</button>
							<pre>{JSON.stringify(this.props,null,2)}</pre>
						</div>
        );
    }
};
const mapStateToProps = (state) => {
	return state;
};

const TestComponent = connect(mapStateToProps)(PreTestComponent);

export default TestComponent;
