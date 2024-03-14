
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function RegisterHeader() {
  return (
    <Fragment>
        <nav>
            <div className="call-to-action">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login" >Login</Link></li>
                </ul>
            </div>
        </nav>
    </Fragment >
  );
}

export default RegisterHeader;
