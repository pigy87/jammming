import React, { Component } from 'react';
import './usersPlaylists.css';
import Spotify from '../../util/spotify';


class UsersPlaylists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PlaylistArray: []
        }
        
    }



     componentWillMount() {
        let objectOfPlayLists = [];

        
         Spotify.getUserPlaylists()
            .then(arrayOfPl => {
                console.log(arrayOfPl)
                arrayOfPl.forEach(element => {
                    let each = new Object();
                    each.name = element.name;
                    each.id = element.id
                    objectOfPlayLists.push(each);
                });
            })

        console.log(objectOfPlayLists);
        this.setState({ PlaylistArray: objectOfPlayLists })

    }

    
    render() {



        return (
        <div></div>
        );
    }
    
}

export default UsersPlaylists;