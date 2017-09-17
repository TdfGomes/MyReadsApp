import React , { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar'
import Book from './Book'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updadeShelf: PropTypes.func.isRequired
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
    if(query.length >= 2){
      BooksAPI.search(query, 50).then(searchedBooks => {
        this.setState({ searchedBooks })
        this.state.searchedBooks.forEach(sb => {
          this.props.books.forEach(b => {
            if(sb.id === b.id){
              console.log(b)
            }
            else{
              console.log('not found')
            }
          })
        })
      })
    }
  }
  
  clearBooks = () => {
    this.setState({
      query:'',
      searchedBooks:[]
    })
  }
  handleShelfUpdate = (book, shelf) => {
    this.props.updadeShelf(book, shelf)
  }
  render(){
    return(
      <div className="search-books">
        <SearchBar serachTerm={this.updateQuery} clearBooks={this.clearBooks}/>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              ! this.state.searchedBooks
              ? <li><h1>Loading...</h1></li>
              : this.state.searchedBooks.map((book, i) => {
                  return(
                    <li key={book.id}>
                      <Book
                        authors={book.authors}
                        book={book}
                        id={book.id}
                        imageLinks={book.imageLinks}
                        onUpdate={this.handleShelfUpdate}
                        title={book.title}
                      />
                    </li>
                  )
                } 
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook