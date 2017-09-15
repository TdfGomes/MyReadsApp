import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  static propTypes = {
    serachTerm: PropTypes.func.isRequired
  }

  state = {
    query:''
  }
  
  handleOnChange = (e) => {
    const query = e.target.value.trim()
    
    this.props.serachTerm(query)
    this.setState({ query })
  }



  render(){
    return(
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleOnChange} />
      </div>
    )
  }
}

export default SearchBar