import React from "react";
import PropTypes from "prop-types";
import { base } from '../rebaseConfig/firebase';
/**
 * source: https://www.javascriptstuff.com/react-image-gallery/
 * Given a DOM element, searches it for <img> tags and checks if all of them
 * have finished loading or not.
 * @param  {Element} parentNode
 * @return {Boolean}
 */
function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
   
    };
  }
//   componentWillMount() {
//       this.imageRef = base.syncState('imageUrls', {
//           context: this,
//           state: 'imageUrls',
//           asArray: true
//       });
//   }
  
//   componentWillUnmount() {
//       base.removeBinding(this.imageRef);
//   }
  
  handleImageChange = () => {
    this.setState({
      loading: !imagesLoaded(this.galleryElement)
    });
  };

  renderSpinner() {
    if (!this.state.loading) {
      return null;
    }
    return <span className="spinner" />;
  }

  renderImage(imageUrl) {
    return (
      <div >
        <img
          src={imageUrl.src}
          onLoad={this.handleImageChange}
          onError={this.handleImageChange}
          alt='1'
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className="gallery"
        ref={element => {
          this.galleryElement = element;
        }}
      >
        {this.renderSpinner()}
        <div className="images">
          {this.props.imageUrls.map((imageUrl) => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Gallery;