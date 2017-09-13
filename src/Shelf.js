import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfUpdate: PropTypes.func.isRequired,
    shelfTitle: PropTypes.string.isRequired
  }

  handleShelfUpdate = (book, shelf) => {
    this.props.shelfUpdate(book, shelf)
  }

  render(){
    const { books, shelfTitle } = this.props
    
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                  <li key={book.id}>
                    <Book
                      authors={book.authors}
                      book={book}
                      id={book.id}
                      imageLinks={book.imageLinks}
                      onUpdate={this.handleShelfUpdate}
                      shelf={book.shelf}
                      title={book.title}
                    />
                  </li>
                )
              )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf