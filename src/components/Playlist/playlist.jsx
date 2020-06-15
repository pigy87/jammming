import React, { Component } from 'react';
import './playlist.css';

import TrackList from '../TrackList/tracklist';


class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      playlistName:this.props.playlistName,
      playList:this.props.playlistTracks

    })
    this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e){
   
    {this.props.onNameChange(e.target.value)}

}

  componentWillReceiveProps(nextProps) {
    this.setState({
      playList:nextProps.playlistTracks
    })
    
  }

  render() {
   
    return (
      
        <div className="Playlist">
        <input  id="play" 
                type="text"
                defaultValue={'New playlist'}
                onChange={this.handleNameChange}
               />
        <TrackList tracks={this.state.playList}
                    isRemoval={true}
                    onRemove={this.props.onRemove}/> 
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
      
    );
  }
}

export default Playlist;


