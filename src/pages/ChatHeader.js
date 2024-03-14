
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function ChatHeader() {
  return (
    <Fragment>
        <nav>
            <div className="call-to-action">
                <ul>
                    <li><Link to="/logout" >Logout</Link></li>
                </ul>
            </div>
        </nav>
    </Fragment >
  );
}

export default ChatHeader;
