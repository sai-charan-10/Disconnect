// Footer.js
import '../css/display.css';
import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
function Display() {
  return (
    <Fragment>
        <header>
          <div className='index-header'>
            <h1> Chat App </h1>
            <Header />
          </div>
        </header>
        <main>
            <h2>About</h2>
            <p>
                This app allows you to chat with users.
            </p>
        </main>
    </Fragment >
  )
}

export default Display;
