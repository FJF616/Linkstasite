import React from 'react';
import { ListGroupItem, ListGroup, Grid, Button } from 'react-bootstrap'
import './MediaList.scss';
import { base } from '../rebaseConfig/firebase'
import MediaGridComponent from '../Media/MediaGridComponent'
import Icon from '../Icons/Icon';
import ICONS from '../Icons/constants'
// import ProgressBar from '../Graph/ProgressBar'
// import ReactTooltip from 'react-tooltip';

// import Media from '../Media/Media.js'

class MediaGrid extends React.Component {
    constructor() {
    super();
    this.state = {
     gallery: []
   }
  }
   componentDidMount() {
     base.bindToState('affiliates', {
       context: this,
       state: 'gallery',
       asArray: true
     }) 
   }
   
 

  render () {
    return (
      <div className='list'>
          {
          Object.keys(this.state.gallery).map((key, id) => {
            return <div className="delete" key={key}>
          
                    <MediaGridComponent  media={this.state.gallery[key]}  />
                    {this.state.gallery[key].affiliateLink &&
                    <Button 
                     
                        // className="remove-btn"
                        type="button"
                        style={{width: 35, height: 35, marginBottom: 85, marginLeft: -85, position: 'relative', backgroundColor: 'transparent'}}
                        onClick={() => {
                          const gallery = [...this.state.gallery];
                           id = gallery[key].id; 
                           this.setState(state => ({
                            gallery: gallery.filter(key => key.id !== id)
                          }));
                        }}
                       >
                       <Icon   className="trash__icon"  icon={ICONS.BIN3} color={"white"} size={85} />
                       
                       </Button>
                      }
                       </div>
                     
                     })
                   }
                  </div>
                 );
              }
            }

export default MediaGrid;
