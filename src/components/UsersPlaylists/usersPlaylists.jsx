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
        this.handleClick=this.handleClick.bind(this)
          
    }


    componentWillMount() {

        Spotify.getUserPlaylists()
            .then(usersPlaylists => {

                let objectOfPlayLists = [];
                usersPlaylists.forEach((element) => {
                    let each = {};
                    each.name = element.name;
                    each.id = element.id
                    objectOfPlayLists.push(each);
                });
                this.setState({ PlaylistArray: objectOfPlayLists });
                this.setState({ loading: false });
            })
    }

   
    handleClick(e){
       this.props.getPlaylistId(e.target.id)
    }


    render() {
        
        return (
            <div className={'usersPlaylists'}>
                <h2>Local Playlists</h2>
                <ul className={'lists'}
                    onClick={this.handleClick}>
                {
                 !this.state.PlaylistArray ? <p>Loading</p> : this.state.PlaylistArray.map(item=>{
                   return <PlayListItem items={item}
                                        key={item.id}/>
                    })                     
                }
                </ul>
            </div>
        )
    }

}

export default UsersPlaylists;