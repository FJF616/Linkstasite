import React, { Component } from 'react'
import InstagramPhotoPicker from 'react-instagram-photo-picker';
// import { base } from '../rebaseConfig/firebase';


class InstagramImages extends Component {
    
// this.instaDialog.showDialog();
// this.instaDialog.getInstagramImages();
    render() {
    return (
        <div>
        <InstagramPhotoPicker
            onPhotosPicked={photos => console.warn(photos)}
            ref={ref => this.instaDialog = ref}
            clientId={'0d744e65869b4acc8dde4d6e3c6a58e2'}
            />
        </div>
        )
      }
    }
export default InstagramImages;