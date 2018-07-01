import React from 'react';
import './Media.scss';


class Media extends React.Component {

  render () {

    return (
        <div className='media__image'>
          <img src={this.props.media.image} alt='1'/>
          <h2 className='likes'>{this.props.media.likes}</h2>
          <h2 className='title'>{this.props.media['title']}</h2>
        </div>
    );
  }
}

export default Media;
