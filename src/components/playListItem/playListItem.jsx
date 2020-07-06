import React, { Component } from 'react';
//import  '../playListItem/playListItem.css'

class PlayListItem extends Component {

    render() {
        


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