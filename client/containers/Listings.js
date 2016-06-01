import React from 'react';
import SingleListingItemSimple from '../components/SingleListingItemSimple';


const Listings = () => {

  var fakeData = [{
    id: 62834,
    title: 'Couch',
    description: 'This is a beautiful Couch for sale, you should try it out!',
    img: 'https://www.responsive-checkout.com/demo/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/couch.jpg'
  }, {
    id: 91020,
    title: 'Table',
    description: 'A one of a kind table from the 15th century, now renting!',
    img: 'http://pngimg.com/upload/table_PNG7005.png'
  }, {
    id: 102012,
    title: 'Hottub',
    description: 'Gorgeous and relaxing hottub now available!',
    img: 'http://connectallplumbing.com/wp-content/uploads/2012/05/hot-tub-and-spa-installer-in-salt-lake-city.jpg'
  }];

  return (
    <div>
      <div className="jumbotron">
        <h1 className="header">Share</h1>
        <h1 className="subHeader col-md-offset-1">Anything</h1>
      </div>
      <div className="shares">
        {fakeData.map((item, ind)=>{
          return <SingleListingItemSimple key={ind} item={item}/>
        })}
      </div>
    </div>
    )
};

export default Listings;
