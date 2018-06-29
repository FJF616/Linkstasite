const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirectURI}&response_type=token`;
const token_url = `https://api.instagram.com/v1/users/self/info/recent/?access_token=${accessToken}`
const redirectURI = "http://localhost:3000/"
const client_id = "0d744e65869b4acc8dde4d6e3c6a58e2";
let accessToken;
let InstagramUser = {};
let user;



const InstagramLogin = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    const Match = window.location.href.match(/access_token=([^&]*)/);
    if (Match) {
      //set access token to regex match group
      accessToken = Match[1];
      return accessToken;
    } else {
      //use redirect instead of popup window
     window.location = auth_url;
    }
  },
  async fetchUser() {
    if (!accessToken) {
      this.getAccessToken();
    }
    try {
      let response = await fetch(token_url, {
        method: 'GET'
      });
      if (response.ok) {
        console.log(response);
        let jsonResponse = await response.json();
        InstagramUser = jsonResponse.data.map(info => ({
          id: info.id,
          image: info.images.standard_resolution.url,
          instagramUserID: info.user.id,
          url: info.link,
          title: info.caption ? info.caption.text : '',
          profileinfo: info.user.profile_infoture,
          userName:info.user.full_name,
          affiliatedLink: '',
          favorite: false,
          access_token: `${accessToken}`,
          likes: info.likes.count,
          tags: info.tags
        }));
        return InstagramUser;
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
  }
}

export default InstagramLogin;
