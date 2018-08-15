import React from 'react';
import { rebaseConnect } from 'react-rebase';
import { base } from '../components/rebaseConfig/firebase'
import {RebaseProvider } from 'react-rebase';


/**
 * 
 * 
 * these components can be used to track the amount of links and store the value on firebase,
 * however we will be implementing the bitly api which will take care of click stats.  
 */

const TrackLink = ({ link, count, updateCount}) => (
    <div>
        <a href={link}><button onClick={() => this.updateCount(count + 1)}></button> </a>
    </div>
);

const ClickTracker = () => (
    <RebaseProvider instance ={base}>
        <TrackLink/>
    </RebaseProvider>
);

const COUNT_PATH =  '/stats';

export default rebaseConnect(
  (props) => ({
      count: {path: COUNT_PATH },
  }),
    (base) => ({
        updateCount: (newValue) => base.post(COUNT_PATH, newValue),
      })
)(ClickTracker);