import React, {Component} from 'react';

export default class Imager extends Component {  
    render() {
      let {mode, src, height, width, style, padding, ...props} = this.props;
      let modes = {
        'fill': 'cover',
        'fit': 'contain'
      };
      let size = modes[mode] || 'contain';
  
      let defaults = {
        height: height || 100,
        width: width || 100,
        margin: '13px',
        mode: 'fit',
        
        
      };
  
      let important = {
        
        backgroundImage: `url("${src}")`,
        backgroundSize: size,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      };
  
      return <div {...props} style={{...defaults, ...style, ...important}} />
    }
  }