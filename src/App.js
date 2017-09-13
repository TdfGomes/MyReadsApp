import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import BooksShelf from './BooksShelf'
import './App.css'

class App extends Component {
    
  render(){
    return(
      <div className="app">
        <Route exact path="/" component={ BooksShelf }/>
        <Route path="/search" component={ SearchBook }/>
      </div>
    )
  }
}

export default App