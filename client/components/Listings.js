import React from 'react';
import { Component } from 'react';
import SingleListingItemSimple from '../components/SingleListingItemSimple';

class ListingsComponent extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchUpdatedProducts();
  }

  render () {
    const { products } = this.props;
    return (
      <div>
      <div className="jumbotron">
      <h1 className="header">Share</h1>
      <h1 className="subHeader col-md-offset-1">Anything</h1>
      </div>
      <div className="shares">
      {products.items.map((item)=>{
        return <SingleListingItemSimple key={item._id} item={item}/>
      })}
      </div>
      </div>
    )
  }
}


export default ListingsComponent;
