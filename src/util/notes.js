Object.keys(obj).length === 0 && obj.constructor === Object;

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});



}

checkSub() {
    const { stripe } = this.state;
    base.fetch('stripe', {
        context: this,
        then(data) {
            if (Object.keys(data).length) {
                base.update('subscription', {
                    data: { status: 'pro' },
                    then(err) {
                        if(!err) {
                            console.log('subscription status: pro');
                        }
                    }
                }) 
            }
        }
    })
    if ( stripe ) {
        stripe.hasOwnProperty('proSubscription' ) 
        ? base.post('subscription', {
            data: { status: 'pro' },
            then(err) {
                if(!err) {
                    console.log('subscription status: pro');
                }
            }
        }) 
        : base.post('subscription', {
            data: { status: 'trial' },
            then(err) {
                if(!err) {
                    console.log('subscription status: trial')
                }
            }
        })
    }
}

var mergedSettings = _.merge({}, defaultSettings, userSettings);
onPhotoSelect = () => {
    this.props.onSelect(this.props.standard);
    this.setState((prevState) => { return { isSelected: !prevState.isSelected }; });
  };


checkIfNeedToDownload = () => {
    if (window.InstAuth.accessToken && this.state.instagramImages.length === 0) {
      this.setState({ isDownloadingImages: true });
      InstagramAPI.getUserMedia(6)
        .then((images) => {
          this.setState({
            instagramImages: images.data,
            isDownloadingImages: false,
            paginationUrl: images.pagination
              ? images.pagination.next_url
              : null,
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ isDownloadingImages: false });
        });
    }
  };

  onNewPhotosLoaded = (newPhotos = [], paginationUrl = '') => {
    this.setState((prevState) => {
      return { paginationUrl, instagramImages: [...prevState.instagramImages, ...newPhotos] };
    });
  };

  getInstagramImages = () => this.state.instagramImages;


import axios from 'axios';

class InstagramAPI {
  getUserMedia = (accessToken, count) => {
    return new Promise((resolve, reject) => {
      axios.get('https://api.instagram.com/v1/users/self/media/recent/', {
        params: {
          access_token: accessToken,
          count,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch(error => reject(error));
    });
  };

  loadMorePhotos = (paginationUrl) => {
    return new Promise((resolve, reject) => {
      axios.get(paginationUrl)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch(error => reject(error));
    });
  }
}

export default new InstagramAPI();

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
          },
  
          getAccessToken: function() {
            return this.accessToken || "There is no access_token available. You must call startAuthFlow() to get one."
          },
  
          _buildIframe: function() {
            this._startListening();
            var e = window.document.createElement("iframe");
            e.onload = function() {
              try {
                window.parent.document.getElementById("instagramAuthFrame").contentDocument
              } catch (e) {
                InstAuth._removeIframe()
              }
            };
            e.setAttribute("src", window.location.href);
            e.setAttribute("id", "instagramAuthFrame");
            e.style.width = "1px";
            e.style.height = "1px";
            e.style.position = "fixed";
            e.style.top = "0";
            e.style.right = "0";
            e.style.opacity = "0";
            e.style.visibility = "none";
  
            window.document.getElementsByTagName("body")[0].appendChild(e);
          },
  
          startAuthFlow: function() {
            if (window.instagramClientId || this.clientId) {
              this._startListening();
              var e = window.screen.width / 2 - this._w / 2;
              var t = window.screen.height / 2 - this._h / 2;
              var authWindow = window.open(window.location.href, "InstagramAuth", "resizable,scrollbars,width=" + this._w + ",height=" + this._h + ",left=" + e + ",top=" + t);
              authWindow.instagramClientId = window.instagramClientId;
            } else {
              console.error("You forgot to call Insta.init() with your client_id.")
            }
          },
  
          _startListening: function() {
            window.addEventListener("message", this._receiveMessage)
          },
  
          _removeIframe: function() {
            var e = window.parent.document.getElementById("instagramAuthFrame");
            e && e.parentNode && e.parentNode.removeChild(e)
          },
  
          _receiveMessage: function(e) {
            switch (e.data) {
              case InstAuth._USER_DENIED_REQUEST:
              case InstAuth._UNEXPECTED_ERROR:
                console.error(e.data || InstAuth._UNEXPECTED_ERROR);
                window.InstAuth._removeIframe();
                window.removeEventListener("message", this._receiveMessage);
                break;
              default:
                if(typeof e.data === "string" && e.data.search("access_token") > -1) {
                  window.InstAuth.accessToken = JSON.parse(e.data).access_token;
                  window.InstAuth._removeIframe();
                  window.removeEventListener("message", this._receiveMessage);
                  console.warn("Instagram access_token: " + InstAuth.accessToken);
                }
            }
          }
        };
      }
    }
  }