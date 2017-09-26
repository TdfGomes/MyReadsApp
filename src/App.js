import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import BooksShelf from './BooksShelf'
import SingleBook from './SingleBook'
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
    const { books } = this.state
    
    return(
      <div className="app">
        <Switch>
          <Route exact path="/" render={ () => (
            <BooksShelf books={ books } updadeShelf={this.handleShelfUpdate}/>
          )
          }/>          
          <Route path="/search" render={() =>( 
            <SearchBook books={ books } updadeShelf={this.handleShelfUpdate}/>
            )
          }/>
          <Route path="/book/:id" render={(props) => (
            <SingleBook updadeShelf={this.handleShelfUpdate} {...props}/>
          )} />
          <Route render={() => <h1 style={{textAlign:'center',marginTop:'35px'}}>Not Found!!</h1>}/>
        </Switch>
      </div>
    )
  }
}

export default App