import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class BooksShelf extends Component {
  static propTypes = {
    books:PropTypes.array.isRequired
  }

  state = {
    books:[]
  }
  
  componentWillReceiveProps(nextProps){
    const {books} = nextProps
    
    this.setState({ books })
  }

  handleShelfUpdate = (book, shelf) => {
    
    /**
     * change book shelf
     */
    book.shelf = shelf
    /**
     * Update book shelf using the API
     */
    BooksAPI.update(book, shelf).then(b => {
      /**
       * Update the state removing the book from the previous shelf using filter and place it in the array with concat
       */
      this.setState( prevState => ({
          books:prevState.books.filter(b => b.id !== book.id).concat([book])
        })
      )
    })
  }
  
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf shelfTitle="Currently Reading" books={this.state.books.filter(b => b.shelf === 'currentlyReading')} shelfUpdate={this.handleShelfUpdate} />
            <Shelf shelfTitle="Read" books={this.state.books.filter(b => b.shelf === 'read')} shelfUpdate={this.handleShelfUpdate}/>
            <Shelf shelfTitle="Want to Read" books={this.state.books.filter(b => b.shelf === 'wantToRead')} shelfUpdate={this.handleShelfUpdate}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a Book</Link>
        </div>
      </div>
    )
  }
}

export default BooksShelf