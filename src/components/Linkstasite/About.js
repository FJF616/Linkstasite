import React, { Component } from 'react';
// import FlatButton from 'material-ui'
import LINKSTASITE from './LINKSTASITE.md';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
require('./github.scss');




class About extends Component { 

constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentWillMount () {
    fetch(LINKSTASITE)
    .then(response => response.text())
    .then(text => {
      this.setState({text: text})
    })
    
  }

  render () {
    // const { intl } = this.props

    return (
    //   <Activity
    //     iconElementRight={
    //       <FlatButton
    //         style={{marginTop: 4}}
    //         href='https://github.com/FJF616'
    //         target='_blank'
    //         rel='noopener'
    //         secondary
    //         icon={<GitHubIcon />}
    //       />
    //     }
    //     title={{id: 'about'}}>

    //     <Scrollbar>
          <div style={{backgroundColor: 'white', padding: 5}}>
            <button><Link to={routes.HOME} >HOME</Link></button>
            <ReactMarkdown
              className='markdown-body'
              source={this.state.text}
          />
         </div>
    //     </Scrollbar>

    //   </Activity>
    )
  }
}

// About.propTypes = {
//   intl: intlShape.isRequired
// }

export default About
