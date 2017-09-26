import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  static propTypes = {
    serachTerm: PropTypes.func.isRequired,
    clearBooks: PropTypes.func
  }

  state = {
    query:''
  }
  
  handleOnChange = (e) => {
    const query = e.target.value.trim()
    this.props.serachTerm(query)
    this.setState({ query })
  }

  handleOnClick = () => {
    this.setState({query:''})
    this.props.clearBooks()
  }

  render(){
    return(
      <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleOnChange}/> 
          </div>
          <button className="close dark" onClick={this.handleOnClick}>
            <div className="remove-icon"></div>
          </button>
        </div>
    )
  }
}

export default SearchBar