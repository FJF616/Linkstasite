import React from 'react';

const InstagramContext = React.createContext({
    linkstasite: [],
    userProfile: [],
    getMedias: () => null,
});

export default InstagramContext;