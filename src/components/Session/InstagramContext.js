import React from 'react';

const InstagramContext = React.createContext({
    gallery: [],
    listView: null,
    userProfile: [],
    // getMedias: () => null,
});

export default InstagramContext;