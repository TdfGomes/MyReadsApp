import React, { Component } from 'react'
import Proptypes from 'prop-types'

class Modal extends Component{
  static propTypes = {
    updatedBook: Proptypes.string.isRequired,
    updatedShelf: Proptypes.string.isRequired
  }
  
  state = {
    fadeIn:'',
    fadeOut:''
  }

  componentWillMount() {
    this.setState({ fadeIn: 'fade-in' })  
  }

  removeModal = () =>{
    this.setState({
      fadeIn: '',
      fadeOut: 'fade-out'
    })
    this.props.removeModal()
  }
  
  render(){
    return(
      <div>
        <div className={`overlay ${this.state.fadeIn} ${this.state.fadeOut}`}></div>
        <div className={`modal-update ${this.state.fadeIn} ${this.state.fadeOut}`}>
          <div className="button-wrapper">
            <button className="close" onClick={this.removeModal}>
              <div className="remove-icon"></div>
            </button>
          </div>
          <div className="modal-content">
            <h1>You add <b>{this.props.updatedBook}</b> to your <b>{this.props.updatedShelf}</b> shelf</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal