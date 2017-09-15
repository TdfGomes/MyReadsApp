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
  
    
  render(){
    return(
      <div className="app">
        <Route exact path="/" render={ () => (
          <BooksShelf books={this.state.books}/>
        )
        }/>
        <Route path="/search" render={() =>( 
          <SearchBook books={this.state.books}/>
          )
        }/>
      </div>
    )
  }
}

export default App