import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BooksShelf extends Component {
  static propTypes = {
    books:PropTypes.array.isRequired,
    updadeShelf: PropTypes.func.isRequired
  }

  state = {
    books:[]
  }
  
  componentWillReceiveProps(nextProps){
    const {books} = nextProps
    
    this.setState({ books })
  }

  
  
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf shelfTitle="Currently Reading" books={this.state.books.filter(b => b.shelf === 'currentlyReading')} shelfUpdate={this.props.updadeShelf} />
            <Shelf shelfTitle="Read" books={this.state.books.filter(b => b.shelf === 'read')} shelfUpdate={this.props.updadeShelf}/>
            <Shelf shelfTitle="Want to Read" books={this.state.books.filter(b => b.shelf === 'wantToRead')} shelfUpdate={this.props.updadeShelf}/>
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