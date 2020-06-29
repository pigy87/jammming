import React from 'react';

import './searchBar.css';

class SearchBar extends React.Component {
constructor(props){
super(props);
this.state=({
    val:""
})
this.search=this.search.bind(this);
this.handleTermChange=this.handleTermChange.bind(this)
}

search(){
    this.props.onSearch(this.state.val)
    }

    handleTermChange(event){
        this.setState({val:event.target.value})
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                        onChange={this.handleTermChange}/>
                <button className="SearchButton"
                        onClick={this.search}>SEARCH</button>
                        
            </div>
        );
    }
}

export default SearchBar;

