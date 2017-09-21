import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BookAPI from './BooksAPI'
import Select from './Select'
import Modal from './Modal'

class SingleBook extends Component {
  static propTypes = {
    updadeShelf:PropTypes.func.isRequired
  }

  state = {
    book:null,
    shelf:'',
    updatedBook:'',
    updatedShelf:''
  }

  onSelectShelf = (book, e) => {
    const shelf = e.target.value
    this.props.updadeShelf(book, shelf)
    
    this.setState({
      shelf:shelf,
      updatedBook: book.title,
      updatedShelf: shelf
    })
  }

  removeModal = () => {
    setTimeout(() => {
      this.setState({
        updatedBook: '',
        updadeShelf: ''
      })
    }, 750)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    BookAPI.get(id).then(b => this.setState({ book: b, shelf:b.shelf }))
  }
  
  render(){
    return(
      this.state.book && (
        <div>
          <h1 className="single-book-title">
            {this.state.book.title}
            <a className="close-search" onClick={this.props.history.goBack}>Close</a>
          </h1>
          <div className="single-book">
            <div className="book-img-wraper">
              <img alt={this.state.book.title} width="128" height="193" src={this.state.book.imageLinks.thumbnail}/>
              <Select
                book={this.state.book}
                className="single-book-shelf-changer"
                onSelect={this.onSelectShelf}
                shelfValue={this.state.book.shelf}
              />
            </div>
            <div className="book-description">
              <div className="desc">{this.state.book.description}</div>
              <div className="authors">
                <h4>Authors</h4>
              { 

                this.state.book.authors.map((author) => (
                  <div key={author} className="book-authors">{author}</div>
                ))
              }
              </div>
            </div>
          </div>
          {
            this.state.updatedBook && (
              <Modal updatedBook={this.state.updatedBook} updatedShelf={this.state.updatedShelf} removeModal={this.removeModal} />
            )
          }
        </div>
      )
    )
  }
}

export default SingleBook