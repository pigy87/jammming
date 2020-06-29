import React from 'react';
import  './app.css';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults.jsx';
import PlayList from '../Playlist/playlist';
import Spotify from '../../util/spotify';

let spotify={
  search:Spotify.search,
  savePlaylist:Spotify.savePlaylist

}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      searchResults:[
        
            
          ],
    
    
      
      
            playlistName:'My Playlist',
      
             playlistTracks:[
                              
                             ]
                            
       
                                                        
  })
  this.addTrack=this.addTrack.bind(this);
  this.removeTrack=this.removeTrack.bind(this);
  this.print=this.print.bind(this);
  this.updatePlaylistName=this.updatePlaylistName.bind(this);
  this.savePlaylist=this.savePlaylist.bind(this);
  this.searchResults=this.searchResults.bind(this);
}

  addTrack(track){
    
    let tracks=this.state.playlistTracks;
    
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return; 
      }
        tracks.push(track);
        this.setState({playlistTracks:tracks})
    }

    removeTrack(track){
      let tracks=this.state.playlistTracks;
      //console.log(tracks)
      let newTracks=tracks.filter(CurrentTrack=>CurrentTrack.id!==track.id);
      //console.log(newTracks)
      this.setState({playlistTracks:newTracks})
    }

  
    updatePlaylistName(value){
    
      this.setState({playlistName:value})
    }

    savePlaylist(){
      const trackURIs=this.state.playlistTracks.map(track=>track.uri);
      spotify.savePlaylist(this.state.playlistName,trackURIs)
      .then(()=> {
        this.setState({playlistName:'New Playlist',
                      playlistTracks:[]
                    })
      })
      
    }

    searchResults(title){
      
      spotify.search(title)
      .then(searchResults=>{
        this.setState({searchResults:searchResults})
      })
     
     }

     print(){
       console.log(this.state.searchResults)
     }
    

    render() {
     //this.print();
        return (
            <div>
               <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                <SearchBar onSearch={this.searchResults}/>
                <div className="App-playlist">
                  <SearchResults searchResults={this.state.searchResults}
                                  onAdd={this.addTrack}/>
                  <PlayList playlistTracks={this.state.playlistTracks}
                            playlistName={this.state.playlistName}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}/>
                </div>
              </div>
            </div>
        );
    }
}

export default App;