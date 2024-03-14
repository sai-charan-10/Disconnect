
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function LoginHeader() {
  return (
    <Fragment>
        <nav>
            <div className="call-to-action">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Register" >Register</Link></li>
                </ul>
            </div>
        </nav>
    </Fragment >
  );
}

export default LoginHeader;
