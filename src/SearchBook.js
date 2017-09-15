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
    query:'',
    searchedBooks:[]
  }
  
  updateQuery = (query) => {
    this.setState({ query })

    this.bookSearch(this.state.query)
  }
  
  bookSearch = (query) => {
    
    BooksAPI.search(query, 50).then(searchedBooks => {
      this.setState({ searchedBooks })
      this.clearBooks(query)
    })
  
  }
  
  clearBooks = (query) => {
    if (query === '') {
      this.setState({ searchedBooks: [] })
    }
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