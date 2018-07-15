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
            return <div className="delete" key={key}>
                    <MediaGridComponent  media={this.state.gallery[key]}  />
                   
                    <Button 
                     
                        // className="remove-btn"
                        type="button"
                        style={{width: 55, height: 55, position: 'baseline', marginBottom: 65, marginLeft: -75, marginRight: 45, zIndex: 2, backgroundColor: 'transparent'}}
                        onClick={() => {
                          const gallery = {...this.state.gallery};
                          id = gallery[key].id
                          console.log(id, gallery[key])
                          this.setState(state => ({
                            gallery: this.state.gallery.filter(key => {
                              console.log(key.id);
                              return key.id !== id;
                            })
                          }))
                        }}
                       >
                       <Icon   className="trash__icon" icon={ICONS.BIN3} color={"white"} size={80} />
                       
                       </Button>
                       </div>
                     
                     })
                   }
                  </div>
                 );
              }
            }

export default MediaGrid;
