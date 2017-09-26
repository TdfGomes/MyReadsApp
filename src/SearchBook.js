import React , { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar'
import Book from './Book'
import Modal from './Modal'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updadeShelf: PropTypes.func.isRequired
  }

  state = {
    query:'',
    searchedBooks:[],
    updatedBook:'',
    updatedShelf:'',
  }
  
  handleShelfUpdate = (book, shelf) => {
    this.props.updadeShelf(book, shelf)

    this.setState({
      updatedBook:book.title,
      updatedShelf:shelf
    })
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.bookSearch( query )
  }
  
  bookSearch = (query) => {  
    BooksAPI.search(query, 50).then(searchedBooks => {
      this.setState({ searchedBooks })
    }).catch(error => console.log(error))
  }
  
  clearBooks = () => {
    this.setState({
      query:'',
      searchedBooks:[],
      updatedBook:'',
      updatedShelf:''
    })
  }
  
  removeModal = () => {
    setTimeout(() => {
      this.setState({
        updatedBook:'',
        updadeShelf:''
      })
    },750)
  }

  render(){
    const updateQuery = debounce(e => {this.updateQuery(e)}, 450)
    return(
      <div className="search-books">
        <SearchBar serachTerm={updateQuery} clearBooks={this.clearBooks}/>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              ! this.state.searchedBooks
              ? <li><h1>Loading...</h1></li>
              : this.state.searchedBooks.map((book, i) => {
                  this.props.books.forEach(b => {
                    if (book.id === b.id) {
                      book.shelf = b.shelf
                    }
                  })
                  
                  return(
                    <li key={book.id}>
                      <Book
                        authors={book.authors}
                        book={book}
                        id={book.id}
                        imageLinks={book.imageLinks}
                        onUpdate={this.handleShelfUpdate}
                        shelf={book.shelf ? book.shelf : 'none'}
                        title={book.title}
                      />
                    </li>
                  )
                } 
              )
            }
          </ol>
        </div>
        {
          this.state.updatedBook && (
            <Modal updatedBook={this.state.updatedBook} updatedShelf={this.state.updatedShelf} removeModal={this.removeModal}/>
          )
        }
      </div>
    )
  }
}

export default SearchBook