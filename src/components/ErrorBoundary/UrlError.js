import React from 'react';
export default class UrlError extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>"There was a problem generating your short link, please make sure you have entered the full address correctly."</h1>;
      }
      return this.props.children;
    }
  }
  
  