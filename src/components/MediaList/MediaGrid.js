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
     base.syncState('gallery', {
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
                    <MediaGridComponent  media={this.state.gallery[key]}  />
                    <div className="delete" >
                    <Button 
                     
                        // className="remove-btn"
                        type="button"
                        style={{width: 105, position: 'relative', backgroundColor: 'transparent'}}
                        onClick={() => {
                          const gallery = {...this.state.gallery};
                          id = gallery[key].id
                          this.setState(state => ({
                            gallery: this.state.gallery.filter(key => key.id !== id),
                          }))
                        }}
                       >
                       <Icon   className="trash__icon" icon={ICONS.BIN3} color={"white"} size={56} />
                        Remove
                       </Button>
                       </div>
                       </div>   
                     })
                   }
                  </div>
                 );
              }
            }

export default MediaGrid;
