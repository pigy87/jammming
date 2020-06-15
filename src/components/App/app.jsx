import React from 'react';
import  './app.css';
import SearchBar from '../SearchBar/searchBar';
import SearchResults from '../SearchResults/searchResults.jsx';
import PlayList from '../Playlist/playlist';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      searchResults:[
        
            {
              name:'Up where we belong',
              artist:'Joe Cocker',
              album:'summer time',
              id:1,
            },
         
            {
              name:'Holly mother',
              artist:'Brayan Adams',
              album:'winter is comming',
              id:2,
            }
          ],
    
    
      
      
            playlistName:'laganica',
      
             playlistTracks:[
                              {
                                name:'love',
                                album:'Moon light',
                                artist:'Britney spears',
                                id:3
                              },
                              {
                              name:'jude',
                              album:'Yestrday',
                              artist:'Beatles',
                              id:4
                              }
                             ]
                            
       
                                                        
  })
  this.addTrack=this.addTrack.bind(this);
  this.removeTrack=this.removeTrack.bind(this);
  this.prints=this.prints.bind(this);
  this.updatePlaylistName=this.updatePlaylistName.bind(this);
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

    prints(){
      console.log(
        this.state.playlistName
      )
    }

    updatePlaylistName(value){
    
      this.setState({playlistName:value})
    }

    render() {
     this.prints();
        return (
            <div>
               <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                <SearchBar/>
                <div className="App-playlist">
                  <SearchResults searchResults={this.state.searchResults}
                                  onAdd={this.addTrack}/>
                  <PlayList playlistTracks={this.state.playlistTracks}
                            playlistName={this.state.playlistName}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}/>
                </div>
              </div>
            </div>
        );
    }
}

export default App;