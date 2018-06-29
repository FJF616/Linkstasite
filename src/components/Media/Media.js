import React from 'react';
import './Media.css';


class Media extends React.Component {

  render () {
    return (
        <div className='image'>
          <img src={this.props.media.image} alt='1'/>
          <h2 className='likes'>{this.props.media.likes}</h2>
          
        </div>
    );
  }
}

export default Media;
