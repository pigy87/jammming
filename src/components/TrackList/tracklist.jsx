import React, { Component } from 'react';
import './tracklist.css';
import Track from '../Track/track';

class Tracklist extends React.Component {
    constructor(props){
        super(props);
        this.state=({
            searchResults:this.props.tracks
        })
    }

   

    render() {
      
       
        return (
            
            <div className="TrackList">
                
                {

                    this.props.tracks.map(track => {
                        return <Track track={track}
                            key={track.id} 
                            onAdd={this.props.onAdd}
                            isRemoval={this.props.isRemoval}
                            onRemove={this.props.onRemove}/>
                    })

                  }

            </div>
        )
    }
}

export default Tracklist;
