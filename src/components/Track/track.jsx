import React from 'react';
import './track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
   
    this.renderAction=this.renderAction.bind(this);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }
  
  renderAction() {
    if (this.props.isRemoval) {
      return  <button onClick={this.removeTrack}>-</button>
    } else {
      return  <button onClick={this.addTrack}>+</button>
    }
  }
    
  

  addTrack(){
    this.props.onAdd(this.props.track)
  }

  removeTrack(){
    this.props.onRemove(this.props.track)
  }

 /* componentDidMount(){
    let minus = '-';
    let plus = '+';
    if (this.props.isRemoval) {
      this.setState({
        minOrPlus: minus
      })
    } else {
      this.setState({
        minOrPlus: plus
      })
    }
  }
*/
  

  render() {
    
    //console.log(this.props.track)
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
