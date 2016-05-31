import React from 'react';
import SingleListingItemSimple from '../components/SingleListingItemSimple';

const Listings = () => {

    var fakeData = [{
    		id: 62834,
        title: 'Couch',
        description: 'This is a beautiful Couch for sale, you should try it out!',
    }, {
    		id: 91020,
        title: 'Table',
        description: 'A one of a kind table from the 15th century, now renting!'
    }, {
    		id: 102012,
        title: 'Hottub',
        description: 'Gorgeous and relaxing hottub now available!'
    }];

    return (
        <div>
	        <h3>Listings Component here!</h3>
	        {fakeData.map((item, ind)=>{
	        	return <SingleListingItemSimple key={ind} item={item}/>
	        })}
        </div>
    )
};

export default Listings;
