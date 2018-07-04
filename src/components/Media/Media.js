import React from 'react';
import './Media.scss';


class Media extends React.Component {

  render () {

    return (
        <div className='media__image'>
          <img src={this.props.media.image} alt='1'/>
         
        </div>
    );
  }
}

export default Media;
