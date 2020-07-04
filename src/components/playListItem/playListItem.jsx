import React, { Component } from 'react';
//import  '../playListItem/playListItem.css'

class PlayListItem extends Component {
  
    render() {
        return (
            <div className={'playList'}>  
                <h2>Local Playlists</h2>
                <ul className={'lists'}>
                    {
                      !this.props.items ? <p>Loading</p> : this.props.items.map(d => {
                        return <li key={d.id}>{d.name}</li>
            
                        }) 
                        
                    }
                </ul>

                
            </div>
        );
    }
}

export default PlayListItem;