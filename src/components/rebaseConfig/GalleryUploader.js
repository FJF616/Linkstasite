import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
class MyAwesomeComponent extends React.Component {
    state = {
      files: [],
    };
   
    /**
    * Custom onChange event handler
    * Store selected files in the state
    */
    customOnChangeHandler = (event) => {
      const { target: { files } } = event;
      const filesToStore = [];
   
      files.forEach(file => filesToStore.push(file));
   
      this.setState({ files: filesToStore });
    }
   
    /**
    * Start download handler using the file uploader reference
    */
    startUploadManually = () => {
      const { files } = this.state;
      files.forEach(file => {
        this.fileUploader.startUpload(file)
      });
    }
   
    render() {
    return(
      <FileUploader
         
          onChange={this.customOnChangeHandler} // ⇐ Call your handler
          ref={instance => { this.fileUploader = instance; } }  // ⇐ reference the component
      />
      <button onClick={this.startUploadManually}>Upload all the things</button>
    )
    }
  }