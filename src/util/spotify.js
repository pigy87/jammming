import UsersPlaylists from "../components/UsersPlaylists/usersPlaylists";


let clientId = "8a09172f383b4fce8193af6554cc1748";
let redirectURI = 'http://localhost:3000/';
let accessToken;
let expiresIn;
let usersId;



const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken
        } else {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                expiresIn = Number(expiresInMatch[1]);

                window.setTimeout(() => accessToken = "", expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;

            } else {

                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = accessUrl;


            }
        }
    },

    getCurrentUserId() {
        if (usersId) {
            return usersId
        } else {
            const accessToken = Spotify.getAccessToken();



            return fetch("https://api.spotify.com/v1/me",
                { headers: { 'Authorization': `Bearer ${accessToken}` } })
                .then(response => response.json())
                .then(jsonResponse => usersId = jsonResponse.id)

        }
    },


    search(term) {

        const accessToken = Spotify.getAccessToken();
        Spotify.getCurrentUserId();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=5`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )

            .then(response => response.json())

            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                }
            })



    },


   async savePlaylist(name, trackUris) {

        if (!name || !trackUris) {
            return
        }
        const usersId= await Spotify.getCurrentUserId();
        const accessToken =Spotify.getAccessToken();
        //const headers = { headers: { 'Authorization': `Bearer ${accessToken}` } };

        return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`,

            {
                method: "POST",
                headers: { Authorization: `Bearer ${accessToken}` },
                body: JSON.stringify({ name: name }),
            }
        )
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistID = jsonResponse.id;

                return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistID}/tracks`,
                    {
                        method: "POST",
                        headers: { Authorization: `Bearer ${accessToken}` },
                        body: JSON.stringify({ uris: trackUris })
                    })

            })



    },
    print() {
        if (usersId) {
            console.log('djokica')
        } else {
            console.log('pickica')
        }
    }
    ,
    async getUserPlaylists () {
        const usersId=await Spotify.getCurrentUserId();
        console.log(usersId)
        const accessToken =Spotify.getAccessToken();
       

        return await fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`,

            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                    
                },

            }
        )
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse.items);
                return jsonResponse.items })

    }

}

export default Spotify; 