import React from 'react'; 
import { Component } from 'react'; 
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';

	const style = {
	  height: 500,
	  width: 500,
	  margin: 20,
	  textAlign: 'center',
	  display: 'inline-block',
	  overflow: 'hidden',
	  position: 'relative'
	};

	

// WARNING! 
// Move this, as this appears to be a Container. 
// Move to containers folder, update all pathnames/pointers

class SingleListingItemDetailed extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		console.log('make AJAX request here using props.params.itemId!');
	}

	render(){
		const fakeData = 
			{
				62834:{
			    id: 62834,
			    title: 'Couch',
			    shortDescription: 'This is a beautiful Couch for sale, you should try it out!',
			    longDescription: 'Oh Sofa so divine, How glad I am that you are mine, A special place for my behind, When wearied from the daily grind, Your pleather coat all soft and comfy, Swallowing up Ol Mr Grumpy, I close my eyes as I sink in, and sip upon my tonic and gin.',
			    img: 'https://www.responsive-checkout.com/demo/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/couch.jpg',
			  	price: 300
			  }, 
			  91020: {
			    id: 91020,
			    title: 'Table',
			    shortDescription: 'A one of a kind table from the 15th century, now renting!',
			    longDescription: 'Knausgaard godard lumbersexual, fashion axe viral meditation umami asymmetrical fixie banjo cold-pressed actually. Blue bottle letterpress umami VHS truffaut biodiesel lomo, 90s man bun. Biodiesel trust fund iPhone tote bag hashtag small batch keffiyeh kale chips fanny pack, DIY wayfarers flexitarian. Pour-over fanny pack cold-pressed pitchfork cornhole fashion axe. XOXO trust fund salvia, master cleanse microdosing yuccie austin williamsburg direct trade try-hard kinfolk asymmetrical thundercats brunch irony. Occupy chartreuse ramps ethical, kombucha art party stumptown crucifix. Pabst synth meh kinfolk irony.',
			    img: 'http://pngimg.com/upload/table_PNG7005.png',
			    price: 400
		  	}, 
		  	102012: {
			    id: 102012,
			    title: 'Hottub',
			    shortDescription: 'Gorgeous and relaxing hottub now available!',
			    longDescription: 'Truffaut swag fap, shabby chic cred umami typewriter pork belly kickstarter meditation hella tofu blog artisan. Master cleanse cronut post-ironic, man bun yr tote bag chillwave polaroid microdosing pitchfork knausgaard portland actually flexitarian. Cliche poutine cold-pressed, microdosing butcher yuccie church-key drinking vinegar direct trade squid. 8-bit direct trade taxidermy bitters austin thundercats, craft beer master cleanse cliche. Trust fund banjo man braid cray, YOLO microdosing taxidermy tilde yuccie skateboard dreamcatcher leggings flannel tumblr. Migas kinfolk authentic, typewriter meggings fap keytar leggings +1. Bespoke single-origin coffee fanny pack, tilde DIY paleo gluten-free lo-fi pop-up bicycle rights 90s etsy kale chips fixie.',
			    img: 'http://connectallplumbing.com/wp-content/uploads/2012/05/hot-tub-and-spa-installer-in-salt-lake-city.jpg',
			    price: 40
		  	}
		  };
		const id = this.props.params.itemId;
		return (
				<div>
					<div className="productBanner">
						<div className='productBody col-md-7'>	
							<Paper zDepth={3}  style={style}>
									<img src={fakeData[id].img} style={{width:'100%', height:'auto'}} />
							</Paper>
						</div>
						<div className='productBody col-md-5'>	
							<h3>{fakeData[id].title}</h3>
							<p><b>Details: </b>{fakeData[id].longDescription}</p>
							<h3>${fakeData[id].price}.00</h3>
							<DatePicker style={{width:'60%',float:'left'}} hintText="Pick a date..." />
							
								<RaisedButton label="Rent" style={{float:'right'}}/>
							
						</div>
					</div>
				</div>
			)
	}
} 

const mapStateToProps = function(state){
	return {products: state.products};
}
SingleListingItemDetailed = connect(mapStateToProps)(SingleListingItemDetailed);
export default SingleListingItemDetailed;