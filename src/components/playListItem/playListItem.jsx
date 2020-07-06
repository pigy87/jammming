import React, { Component } from 'react';
//import  '../playListItem/playListItem.css'

class PlayListItem extends Component {

    render() {
    // console.log(this.props.items)
        return (
            <div className={'playList'}>  
                               
                    {
                         <li id={`${this.props.items.id}`}>{this.props.items.name}</li>
                    }
            </div>
        );
    }
}

export default PlayListItem;