import PictureList from './PictureList';

import { storage } from '../rebaseConfig/firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';import React, { Component } from 'react';
import InstagramLogin from '../../util/InstagramLogin';
import FileUploader from "react-firebase-file-uploader";

export default class PictureUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures:[],
            blobs:[]
        }
    }
    
    componentDidMount = () => {
     InstagramLogin.fetchUserInfo().then(instagramUser => {
          this.setState({
              pictures: instagramUser.gallery,
              blobs: instagramUser.blobs
          })
      })
    }
    // storage.ref().constructor.prototype.putFiles = (files) => { 
    //     var ref = this;
    //     const fileBlobs = [...this.state.blobs];
    //     return Promise.all(fileBlobs.map(file => {
    //       return ref.child(file.name).put(file);
    //     }));
    //   }
    //   // use it!
    //   storage.ref().putFiles(files).then(metadatas => {
    //     // Get an array of file metadata
    //   }).catch(error =>  {
    //     // If any task fails, handle this
    //   });    
customOnChangeHandler = (event) => {
    const { target: { files } } = event;
    const filesToStore = [];
    const { pictures } = this.state;
   pictures.forEach(file => filesToStore.push(file));

    this.setState({ files: filesToStore });
  }
  startUploadManually = () => {
    const { pictures } = this.state;
    pictures.forEach(file => {
      this.fileUploader.startUpload(file)
    });
  
}
  handleUploadError = () => {
      return (
          <p>Error uploading files!</p>
      )
  }

  handleUploadSuccess = () => {
      return (
          <p>Gallery upload complete.</p>
      )
  }

  handleProgress = () => {
      return (
          <div>Loading....</div>
      )
  }

render() {
    return (
        <div>
            <PictureList/>
            <FileUploader multiple ref={instance => { this.fileUploader = instance; } } 
                onChange={this.customOnChangeHandler} 
            />
            <button onClick={this.startUploadManually}>Upload all the things</button>
        </div>
    );
  }
}

