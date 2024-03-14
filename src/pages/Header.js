// Header.js
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Fragment>
        <nav>
            <div className="call-to-action">
                <ul>
                    <li><Link to="/login" >Login</Link></li>
                    <li><Link to="/register" >Register</Link></li>
                </ul>
            </div>
        </nav>
    </Fragment >
  );
}

export default Header;
