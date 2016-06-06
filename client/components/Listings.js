import React from 'react';
import { Component } from 'react';
import SingleListingItemSimple from '../components/SingleListingItemSimple';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class ListingsComponent extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchUpdatedProducts();
  }

  render () {
    const { products, resetSearch } = this.props;
    return (
      <div>
      <div className="jumbotron">
      <h1 className="header">Share</h1>
      <h1 className="subHeader col-md-offset-1">Anything</h1>
      </div>
      <div className="shares">
      {products.filter !== '' ?
        <AppBar
          className="filterBar"
          title={<span>Filter by : {products.filter}</span>}
          iconElementLeft={<IconButton onClick={resetSearch}><NavigationClose /></IconButton>}
        />
      : null }
      {products.items.filter((item) => {
        if(item.title.concat(item.summary, item.description).toLowerCase().indexOf(products.filter.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      }).map((item)=>{
        return <SingleListingItemSimple key={item._id} item={item}/>
      })}
      </div>
      </div>
    )
  }
}


export default ListingsComponent;
