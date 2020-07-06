import React, { Component } from 'react';
import './usersPlaylists.css';
import Spotify from '../../util/spotify';


class UsersPlaylists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PlaylistArray:null
        }
        
    }



    componentWillMount() {
        let objectOfPlayLists=[];

        
         Spotify.getUserPlaylists()
            .then(arrayOfPl => {
                
                console.log('dobio sam response')
               
                arrayOfPl.forEach(element => {
                    let each = {};
                    each.name = element.name;
                    each.id = element.id
                    objectOfPlayLists.push(each);
                  
                });
                
            })

            console.log('setujem stanje'+objectOfPlayLists);
        this.setState({ PlaylistArray: objectOfPlayLists })

    }


    
    render() {
        console.log(this.state.PlaylistArray);


        return (
        <div><p>{this.state.PlaylistArray[0].name}</p></div>
        );
    }
    
}

export default UsersPlaylists;