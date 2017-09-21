import React, { Component } from  'react'
import PropTypes from 'prop-types'

class Select extends Component{
  static propTypes = {
    className:PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    shelfValue: PropTypes.string.isRequired
  }
 
  state = {
    shelfValue: 'none',
  }

  handleOnSelect = ( book, e ) => {
    this.setState({ shelfValue: e.target.value })
    this.props.onSelect(book, e)
  }

  componentDidMount() {
    this.setState((prevState, props) => ({
        shelfValue: props.shelfValue
      })
    )
  }
  
  render(){
    return(
      <div className={this.props.className}>
        <select onChange={ (e) => this.handleOnSelect(this.props.book, e) } value={ this.state.shelfValue }>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Select
