

let clientId = "8a09172f383b4fce8193af6554cc1748";
let redirectURI = 'http://localhost:3000/';
let accessToken;
let expiresIn;



const Spotify = {

    getAccessToken() {

        if (accessToken) {
            console.log('toke vec imam');
            return accessToken
        } else {

            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                console.log('vadim token iz urla')
                accessToken = accessTokenMatch[1];
                expiresIn = Number(expiresInMatch[1]);

                window.setTimeout(() => accessToken = "", expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;

            } else {
                console.log('nemam token setujem url')
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = accessUrl;


            }
        }
    },

    search(term) {

        const accessToken = Spotify.getAccessToken();


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

    savePlaylist(name, trackUris) {
        console.log(name)
        console.log(trackUris)
        if (!name || !trackUris) {
            return
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { headers: { 'Authorization': `Bearer ${accessToken}` } }
        let usersId;

        return fetch("https://api.spotify.com/v1/me", headers)
            .then(response => response.json())
            .then(jsonResponse => {
                usersId = jsonResponse.id;

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

            })

    }
}

export default Spotify; 