import React, { Component } from  'react'
import PropTypes from 'prop-types'

class Select extends Component{
  state = {
    shelfValue: 'none'
  }

  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    shelfValue: PropTypes.string
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
      <div className="book-shelf-changer">
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
