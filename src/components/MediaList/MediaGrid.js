import React from 'react';
// import { ListGroupItem, ListGroup, Grid, Button } from 'react-bootstrap';
import './MediaList.scss';
import { base } from '../rebaseConfig/firebase';
import MediaGridComponent from '../Media/MediaGridComponent';
import Icon from '../Icons/Icon';
import ICONS from '../Icons/constants';
// import PhotoContainer from '../PhotoContainer/PhotoContainer';
// import ProgressBar from '../Graph/ProgressBar'
// import ReactTooltip from 'react-tooltip';
// import withAuthorization from '../Session/withAuthorization';
// import withAuthentication from '../Session/withAuthentication';
// import { withRouter } from 'react-router-dom'
// import Media from '../Media/Media.js'
import { Button } from 'react-bootstrap';

class MediaGrid extends React.Component {
    constructor() {
    super();
    this.state = {
    gallery:[],
   }
  }
   componentDidMount() {
   this.galleryRef =  base.syncState('gallery', {
       context: this,
       state: 'gallery',
      
     }) 
   }
  // componentWillUnmount() {
  //   base.removeBinding(this.galleryRef)
  // }
  
  render () {
    const { gallery } = this.state;
    return (
      <div className='list'>
      { Object.keys(gallery).map((key, id) => {
            return (
                  <div className="delete" key={key}>
                    <MediaGridComponent  media={gallery[key]}  />
                      {gallery[key].url &&
                      <Button 
                        // className="remove-btn"
                        type="button"
                        style={{width: 35, height: 35, marginBottom: 115, marginLeft: -85, position: 'relative', backgroundColor: 'transparent'}}
                        onClick={() => {
                         
                         
                          
                          //  id = gallery[key]; 
                         
                           console.log(id, key[id], key.id, key, gallery[key].id)
                           this.setState(state => ({
                            gallery: Object.keys(gallery).filter(key => gallery[key].id !== id)
                          })); 
                        
                          // this.props.deleteMedia(id)
                        }}
                      >
                      <Icon   
                        className="trash__icon"  
                        icon={ICONS.BIN3} 
                        color={"white"} 
                        size={85} 
                      />
                    </Button>
                    }
                  </div>
                  );
                })}
              </div>
            );
          }
        }
      

// const authCondition = (authUser) => !!authUser;


export default MediaGrid;
