THis project is Unfinished/work in progress !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
CS5 "Linkstasite" Instagram project.

Requirements:
Use Instagram Oauth2 authentication for Linkstasite api
Fetch logged in Instagram users pictures, profile info etc.
Associate each picture with an affiliate link to external site
Inline edit/ delete feature
grid/list view: grid will show linked pics, list will be for editing mode.
stripe integration.  
Firebase integration for state management , realtime database




This project was scrapped during capstone phase at Lambdaschool.  Since there were many particular aspects about it that I found interesting/challenging, I have kept working on it in my freetime. 

This project aims to provide the user the ability to authenticate through his/her instagram account, retrieve the picture gallery associated with that account, and associate each individual picture with an external link.  Once the gallery has been completed, the modified pictures are then grouped together and a single link to that modified gallery is provided with the intention of placing that link on the actual instagram account.  To clarify, instagram only allows one external link to be associated with each account, so when this link is placed on the instagram page, anyone that clicks it, will then be taken to the same gallery of media, however, each item will be associated with an external link.  This project does require firebase and it uses re-base to sync local state with firebase database. 