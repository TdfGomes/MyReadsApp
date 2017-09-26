import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Select from './Select'

class Book extends Component{
  state = {
    shelf:''
  }
  
  static propTypes = {
    authors: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    imageLinks: PropTypes.object,
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
    const { authors, id,imageLinks, title } = this.props
    const noCover = 'http://via.placeholder.com/128x193?text=No%20Cover'
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : noCover })`
    }
    
    return(

      <div>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={style}></div>
              <Select
                book={this.props.book}
                className="book-shelf-changer"
                onSelect={this.onSelectShelf}
                shelfValue={this.state.shelf}
              />
            </div>
            <Link to={`/book/${id}`}>
              <div className="book-title">{title}</div>
              {
                authors.map(( author ) => (
                  <div key={author} className="book-authors">{author}</div>
                ))
              }
            </Link>
          </div>
      </div>
    )
  }
}

export default Book