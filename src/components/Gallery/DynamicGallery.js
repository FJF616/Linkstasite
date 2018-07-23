import DynamicContent from 'react-dynamic-content';
import "react-dynamic-content/styles/style.css"; 
import { base } from '../rebaseConfig/firebase';
import React from 'react';
export default class DynamicGallery extends React.Component {
    state= {
        content:[]
    }
    componentWillMount() {
        this.imageRef = base.syncState('imageUrls', {
            context: this,
            state: 'content',
            asArray: true
        });
    }
    imgArray = this.state.content.map((image, idx) => {
      let images = [];
      for (let i = 0; i < this.state.content.length; i++) {
        image = this.state.content.length[idx]
        images.push(image[0]);
      }
      return images;
    })
  render() {
    const content = [
      <img src="http://lorempixel.com/1000/600" />,
      
      <img src="http://lorempixel.com/500/550" />,
      
      <div style={{background:'white', fontSize:'22px', padding:'10px', 
      border:'2px solid grey', borderRadius:'15px'}}>
        Lorem ipsum dolor sit amet, melius consequat mea te. His dicat suscipit sadipscing an.
        Probo saepe eu vix. Nam cu clita deserunt.
        Cum et choro solet quodsi. Unum temporibus sit id. Eam fierent conclusionemque cu,
        ei euismod moderatius interpretaris nec, te movet nullam tincidunt vis.
      </div>,
      
      <img src="http://lorempixel.com/1000/1200" />,
      
      <iframe src={"https://www.youtube.com/embed/vO2Su3erRIA"}></iframe>,
      
      <img src="http://lorempixel.com/600/500" />
    ]
    return (
      <DynamicContent
        elements={content}
        layout={'cascading'}
        numOfColumns={3}
        allowDraggingMobile={true}
        allowDraggingDesktop={true}/>
    );
  }
}