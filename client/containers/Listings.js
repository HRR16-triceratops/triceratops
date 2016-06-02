import React from 'react';
import BaseComponent from '../components/templates/BaseComponent';
import SingleListingItemSimple from '../components/SingleListingItemSimple';
import { connect } from 'react-redux';
import { fetchUpdatedProducts } from '../actions/index.js';

class Listings extends BaseComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { products, user, dispatch } = this.props;
        return (
            <div>
              <div className="jumbotron">
                <h1 className="header">Share</h1>
                <h1 className="subHeader col-md-offset-1">Anything</h1>
              </div>
              <div className="shares">
                {products.map((availableItem, ind)=>{
                    return <SingleListingItemSimple key={ind} item={availableItem} user={user}/>
                  })}
              </div>
            </div>
        )
    }
};

const mapStateToStore = (state) => {
    return {
        products: state.products,
        // ui: state.ui, 
        user: state.user
    };
};

export default connect(mapStateToStore)(Listings);
