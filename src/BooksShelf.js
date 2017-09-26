import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const BooksShelf = (props) => {
  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {props.books.length > 0 &&
          <div>
            <Shelf shelfTitle="Currently Reading" books={props.books.filter(b => b.shelf === 'currentlyReading')} shelfUpdate={props.updadeShelf} />
            <Shelf shelfTitle="Read" books={props.books.filter(b => b.shelf === 'read')} shelfUpdate={props.updadeShelf}/>
            <Shelf shelfTitle="Want to Read" books={props.books.filter(b => b.shelf === 'wantToRead')} shelfUpdate={props.updadeShelf}/>
          </div>
        }
      </div>
      <div className="open-search">
        <Link to='/search'>Add a Book</Link>
      </div>
    </div>
  )
}

BooksShelf.propTypes = {
  books:PropTypes.array.isRequired,
  updadeShelf: PropTypes.func.isRequired
}

export default BooksShelf