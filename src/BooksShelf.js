import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Shelf from './Shelf'

class BooksShelf extends Component {
  state = {
    currentlyReading:[],
    read:[],
    wantToRead:[]
  }
  handleShelfUpdate = (book, shelf) => {
    
    BooksApi.update(book, shelf).then(b => {
      console.log(b)
      console.log(book)
      console.log(shelf)
      // this.setState({
      //   currentlyReading: b.currentlyReading,
      //   read:b.read,
      //   wantToRead: b.wantToRead
      // })
      if(b.currentlyReading.includes(book.id)){
        this.setState((prevState) => ({
          currentlyReading:prevState.currentlyReading.push(book)
        }))
      }
      if(b.read.includes(book.id)){
        this.setState((prevState) => ({
          read:prevState.read.push(book)
        }))
      }
      if(b.wantToRead.includes(book.id)){
        this.setState((prevState) => ({
          wantToRead:prevState.wantToRead.push(book)
        }))
      }

    })
  }
  componentDidMount() {
    BooksApi.getAll().then(( books ) => {
      this.setState({
        currentlyReading: books.filter(b => b.shelf === 'currentlyReading'),
        read: books.filter(b => b.shelf === 'read'),
        wantToRead: books.filter(b => b.shelf === 'wantToRead')
      })
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
            <Shelf shelfTitle="Currently Reading" books={this.state.currentlyReading} shelfUpdate={this.handleShelfUpdate}/>
            <Shelf shelfTitle="Read" books={this.state.read} shelfUpdate={this.handleShelfUpdate}/>
            <Shelf shelfTitle="Want to Read" books={this.state.wantToRead} shelfUpdate={this.handleShelfUpdate}/>
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