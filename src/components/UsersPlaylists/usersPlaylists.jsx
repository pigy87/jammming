import React, { Component } from 'react';
import './usersPlaylists.css';
import Spotify from '../../util/spotify'; 


class UsersPlaylists extends Component {

    constructor(props){
        super(props);
        this.state={
            PlaylistArray:null
        }
    }
componentWillMount () {
    Spotify.getUserPlaylists()
    
   
}

    render() {
       

        return (
            <div>

                
            </div>
        );
    }
}

export default UsersPlaylists;