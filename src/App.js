import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import BooksShelf from './BooksShelf'
import './App.css'

class App extends Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
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
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat([book])
      })
      )
    })
  }
    
  render(){
    return(
      <div className="app">
        <Route exact path="/" render={ () => (
          <BooksShelf books={this.state.books} updadeShelf={this.handleShelfUpdate}/>
        )
        }/>
        <Route path="/search" render={() =>( 
          <SearchBook books={this.state.books} updadeShelf={this.handleShelfUpdate}/>
          )
        }/>
      </div>
    )
  }
}

export default App