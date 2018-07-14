import React from 'react';
import { ListGroupItem, ListGroup, Grid, Button } from 'react-bootstrap'
import './MediaList.scss';
import { base } from '../rebaseConfig/firebase'
import MediaGridComponent from '../Media/MediaGridComponent'
import Icon from '../Icons/Icon';
import ICONS from '../Icons/constants'
// import Media from '../Media/Media.js'

class MediaGrid extends React.Component {
    constructor() {
    super();
    this.state = {
     gallery: []
   }
  }
   componentDidMount() {
     base.syncState('affiliates', {
       context: this,
       state: 'gallery'
     }) 
   }
   
 

  render () {
    return (
      <div className='list'>
          {
          Object.keys(this.state.gallery).map((key, id) => {
            return <div key={key}>
                  <div className="delete" >
                    <MediaGridComponent  media={this.state.gallery[key]}  />
                    {this.state.gallery[key].affiliateLink &&
                    <Button 
                     
                        // className="remove-btn"
                        type="button"
                        style={{width: 65, position: 'relative', backgroundColor: 'transparent'}}
                        onClick={() => {
                          const gallery = {...this.state.gallery};
                          id = gallery[key]
                          this.setState(state => ({
                            gallery: Object.keys(this.state.gallery).filter(key => key.id !== id),
                          }));
                        }}
                       >
                       <Icon   className="trash__icon" icon={ICONS.BIN3} color={"white"} size={56} />
                        Remove
                       </Button>
                      }
                       </div>
                       </div>   
                     })
                   }
                  </div>
                 );
              }
            }

export default MediaGrid;
