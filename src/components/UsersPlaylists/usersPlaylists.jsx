import React, { Component } from 'react';
import './usersPlaylists.css';
import Spotify from '../../util/spotify';
import PlayListItem from '../playListItem/playListItem';


class UsersPlaylists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PlaylistArray: null,
            loading: true

        }


    }


    async componentWillMount() {

        let playLists = await Spotify.getUserPlaylists();

        let objectOfPlayLists = [];
        playLists.forEach((element) => {
            let each = {};
            each.name = element.name;
            each.id = element.id
            objectOfPlayLists.push(each);
            this.setState({ PlaylistArray: objectOfPlayLists })

        })
        this.setState({ loading: false })

    }



    render() {


        console.log(this.state.loading)
        return (
            <div className={'usersPlaylists'}>
                <PlayListItem items={this.state.PlaylistArray} />
            </div>
        );
    }

}

export default UsersPlaylists;