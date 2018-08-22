
const InstaLoginWindow = {
function isIframe () {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  
  if(isIframe()) {
    // starting iFrame
    if(window.frameElement && window.frameElement.id && window.frameElement.id === "instagramAuthFrame") {
      if(window.parent.instagramClientId) {
          if(window.location.hash.search("access_token") > -1) {
            window.parent.postMessage(JSON.stringify({ access_token: window.location.hash.substr(14).split("&")[0] }), window.parent.location.href);
            try {
              var e = window.parent.document.getElementById("instagramAuthFrame");
              e && e.parentNode && e.parentNode.removeChild(e);
            } catch(e) {}
          } else if (window.location.href.search("error") > -1) {
            window.parent.postMessage("The user denied request.", window.parent.location.href);
            try {
              var e = window.parent.document.getElementById("instagramAuthFrame");
              e && e.parentNode && e.parentNode.removeChild(e);
            } catch(e) {}
          } else {
            window.location.href = "https://api.instagram.com/oauth/authorize/?client_id="
              + window.parent.instagramClientId
              + "&response_type=token&redirect_uri="
              + window.location.href
          }
        }
      } else {
        console.error("You forgot to set Instagram client_id.");
      }
  } else {
    // startAuthFlow window.open
    if(window.name === 'InstagramAuth') {
      if (window.location.href.search("error") === -1 && window.location.hash.search("access_token") === -1) {
        var token = window.instagramClientId || window.parent.instagramClientId;
        window.location.href = "https://api.instagram.com/oauth/authorize/?client_id="
          + token
          + "&response_type=token&redirect_uri="
          + window.location.href;
      }
      else {
        if (window.location.hash.search("access_token") > -1) {
          window.opener.postMessage(JSON.stringify({ access_token: window.location.hash.substr(14).split("&")[0] }), window.opener.location.href)
        } else {
          window.opener.postMessage("The user denied request.", window.opener.location.href)
        }
        window.stop();
        window.close();
      }
    } else {
      // define InstAuth
      if(!window.InstAuth) {
        window.InstAuth = {
          _w: window.screen.width / 3,
          _h: window.screen.height / 2,
          _USER_DENIED_REQUEST: "The user denied request.",
          _UNEXPECTED_ERROR: "Unexpected error occurred.",
          init: function(id) {
            this.clientId = id;
            window.instagramClientId = id;
            this._buildIframe();
          }
        }
    }
