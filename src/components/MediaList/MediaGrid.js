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
    gallery:{},
   }
  }
   componentDidMount() {
   this.galleryRef =  base.syncToState('gallery', {
       context: this,
       state: 'gallery',
   
     }) 
   }
  componentWillUnmount() {
    base.removeBinding(this.galleryRef)
  }
  deleteMedia = (key, id) => {
    id = this.state.gallery[key].id
    this.setState(prevState => {
      return { gallery: prevState.gallery.filter(media => media.id !== id) };
    });
  };
  render () {
    const { gallery } = this.state;
    return (
      <div className='list' key={gallery.key}>
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
                          this.deleteMedia(key, id)

                        
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
