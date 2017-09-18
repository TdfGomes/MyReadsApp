import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from './Select'

class Book extends Component{
  state = {
    shelf:''
  }
  
  static propTypes = {
    authors: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    imageLinks: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  onSelectShelf = ( book, e ) => {
    const shelf = e.target.value
    this.props.onUpdate(book, shelf)
    this.setState({ shelf })
  }

  componentDidMount() {
    this.setState({ shelf: this.props.shelf })
  }
  
  render(){
    const { authors, imageLinks, title } = this.props
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${imageLinks.thumbnail})`
    }
    
    return(
      <div>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={style}></div>
            <Select
              book={this.props.book}
              onSelect={this.onSelectShelf}
              shelfValue={this.state.shelf}
            />
          </div>
          <div className="book-title">{title}</div>
          {
            authors.map(( author ) => (
              <div key={author} className="book-authors">{author}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Book