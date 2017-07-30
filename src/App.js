import React from 'react'
import { Route } from "react-router-dom";
import Shelf from "./components/shelf";
import Search from "./components/search";
import * as BooksAPI from './BooksAPI'
import './App.css'

const SHELF_CURRENTLY_READING = "Currently Reading";
const SHELF_WANT_TO_READ = "Want to Read";
const SHELF_READ = "Read";
const SHELF_NONE = "None";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
        { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", shelf: SHELF_CURRENTLY_READING, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" } },
        { id: "2", title: "Ender's Game", author: "Orson Scott Card", shelf: SHELF_CURRENTLY_READING, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api" } },
        { id: "3", title: "1776", author: "David McCullough", shelf: SHELF_WANT_TO_READ, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api" } },
        { id: "4", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", shelf: SHELF_WANT_TO_READ, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api" } },
        { id: "5", title: "The Hobbit", author: "J.R.R. Tolkien", shelf: SHELF_READ, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api" } },
        { id: "6", title: "Oh, the Places You'll Go!", author: "Seuss", shelf: SHELF_READ, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api" } },
        { id: "7", title: "The Adventures of Tom Sawyer", author: "Mark Twain", shelf: SHELF_READ, imageLinks: { smallThumbnail: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api" } }
      ]
    }

    this.onMoveBook = this.onMoveBook.bind(this);
  }

  /**
   * Allows to mave a book from one shelf to another shelf
   */
  onMoveBook(selectedBook, targetShelf) {

    // Find the index of the selected book
    let indexSelectedBook = this.state.books.findIndex(v => v.id === selectedBook.id);
        console.log(indexSelectedBook)
    //If the index of the book is "-1" it is a book which is currently in no shelf
    if (indexSelectedBook === -1) {
      console.log("New book")
      this.setState(state => ({
        books: state.books.concat(selectedBook)
      }))
      console.log(this.state.books);
    }


    //If the new state is "none" we just want to remove it from the books array
    else if (targetShelf === SHELF_NONE) {
      this.setState(state => ({
        books: state.books.filter(book => book.id !== selectedBook.id)
      }))
    }
    // Otherwise we move the book to the target shelf
    else {
      // Update the book in the shelf
      this.state.books[indexSelectedBook].shelf = targetShelf;

      this.setState(state => ({
        // Replace the current book with our updated book
        books: state.books
      })
      )
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_CURRENTLY_READING)}
                shelfTitle="Currently Reading"
                onMoveBook={this.onMoveBook}
              />
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_WANT_TO_READ)}
                shelfTitle="Want to Read"
                onMoveBook={this.onMoveBook}
              />
              <Shelf
                books={this.state.books.filter(book => book.shelf === SHELF_READ)}
                shelfTitle="Read"
                onMoveBook={this.onMoveBook}
              />
            </div>
            <div className="open-search">
              <a onClick={() => history.push("/search")}>Add a book</a>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search
            onMoveBook={this.onMoveBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
