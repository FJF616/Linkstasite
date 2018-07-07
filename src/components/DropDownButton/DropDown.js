import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import AvatarEditor from 'react-avatar-editor';
import InstagramConsumer from '../Session/InstagramProvider';
const DropDown = () => 

   
        <div>
            <DropdownButton
            // bsStyle={title.toLowerCase()}
            // title={title}
           
            // id={`dropdown-basic-${i}`}
            >
           
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
            Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
        </DropdownButton>   
    </div>

     
    export default DropDown;