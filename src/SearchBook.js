import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query:''
  }
  
  updateQuery = (query) => {
    this.setState({ query })
    
    BooksAPI.search(query,50).then(books => console.log(books))
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <SearchBar serachTerm={this.updateQuery}/>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBook