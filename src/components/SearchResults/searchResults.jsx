import React, { Component } from 'react';
import './searchResults.css';
import  TrackList  from "../TrackList/tracklist";

class SearchResults extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={this.props.searchResults}
                       onAdd={this.props.onAdd}
                       isRemoval={false}/>
          </div>
        );
    }
}

export default SearchResults;