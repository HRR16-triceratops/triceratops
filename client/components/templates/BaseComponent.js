/*
	Component Template
	Assumes: that redux store products state is mapped to props.products (usually the case for Containers 
						dealing with products)
	Provides: Reactive server-side fetches, when component initially rendered onto screen
						and also when component re-renders. 
*/
// import omit from 'lodash/omit'; 
import React from 'react';
import { Component } from 'react';
import { fetchUpdatedProducts } from '../../actions/index';

export default class BaseComponent extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUpdatedProducts());
    }

    shouldComponentUpdate(nextProps) {
        // note: synchronous check, may encoutner race from fetchUpdatedProducts in componentDidMount
        return this.props.products !== nextProps.products;
    }

    componentDidUpdate() {
    		const { dispatch } = this.props;
    	 	dispatch(fetchUpdatedProducts());
    }
};
