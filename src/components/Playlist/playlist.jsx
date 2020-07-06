import React from 'react';
import './playlist.css';

import TrackList from '../TrackList/tracklist';


class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      playlistName:this.props.playlistName
     })
    
     this.handleNameChange=this.handleNameChange.bind(this);
  }

  handleNameChange(e){
   
    this.props.onNameChange(e.target.value)

}

  

  render() {
   
    return (
      
        <div className="Playlist">
        <input  id="play" 
                type="text"
                value={this.props.displayName}
                onChange={this.handleNameChange}
               />
        <TrackList tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove}/> 
        <button className="Playlist-save"
                onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
          </div>
      
    );
  }
}

export default Playlist;


